import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
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

export default function Edit_Purchase_Order(props, {route}) {

    var id="";
    var purchaseid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseId;
    }
    else{
        purchaseid = props.match.params.purchaseid;
    }

    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrder_Id] = useState("");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);
    const [quantity, setQuantity] = useState();
    const [actualQuantity, setActualQuantity] = useState();
    const [vendorsid, setVendorsid] = useState([]);
    const [orderId, setOrderId] = useState("");
    const [custom_orderId, setCustomId] = useState("");
    const [custom_vendorId, setCustomVendorId] = useState();
    const [vendorPoolId, setVendorPoolId] = useState("");
    const [customerPoolId, setCustomerPoolId] = useState("");
    const [managerPoolId, setManagerPoolId] = useState("");
    const [sales_id, setSalesId] = useState("");
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    let history = useHistory();

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseId(id);
        }
        else{
            setHost("localhost");
            setPurchaseId(purchaseid);
        }

        if(flag && purchaseId){
            fetch(`http://${host}:5000/retrive_purchase_order/${purchaseid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setOrder_Id(item[0].order_id)
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setStatus(item[0].status);
                setFlag(false);
                setQuantity(item[0].items.quantity);
                setCustomId(item[0].custom_orderId);
                setOrderId(item[0].orderId);
                setCustomVendorId(item[0].custom_vendorId);
                setVendorPoolId(item[0].vendorPoolId);
                setCustomerPoolId(item[0].customerPoolId);
                setManagerPoolId(item[0].managerPoolId);
                setSalesId(item[0].sales_id);
            });
        }

        if(flag3 && order_id){
            fetch(`http://${host}:5000/retrive_order_item_summary_quantity/${order_id}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setActualQuantity(item.quantity);
                setVendorsid(item.vendor_rejected);
                setFlag3(false);
            });
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

    }, [host, purchaseId, purchaseid, id, items, order_id, vendor_id, status, flag,vendorsid,actualQuantity,flag2,flag3]);

    function submitForm() {

        fetch(`http://${host}:5000/update_order_item_status/${custom_orderId}/${items.itemName}/${items.Grade}/${items.quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status:"Vendor Accepted",
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
        
        fetch(`http://${host}:5000/update_purchase_order/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,          
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });   

        // for create Purchase Receipt
        fetch(`http://${host}:5000/create_purchase_confirm`, {
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
                sales_id:sales_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,
                vendorPoolId: vendorPoolId,
                customerPoolId: customerPoolId,
                managerPoolId:managerPoolId,
            })
        }) 
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
            history.push('/All_Pending_Purchase_Orders');
        });   

        //for change the status
        fetch(`http://${host}:5000/update_purchase_status/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: "Vendor Accepted",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });

        alert("Accepted Available Quantity");
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
                status:"Rejected by Vendor",
                vendor_reject:vendorsid,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        }); 

        //for change the status
        fetch(`http://${host}:5000/update_purchase_status/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: "Vendor Rejected",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });

        alert("Purchase Order Rejected Successfully");
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Purchase Order"/>
                    <Card.Content>
                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={quantity} onChangeText={(text)=>setQuantity(text)} /></DataTable.Cell>
                                    <TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} />
                                </DataTable.Row>
                            </DataTable>
                        }   
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={()=>submitForm()} >Accept Available Quantity</Button>
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faTrash } />} style={styles.button} onPress={()=>submitForm2()} color="red" >Reject The Purchase Order</Button>
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