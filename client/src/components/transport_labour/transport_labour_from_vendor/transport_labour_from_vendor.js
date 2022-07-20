import React, {useState, useEffect} from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text, Alert} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu, Modal } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { roleas, loginuserId } from '../../../utils/user';
import { all_completed_purchase_orders } from '../../../services/pickup_api';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import {url} from '../../../utils/url';
import { uploadImage } from '../../../services/image';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddTransportLabourFromVendor(props,{ navigation }) {

    const [visible2, setVisible2] = useState(false);
    const [visible, setVisible] = useState([]);
    const [vNumber, setVNumber] = useState("");
    const [vType, setVType] = useState("Choose Vehicle Type");
    const [charge, setCharge] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");
    const [items, setItems] = useState([]);
    const [acpo, setACPO] = useState();
    const [visible3, setVisible3] = useState(false);
    const [ data, setData ] = useState('Not Found');
    const [flag, setFlag] = useState(false);
    const [msg, setMsg] = useState("");
    const [addedItems, setAddedItems] = useState([]);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [file2, setFile2] = useState();
    const [img2, setImg2] = useState();
    const [file3, setFile3] = useState();
    const [img3, setImg3] = useState();
    const [file4, setFile4] = useState();
    const [img4, setImg4] = useState();
    const [file5, setFile5] = useState();
    const [img5, setImg5] = useState();
    const [file6, setFile6] = useState();
    const [img6, setImg6] = useState();

    let history = useHistory();

    useEffect(() => {

        all_completed_purchase_orders()  
        .then(result => {
            setACPO(result);
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    },[acpo])

    const ItemChange = () => {

        var val=acpo.find(o => o.barcode === data);
        if(val==undefined){
            setMsg("Error!! Item not found");
        }
        else{
            if(addedItems.includes(data) || val.flag==1){
                setMsg("Error!! Item is already scanned");
            }
            else{
                const values1 = [...addedItems];
                values1.push(data);
                setAddedItems(values1); 

                var beepsound = new Audio('./beep-02.mp3');   
                beepsound.play();

                const values = [...items];
                values.push({orderId: val.purchase_order.orderId, itemName: val.purchase_order.items.itemName, Grade: val.purchase_order.items.Grade, quantity: val.purchase_order.items.quantity});
                setItems(values);
                fetch(`${url}/update_flag_completed_purchase_order/${val._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        flag:1,
                        vehicle_number: vNumber,
                        driver_name: driverName,
                        driver_mobile_no: driverMobileNumber,
                        labour_name: labourName,
                        labour_mobile_no: labourMobileNumber,
                    })
                }).then(res => res.json())
                .catch(error => console.log(error))
                .then(data => {
                    // alert(data.message);
                    // console.log(data);
                });

                fetch(`${url}/update_order_item_status/${val.purchase_order.custom_orderId}/${val.purchase_order.items.itemName}/${val.purchase_order.items.Grade}/${val.purchase_order.items.quantity}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status:"Dispatched for Buyer Hub",
                    })
                }).then(res => res.json())
                .catch(error => console.log(error))
                .then(data => {
                    //  alert(data.message);
                });
                setMsg("Success!! Added");
            }
        }
        setData("Not Found");
    };

    if(flag==false && data!="Not Found"){
        ItemChange();
    }

    function submitForm() {
        fetch(`${url}/create_transport_labour_from_vendor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerId: userId, 
                vehicle_number: vNumber,
                vehicle_type: vType,
                driver_name: driverName,
                labour_name: labourName,
                driver_mobile_no: driverMobileNumber,
                labour_mobile_no: labourMobileNumber,
                charge: charge,
                orders_items: items,
                img: img,
                img2: img2,
                img3: img3,
                img4: img4,
                img5: img5,
                img6: img6,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            if(data.message!="Something went wrong!"){
                alert(data.message);
                if(Platform.OS=='android'){
                    navigation.navigate('AllTransportLabourFromVendor');
                }
                else{
                    history.push('/alltransportlabourfromvendor');
                }
                
            }
            else{
                if(data.error.errors){
                    alert("All Fields are required!");
                }
                else{
                    alert(data.message);
                }
            }
        });
    }

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    }
    
    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };

    function choose_v_type(type){
        setVType(type);
        closeMenu2();
    }

    const showModal = () => setVisible3(true);
    const hideModal = () => setVisible3(false);

    function scan() {
        showModal();
    }

    function getFiles(event){
        setFile(event.target.files[0]);
    }

    function ImageSubmitForm(){

        uploadImage(file)
        .then(result => {
            setImg(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles2(event){
        setFile2(event.target.files[0]);
    }

    function ImageSubmitForm2(){

        uploadImage(file2)
        .then(result => {
            setImg2(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles3(event){
        setFile3(event.target.files[0]);
    }

    function ImageSubmitForm3(){

        uploadImage(file3)
        .then(result => {
            setImg3(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles4(event){
        setFile4(event.target.files[0]);
    }

    function ImageSubmitForm4(){

        uploadImage(file4)
        .then(result => {
            setImg4(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles5(event){
        setFile5(event.target.files[0]);
    }

    function ImageSubmitForm5(){

        uploadImage(file5)
        .then(result => {
            setImg5(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles6(event){
        setFile6(event.target.files[0]);
    }

    function ImageSubmitForm6(){

        uploadImage(file6)
        .then(result => {
            setImg6(result);
            alert("Image Uploaded successfully");
        });
        
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title titleStyle={styles.title} title="Create Transport Labour from Vendor"/>
                    <Card.Content>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vType} </Button>}>
                        <Menu.Item title="Truck" onPress={()=>choose_v_type("Truck")} />
                        <Menu.Item title="Mini Truck" onPress={()=>choose_v_type("Mini Truck")} />
                        <Menu.Item title="Auto Tempo" onPress={()=>choose_v_type("Auto Tempo")} />
                        <Menu.Item title="Car" onPress={()=>choose_v_type("Car")} />
                        <Menu.Item title="Rickshaw" onPress={()=>choose_v_type("Rickshaw")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Vehicle Number" value={vNumber} onChangeText={vNumber => setVNumber(vNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Name" value={driverName} onChangeText={driverName => setDriverName(driverName)} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Mobile Number" value={driverMobileNumber} onChangeText={driverMobileNumber => setDriverMobileNumber(driverMobileNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Name" value={labourName} onChangeText={labourName => setLabourName(labourName)} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Mobile Number" value={labourMobileNumber} onChangeText={labourMobileNumber => setLabourMobileNumber(labourMobileNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Charge" value={charge} onChangeText={charge => setCharge(charge)} />
                    {items.map((it, index) => (
                        <View>
                            <Menu
                            visible={visible[index]}
                            onDismiss={()=>closeMenu(index)}
                            anchor={<Button style={styles.input} mode="outlined"  onPress={()=>openMenu(index)}>{it.itemName+" "+it.Grade+" "+it.quantity}</Button>}>
                            </Menu>
                        </View>
                    ))}
                    { visible3 &&
                    <>
                        <BarcodeScannerComponent
                            width="50%"
                            onUpdate={(err, result) => {
                                if (result) setData(result.text)
                            }}
                        />
                        <Text>{msg}</Text>
                        {!flag ?
                            <Button onPress={()=>setFlag(true)}>Manually Add</Button>
                            :
                            <Button onPress={()=>setFlag(false)}>Start Scan</Button>
                        }
                        {flag &&
                            <View style={{padding: '5px', display: 'flex'}}>
                                <TextInput style={styles.input} mode="outlined" label="Data" value={data} onChangeText={data => setData(data)} />
                                <Button onPress={()=>ItemChange()}>Add</Button>
                            </View>
                        }
                    </>
                    }
                    {!visible3 &&
                        <Button mode="contained" style={styles.button} onPress={() => scan()} icon={() => <FontAwesomeIcon icon={ faCamera } />}>Start Scan</Button>
                    }
                    {items.length > 0 ?
                    <>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm()}>Upload Loaded Crates Picture (Back) Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles2}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img2 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm2()}>Loaded Truck Side View (Left) with Vehicle Number Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles3}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img3 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm3()}>Loaded Truck Side View (Right) with Vehicle Number Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles4}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img4 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm4()}>Loaded Truck Front View with Driver and Vehicle Number</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles5}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img5 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm5()}>Transporter invoice pic</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles6}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img6 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm6()}>FPO invoice pic</Button>
                    </View>
                    </>
                    :
                    null
                    }
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Submit</Button>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginTop: '10%',
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginTop: '4%',
                marginBottom: '4%',
                width: '75%',
            }
        })
    },
    title: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                // textAlign: 'center',
                color: 'green',
                fontFamily: 'Roboto'
            },
            default: {
                textAlign: 'center',
                color: 'green',
                fontSize: 28,
                fontFamily: 'Roboto'
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                
            }
        })
    },
    button: {
        marginTop: '2%',
    }
}); 