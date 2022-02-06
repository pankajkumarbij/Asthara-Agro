import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, CheckBox } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes, faTrash, faUpload,faEdit,faStore, faReceipt } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditCompletedOrder2(props, {route}) {

    
    var id="";
    var pickupConfirmId = ""; 
    if(Platform.OS=="android"){
        id = route.params.pickupAssignId;
    }
    else{
        pickupConfirmId = props.match.params.pickupConfirmId;
    }

    
    const [visible, setVisible] = useState([]);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const [isSelected, setSelection] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const [pickupAssignId, setPickupAssignId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    // const [orderId, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    // const [buyer_id,setPickupAssId] = useState("");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:''}]);
    const [finalPrice,setFinalPrice] = useState("");

    const [vendor_id,setVendorId] = useState("Choose Vendor");

    

    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);


    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }
    function chooseBuyer(buyerId) {
        setBuyerId(buyerId);
        closeMenu2();
    }
    function chooseVendor(vendorId) {
        setVendorId(vendorId);
        closeMenu2();
    }
    function choosePickup(pickupAssignId) {
        setPickupAssignId(pickupAssignId);
        closeMenu2();
    }
    function chooseOrder(order_id) {
        setOrderId(order_id);
        closeMenu2();
    }
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPickupAssignId(id);
        }
        else{
            setHost("localhost");
            setPickupAssignId(pickupConfirmId);
            setOrderId(order_id);
            // addValue(10);

        }
        if(pickupAssignId){
       
            fetch(`http://${host}:5000/retrive_pickup_assignment_confirm/${pickupConfirmId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setIndentId(item[0].indent_id);
                setOrderId(item[0].order_id);
                setPurchaseId(item[0].purchaseId);
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setBuyerId(item[0].buyer_id);
                setStatus(item[0].status);
                setFlag(true);
                // console.log(item[0].order_id)
            });

            // .then(item => {
            // setItems(item[0].items);
            // setFlag(true);
            // });

            
       }

    }, [host,pickupAssignId,order_id,pickupConfirmId,id]);

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
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
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
    // const closeMenu = (index) => {
    //     const values = [...visible];
    //     values[index]=false;
    //     setVisible(values);
    // };
    
   

    // const StatusChange = (s, id,) => {
    //     fetch(`http://${host}:5000/update_completion_status/${id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             completion_status: s,
    //         })
    //     })
    //     .then(res => res.json())
    //     .catch(error => console.log(error))
    //     .then(data => {
    //         alert("Done");
    //         console.log(data);
    //     });
    //     // closeMenu(index);
    // };
    // function submitForm() {
    //     fetch(`http://${host}:5000/update_purchase_order_confirm/${purchaseconfirmid}`, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             indent_id:indent_id,
    //             order_id:order_id,
    //             items:items,   
    //             vendor_id:vendor_id, 
    //             status:status,          
    //         })
    //     })
    //     .then(res => res.json())
    //     .catch(error => console.log(error))
    //     .then(data => {
    //         alert(data.message);
    //         console.log(data);
    //     });   
    // }
    function submitForm3(){
        alert("Payment in progress!");
    };
   
    
    // for update inventory function
        function submitForm2() {
            // alert("Update Inventory in progress!");
            fetch(`http://${host}:5000/update_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indent_id:indent_id,
                // purchaseConfirmId:purchaseConfirmId,
                order_id:order_id,
                pickupAssignId:pickupAssignId,
                items:items,   
                vendor_id:vendor_id,
                buyer_id:buyer_id, 
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
    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }
    //  function submitForm() {
    //         fetch(`http://${host}:5000/create_pickup_assign_confirm`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },     
    //         body: JSON.stringify({
    //             indent_id:indent_id,
    //             purchaseId:purchaseId,
    //             order_id:order_id,
    //             items:items,   
    //             vendor_id:vendor_id,
    //             buyer_id:buyer_id,
    //             pickupAssignId:pickupAssignId, 
    //             status:status,                          
    //         })
    //     }
    //     )   
    //     .then(res => res.json())
    //     .catch(error => console.log(error))
    //     .then(data => {
    //         alert(data.message);
    //         console.log(data);
            
    //     });   
    // }

 function submitForm4(orderId) {
        console.log("====="+ order_id )
        // setOrderId(order_id);
        chooseOrder(orderId);
        console.log("OKOKOKOK"+ orderId);
        fetch(`http://${host}:5000/update_completion_status/${order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completion_status: "completion_status_done",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            // console.log(data);
        });
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Pickup Assignment Confirm Buyer"/>
                    <Card.Content>
                    {order_id &&
                    <Menu 
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{order_id}</Button>}>
                        <Menu.Item title="${pId}" onPress={()=>chooseOrder(order_id)} />
                    </Menu>
                    }

                    {pickupAssignId &&
                    <Menu 
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{pickupAssignId}</Button>}>
                        <Menu.Item title="${pId}" onPress={()=>choosePickup(pickupAssignId)} />
                    </Menu>
                    }
                    {buyer_id &&
                    <Menu 
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{buyer_id}</Button>}>
                        <Menu.Item title="${pId}" onPress={()=>chooseBuyer(buyer_id)} />
                    </Menu>
                    }
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
                            <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={it.itemPrice} onChangeText={(text)=>ItemChange2(index, "itemPrice", text, '')} /></DataTable.Cell>
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

                    {/* <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faStore } />} style={styles.button} onPress={()=>submitForm()} >Confirm Pickup Assignment</Button> */}
                    
                    <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} 
                    onPress={()=>submitForm3()}
                     >Payment</Button>
                   
                    <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faStore } />} style={styles.button} 
                    // onPress={()=>submitForm4()}
                    onPress={()=>{submitForm2();submitForm4()}} 
                    // onPress={()=>{()=>submitForm2();submitForm4()}}
                     >Update Inventoryy</Button> 

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
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginTop: '4%',
                marginBottom: '4%',
                width: '70%',
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