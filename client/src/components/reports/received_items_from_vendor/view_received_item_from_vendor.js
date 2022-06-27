import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme,DataTable } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function View_Received_Order_From_Vendor( props, {route}) {

    var id="";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [pickupAssignId, setPickupAssignId] = useState("");
    const [order_id, setOrderId] = useState("")
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState(""); 
    const [vNumber, setVNumber] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPickupAssignId(id);
        }
        else{
            setHost("localhost");
            setPickupAssignId(id);
            setOrderId(order_id);
        }

        if(pickupAssignId){
            fetch(`http://${host}:5000/retrive_rfv_by_id/${id}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setOrderId(item[0].purchase_order.custom_orderId);
                setItems(item[0].purchase_order.items);
                setVendorId(item[0].purchase_order.custom_vendorId);
                setBuyerId(item[0].purchase_order.buyer_id);
                setVNumber(item[0].vehicle_number);
                setDriverName(item[0].driver_name);
                setDriverMobileNumber(item[0].driver_mobile_no);
                setLabourName(item[0].labour_name);
                setLabourMobileNumber(item[0].labour_mobile_no);
            });
        }

    }, [host,pickupAssignId,order_id,id]);

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

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="View Details of Received Order item"/>
                    <Card.Content>

                        {order_id ?
                           <TextInput style={styles.input} mode="outlined" label="Order Id" value={order_id} />
                           :null
                        }

                        {vendor_id ?
                            <TextInput style={styles.input} mode="outlined" label="Vendor ID" value={vendor_id} />: null
                        }

                        {buyer_id ?
                            <TextInput style={styles.input} mode="outlined" label="Buyer ID" value={buyer_id} />: null
                        }

                        {vNumber ?
                            <TextInput style={styles.input} mode="outlined" label="Vehicle Number" value={vNumber} />: null
                        }

                        {driverName ?
                            <TextInput style={styles.input} mode="outlined" label="Driver Name" value={driverName} />:null
                        }

                        {driverMobileNumber ?
                            <TextInput style={styles.input} mode="outlined" label="Driver Number" value={driverMobileNumber} />: null
                        }   

                        {labourName ?
                            <TextInput style={styles.input} mode="outlined" label="Labour Name" value={labourName} />: null
                        }

                        {labourMobileNumber ?
                            <TextInput style={styles.input} mode="outlined" label="Labour Number" value={labourMobileNumber} />: null
                        }   

                        {items ?
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>ItemChange(0, "quantity", text, '')} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>ItemChange2(0, "itemPrice", text, '')} /></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>    : null        
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