import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faEdit,faStore } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function View_Pickup_Assignment_Confirm_Buyer(props, {route}) {

    var id="";
    var pickupConfirmId = ""; 
    if(Platform.OS=="android"){
        id = route.params.pickupAssignId;
    }
    else{
        pickupConfirmId = props.match.params.pickupConfirmId;
    }

    const [visible2, setVisible2] = useState(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [pickupAssignId, setPickupAssignId] = useState("");
    const [order_id, setOrderId] = useState("")
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState(""); 

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
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setBuyerId(item[0].buyer_id);
                setStatus(item[0].status);
            });
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

    function submitForm3(){
        alert("Payment in progress!");
    };
   
    function submitForm2() {
        fetch(`http://${host}:5000/update_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indent_id:indent_id,
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

    function submitForm4(orderId) {
        console.log("====="+ order_id )
        chooseOrder(orderId);
        console.log("OKOKOKOK"+ orderId);
        fetch(`http://${host}:5000/update_completion_status/${order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completion_status: "pending for sales",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="View Pickup Assignment Confirm Buyer"/>
                    <Card.Content>
                        {order_id &&
                           <TextInput style={styles.input} mode="outlined" label="Order Id" value={order_id} />
                        }

                        {pickupAssignId &&
                            <TextInput style={styles.input} mode="outlined" label="Pickup Assign ID" value={pickupAssignId} />
                        }

                        {buyer_id &&
                            <TextInput style={styles.input} mode="outlined" label="Buyer ID" value={buyer_id} />
                        }

                        {vendor_id &&
                            <TextInput style={styles.input} mode="outlined" label="Vendor ID" value={vendor_id} />
                        }

                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>ItemChange(0, "quantity", text, '')} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>ItemChange2(0, "itemPrice", text, '')} /></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>            
                        }
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
                width: '75%',
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