import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Purchase_Order(props, {route}) {

    var id="";
    var purchaseid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseId;
    }
    else{
        purchaseid = props.match.params.purchaseid;
    }

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:''}]);
    const [user2, setUser2] = useState();

    const [vendor_email, setVendorEmail] = useState("Choose Vendor");

    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);

    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }
    function chooseVendor(vendorId) {
        setVendorId(vendorId);
        closeMenu2();
    }
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseId(id);
        }
        else{
            setHost("localhost");
            setPurchaseId(purchaseid);
        }
        if(purchaseId){
       
            fetch(`http://${host}:5000/retrive_purchase_order/${purchaseid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setIndentId(item[0].indent_id);
                setOrderId(item[0].order_id)
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setStatus(item[0].status);
                setFlag(true);
            });

        // fetch all vendors
        fetch("http://localhost:5000/retrive_all_vendor", {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(user2 => setUser2(user2));
            // .then(item => {
            // setItems(item[0].items);
            // setFlag(true);
            // });
       }

    }, [host,purchaseId,purchaseid,id,user2]);

    const ItemChange = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].quantity = fieldvalue;
        }
        setItems(values);
    };

    const ItemChange2 = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].itemPrice = fieldvalue;
        }
        setItems(values);
    };
       //chooseVendor() function for select the Vendor   
    function chooseVendor(id, email){
        setVendorId(id)
        setVendorEmail(email);
        fetch(`http://${host}:5000/retrive_vendor/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        closeMenu2();
    }
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        fetch(`http://${host}:5000/update_purchase_order/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indent_id:indent_id,
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,          
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });   
    }
        // for create Purchase Receipt
        function submitForm2() {
            fetch(`http://${host}:5000/create_purchase_confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        
            body: JSON.stringify({
                indent_id:indent_id,
                purchaseId:purchaseId,
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,          

                          
            })
        })
        
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
            
        });   
    }

    function submitForm3() {
        fetch(`http://${host}:5000/update_vendor_purchase_order/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                   
                vendor_id:vendor_id, 
                // status:status,          
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });   
    }

      const StatusChange = (s) => {
        fetch(`http://${host}:5000/update_purchase_order_status/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });
    }; 

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Purchase Order"/>
                    <Card.Content>
                    
                    {vendor_id &&
                    <Menu 
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{vendor_id}</Button>}>
                        <Menu.Item title="${pId}" onPress={()=>chooseVendor(vendor_id)} />
                    </Menu>
                    }

                    {indent_id &&
                    <Menu 
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{indent_id}</Button>}>
                        <Menu.Item title="${indentId}" onPress={()=>chooseIndent(indent_id)} />
                    </Menu>
                    }
                    {items && flag &&
                    <DataTable style={styles.datatable}>
                    {items.map((it, index) => (
                        <DataTable.Row>
                            <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={it.itemName} /></DataTable.Cell>
                            <DataTable.Cell><TextInput mode="outlined" label="Unit" value={it.itemUnit} /></DataTable.Cell>
                            <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} /></DataTable.Cell>
                            <TextInput  keyboardType='numeric' mode="outlined" label="Price" value={it.itemPrice} onChangeText={(text)=>ItemChange2(index, "itemPrice", text, '')} />
                            <DataTable.Cell><View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                }
                            </View></DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    </DataTable>
                    }
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vendor_email} </Button>}>
                        {user2 ?
                            user2.map((item)=>{
                                return (
                                    <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />
                                )
                            })
                            :
                            <Menu.Item title="No Vendor Available" />
                        }
                    </Menu>
                    <Button mode="contained" style={styles.button} color='red' onPress={()=>submitForm3()}>Update Vendor</Button>
                    <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={()=>submitForm3()} >Update Vendor</Button>                          
                    </Card.Content>
                </Card>
            </View>
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
                width: '90%',
            },
            default: {
                width: '60%',
                marginTop: '2%',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        backgroundColor: 'white',
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