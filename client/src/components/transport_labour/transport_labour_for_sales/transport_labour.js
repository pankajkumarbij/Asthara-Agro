import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
// import swal from '@sweetalert/with-react';
import { userId } from '../../../utils/user';
import { all_completed_purchase_orders } from '../../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddTransportLabour(props,{ navigation }) {

    const [visible2, setVisible2] = useState(false);
    const [visible, setVisible] = useState([]);
    const [vNumber, setVNumber] = useState("");
    const [vType, setVType] = useState("Choose Vehicle Type");
    const [charge, setCharge] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");
    const [items, setItems] = useState([{orderId: "Choose Order", itemName: "", Grade: "", quantity: ""}]);
    const [acpo, setACPO] = useState();

    let history = useHistory();

    useEffect(() => {

        all_completed_purchase_orders()  
        .then(result => {
            setACPO(result);
        })

    })

    const ItemChange = (index, item) => {
        const values = [...items];
        values[index].orderId = item._id;
        values[index].itemName = item.purchase_order.items.itemName;
        values[index].Grade = item.purchase_order.items.Grade;
        values[index].quantity = item.purchase_order.items.quantity;
        setItems(values);
        console.log(item);
        fetch(`http://localhost:5000/update_flag_completed_purchase_order/${item._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                flag:1,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
            // console.log(data);
        });
        closeMenu(index);
    };

    const handleAddFields = () => {
        const values = [...items];
        values.push({orderId: "Choose Order", itemName: "", Grade: "", quantity: ""});
        setItems(values);
    };
    
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        fetch(`http://localhost:5000/create_transport_labour_for_sales`, {
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
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            if(data.message!="something wrong!"){
                    alert("Yeah!", data.message, "success");
                history.push('/alltransportlabourforsales');
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

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="Create Transport Labour for Sales"/>
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
                            anchor={<Button style={styles.input} mode="outlined"  onPress={()=>openMenu(index)}>{it.orderId} </Button>}>
                                {acpo && acpo.map((item) => {
                                    if(item.flag === 0 && item.purchase_order.buyer_id==userId)
                                    return (
                                        <Menu.Item style={{marginTop: '10%', padding: '1%',}} title={item.purchase_order.custom_orderId+"\n"+item.purchase_order.custom_vendorId+"\n"+item.purchase_order.items.itemName+"("+item.purchase_order.items.Grade+"), QTY: "+item.purchase_order.items.quantity+"\n\n"} onPress={()=>ItemChange(index, item)} />
                                    )
                                })}
                            </Menu>
                            <View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                        <FontAwesomeIcon icon={ faPlusCircle } onPress={() => handleAddFields()} color={ 'green' } size={30} />
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>
                                        <Button  onPress={() => handleAddFields()}  mode="outlined"><FontAwesomeIcon icon={ faPlusCircle } color={ 'green' } size={30} /></Button>
                                    </>
                                }
                            </View>
                        </View>
                    ))}
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