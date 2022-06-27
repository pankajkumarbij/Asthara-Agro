import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable, Portal, Modal } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit,faStore } from '@fortawesome/free-solid-svg-icons';
import { pickup_assignment_confirm_by_id } from '../../services/pickup_api';
import { useHistory } from 'react-router-dom';
import { vendor_items_by_access_details } from '../../services/vendor_api';
import axios from 'axios';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Pickup_Assignment_Confirm_Buyer(props, {route}) {

    var id="";
    var pickupConfirmId = ""; 
    if(Platform.OS=="android"){
        id = route.params.pickupAssignId;
    }
    else{
        pickupConfirmId = props.match.params.pickupConfirmId;
    }

    const [pickupAssignId, setPickupAssignId] = useState("");
    const [order_id, setOrderId] = useState("")
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState(""); 
    const [purchaseOrder, setPurchaseOrder] = useState();
    const [min_quantity, setMinQuantity] = useState("");
    const [OTP, setOTP] = useState('');
    const [inputOtp, setInputOtp] = useState();
    const [visible, setVisible] = useState(false);

    function chooseOrder(order_id) {
        setOrderId(order_id);
    }

    let history = useHistory();

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
            pickup_assignment_confirm_by_id(pickupAssignId)
            .then(result => {
                setIndentId(result[0].indent_id);
                setOrderId(result[0].order_id);
                setItems(result[0].items);
                setVendorId(result[0].vendor_id);
                setBuyerId(result[0].buyer_id);
                setStatus(result[0].status);
                setPurchaseOrder(result[0]);
            })
        }

        if(vendor_id && items){
            vendor_items_by_access_details(vendor_id, items.itemName, items.Grade)
            .then(result => {
                setMinQuantity(result[0].min_quantity);
            })
        }

    }, [host,pickupAssignId,order_id,pickupConfirmId,id,vendor_id,items]);

    function submitForm3(){
        alert("Payment Success!");
        fetch(`http://${host}:5000/create_completed_purchase_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchase_order: purchaseOrder,               
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });
        
        if(min_quantity-items.quantity>0){
            fetch(`http://${host}:5000/create_excess_inventory`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vendorId: vendor_id, 
                    buyerId: buyer_id, 
                    items: items,
                    excess_quantity: min_quantity-items.quantity,
                    reserved: min_quantity-items.quantity
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                // alert(data.message);
                console.log(data);
            });
        }

        fetch(`http://${host}:5000/update_order_item_status/${purchaseOrder.custom_orderId}/${purchaseOrder.items.itemName}/${purchaseOrder.items.Grade}/${purchaseOrder.items.quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status:"Picked Up from Vendor's Hub",
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            //  alert(data.message);
        });
        
        history.push("/all_pickup_assignment_confirm_buyer");
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

    const sendSmsOtp = async (mobileNumber, otp) => {
        const url = 'http://34.131.139.104/SMS/msg';
        let returnData;
        const bodyData = {
            "mobileNumber" : mobileNumber,
            "otp" :  otp
        };
        const response = await axios.post(url, bodyData);
        if (response.status === 200) {
            returnData = {
                status: 'Success',
                ...response.data,
            };
        } else {
            returnData = {
            status: 'Failure',
            };
        }
    }

    const generateOTP = (mobileNumber) => {
        const characters ='0123456789';
        const characterCount = characters.length;
        let OTPvalue = '';
        for (let i = 0; i < 4; i++) {
            OTPvalue += characters[Math.floor(Math.random() * characterCount)];
        }
        setOTP(OTPvalue);
        if(OTPvalue) {
            sendSmsOtp(mobileNumber, OTPvalue);
            showModal();
        }
        return OTPvalue;
    };

    function validateOTP(){
        if(inputOtp && OTP && inputOtp==OTP){
            submitForm3();
            setInputOtp("");
            setOTP("");
        }
        else{
            alert("Invalid OTP, please try again !!");
        }
    }

    const showModal = () => {
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white',width: '50%', alignSelf: 'center', padding: "10px"};

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <>
                            <TextInput mode="outlined" label="Enter OTP" value={inputOtp} onChange={(e)=>setInputOtp(e.target.value)} />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Button mode="contained" onPress={() => generateOTP(6378298502)} style={{width: '40%', marginTop: '20px'}} color="red">Resend OTP</Button>
                                <Button mode="contained" onPress={() => validateOTP()} style={{width: '40%', marginTop: '20px'}}>Validate OTP</Button>
                            </View>
                        </>
                    </Modal>
                </Portal>
                <Card style={styles.card}>
                    <Card.Title title="Edit Pickup Assignment Confirm Buyer"/>
                    <Card.Content>
                        {order_id &&
                            <Button style={styles.input} mode="outlined">Order ID: {order_id}</Button>
                        }

                        {pickupAssignId &&
                            <Button style={styles.input} mode="outlined">Pickup Assign ID: {pickupAssignId}</Button>
                        }

                        {buyer_id &&
                            <Button style={styles.input} mode="outlined">Buyer ID: {buyer_id}</Button>
                        }

                        {vendor_id &&
                            <Button style={styles.input} mode="outlined">Vendor ID: {vendor_id}</Button>
                        }

                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} /></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>            
                        }
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={() => generateOTP(6378298502)}>Payment</Button>
                        <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faStore } />} style={styles.button} onPress={()=>{submitForm2();submitForm4()}}>Update Inventoryy</Button> 
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