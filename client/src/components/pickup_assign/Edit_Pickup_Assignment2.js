import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, Image} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable, Text } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { pickup_assignment_by_id } from '../../services/pickup_api';
import { order_item_summary_quantity } from '../../services/order_api';
import { useHistory } from 'react-router-dom';
import { all_vendor_items_by_itemid } from '../../services/vendor_api';
import { roleas, loginuserId } from '../../utils/user';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Pickup_Assignment(props, {route}) {
    
    var id="";
    var pickupId = ""; 
    if(Platform.OS=="android"){
        id = route.params.pickupAssignId;
    }
    else{
        pickupId = props.match.params.pickupId;
    }

    const [pickupAssignId, setPickupAssignId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrder_Id] = useState("");
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState("");
    const [quantity, setQuantity] = useState();
    const [actualQuantity, setActualQuantity] = useState();
    const [vendorsid, setVendorsid] = useState([]);
    const [flag2, setFlag2] = useState(true);
    const [flag5, setFlag5] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [orderId, setOrderId] = useState("");
    const [custom_orderId, setCustomId] = useState("");
    const [custom_vendorId, setCustomVendorId] = useState();
    const [vendorPoolId, setVendorPoolId] = useState("");
    const [customerPoolId, setCustomerPoolId] = useState("");
    const [managerPoolId, setManagerPoolId] = useState("");
    const [image,setImage]=useState("");
    const [sales_id, setSalesId] = useState("");
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    let history = useHistory();

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPickupAssignId(id);
        }
        else{
            setHost("localhost");
            setPickupAssignId(pickupId);
        }

        if(pickupAssignId && flag5){
            pickup_assignment_by_id(pickupAssignId)
            .then(result=>{
                setOrder_Id(result[0].order_id);
                setPurchaseId(result[0].purchaseId);
                setItems(result[0].items);
                setVendorId(result[0].vendor_id);
                setBuyerId(result[0].buyer_id);
                setStatus(result[0].status);
                setQuantity(result[0].items.quantity);
                setOrderId(result[0].orderId);
                setCustomId(result[0].custom_orderId);
                setCustomVendorId(result[0].custom_vendorId);
                setVendorPoolId(result[0].vendorPoolId);
                setCustomerPoolId(result[0].customerPoolId);
                setManagerPoolId(result[0].managerPoolId);
                setSalesId(result[0].sales_id);
                setFlag5(false);
            })
        }

        if(flag3 && order_id){
            order_item_summary_quantity(order_id)
            .then(result=>{
                setActualQuantity(result.quantity);
                setVendorsid(result.vendor_rejected);
                setFlag3(false);
            })
        }

        if(items){
            all_vendor_items_by_itemid(items.itemId)
            .then(result=>{
                setImage(result[0].image);
            })
        }

        if(vendorsid == null) {
            setVendorsid([]);
        }

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    }, [pickupAssignId,items, pickupId,id, order_id,flag2,vendorsid,flag3,flag5]);

    function submitForm() {

        fetch(`http://${host}:5000/update_order_item_status/${custom_orderId}/${items.itemName}/${items.Grade}/${items.quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status:"Buyer Accepted",
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            //  alert(data.message);
        });

        if(parseInt(items.quantity)-parseInt(quantity)!=0){

            fetch(`http://${host}:5000/update_order_quantity/${custom_orderId}/${items.itemName}/${items.Grade}/${items.quantity}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quantity:quantity,
                    split_status:"Split",
                })
            }).then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                //  alert(data.message);
            });

            fetch(`http://${host}:5000/create_order_status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: custom_orderId,
                    item_name: items.itemName,
                    item_grade: items.Grade,
                    quantity: parseInt(items.quantity)-parseInt(quantity),
                    status: "Pending for Vendor Assignment",
                    split_status: "Split"
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                // alert(data.message);
            });
        }

        const values2 = items;
        values2.quantity = parseInt(items.quantity)-parseInt(quantity);
        setItems(values2);
    
        if(items.quantity!=0){
            const values3 = vendorsid;
            values3.push(vendor_id);
            setVendorsid(values3);
        }

        // for splitted orders remaining quantity purchase order creation process
        fetch(`http://${host}:5000/create_order_item_summary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                orderId: orderId,
                custom_orderId: custom_orderId,
                item: items,
                vendor_rejected: vendorsid,
                customerPoolId: customerPoolId,
                vendorPoolId: vendorPoolId,
                managerPoolId: managerPoolId,
                sales_id: sales_id,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });

        const values = items;
        values.quantity = quantity;
        setItems(values);

        fetch(`http://${host}:5000/update_pickup_assign_status/${pickupAssignId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: "Buyer Accepted from Vendor",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });

        fetch(`http://${host}:5000/create_pickup_assign_confirm`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchaseId:purchaseId,
                order_id:order_id,
                orderId:orderId,
                custom_orderId:custom_orderId,
                custom_vendorId:custom_vendorId,
                sales_id: sales_id,
                items:items,   
                vendor_id:vendor_id,
                buyer_id:buyer_id,
                pickupAssignId:pickupAssignId, 
                status:status,   
                vendorPoolId: vendorPoolId,
                customerPoolId: customerPoolId,
                managerPoolId: managerPoolId,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
            history.push('/all_accepted_pickup_assignment');
        });   

        alert("Successfully Accepted From vendor");
    }

    function submitForm2() {

        const values2 = items;
        values2.quantity = parseInt(actualQuantity)+parseInt(items.quantity);
        setItems(values2);
        
        const values3 = vendorsid;
        values3.push(vendor_id);
        setVendorsid(values3);

        //for splitted orders remaining quantity purchase order creation process
        fetch(`http://${host}:5000/update_quantity_order_item_summary/${order_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item:items,
                status:"Rejected from Buyer",
                vendor_rejected:vendorsid,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        }); 

        fetch(`http://${host}:5000/update_pickup_assign_status/${pickupAssignId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: "Buyer Rejected from Vendor",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });

        alert("Successfully Rejected");
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Pickup Assignment2"/>
                    <Card.Content>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex:1, marginTop: '2%', }}>
                                {image ?
                                        <Image
                                            style={{width: 200, height: 160, border: '1px solid black'}}
                                            source={image}
                                        />
                                    :
                                        <Text>No Image</Text>
                                }
                            </View>
                            <View style={{ flex:3, }}>
                            {buyer_id &&
                                <TextInput style={styles.input} mode="outlined" label="Buyer Id" value={buyer_id} />
                            }

                            {vendor_id &&
                                <TextInput style={styles.input} mode="outlined" label="Vendor Id" value={vendor_id} />
                            }
                            </View>
                        </View>

                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={quantity} onChangeText={(text)=>setQuantity(text)} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} /></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        }
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={()=>submitForm()} >Accept Available Quantity</Button>
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faTrash } />} style={styles.button} onPress={()=>submitForm2()} color="red" >Reject for Whole Quantity</Button>
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