import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme, DataTable, Title, Button, Portal, Modal } from 'react-native-paper';
import { Delivered_order_by_id } from '../../../services/report/delivered';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { url } from '../../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function MakeOrderDelivery(props,{navigation,route}) {

    let history = useHistory();

    var orderid = "";
    if(Platform.OS=="android"){
        orderid = route.params.id;
    }
    else{
        orderid = props.match.params.id;
    }
    
    const [order, setOrder] = useState();
    const [flag, setFlag] = useState(true);
    const [its, setIts] = useState();
    const [OTP, setOTP] = useState('');
    const [inputOtp, setInputOtp] = useState();
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        if(orderid){
            Delivered_order_by_id(orderid)
            .then(result=> {
                setOrder(result[0].order);
                if(flag){
                    setIts(result[0].order[0].items);
                    setFlag(false);
                }
            })
        }

    }, [orderid, flag]);

    function goBack(){
        history.push('/');
    }

    const ItemChange = (index, fieldvalue) => {
        var values = [...its];
        values[index].quantity = fieldvalue;
        setIts(values);
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
            submit();
            setInputOtp("");
            setOTP("");
        }
        else{
            alert("Invalid OTP, please try again !!");
        }
    }

    function submit(){

        var date=order[0].order_date.substring(0,10);
        var d=new Date(order[0].order_date);
        d.toTimeString();
        d=String(d);
        var hour=d.substring(16,18);
        var custom_orderId=order[0].nick_name+"_"+order[0].postal_code+"_"+date+"_"+hour;

        its.map((it, index) => {

            var quantity = order[0].items[index].quantity-it.quantity;

            axios.post(url + '/create_rejected_items', {
                order_id: order[0]._id,
                custom_orderId: custom_orderId,
                item_name: it.itemName,
                unit: it.itemUnit,
                quantity: quantity,
                final_price: it.targetPrice,
                negotiate_price: it.itemNegotiatePrice,
            })
            .then(function (response) {
                // alert(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
        })

        axios.put(url + '/update_delivered/'+orderid, {
            items: its,
        })
        .then(function (response) {
            alert(response.data.message);
            if(response.data.message=="Order Delivered Sucessfully" && Platform.OS=='android'){
                navigation.navigate("/allorderdeliveries/"+orderid);
            }
            else if(response.data.message=="Order Delivered Sucessfully"){
                history.push("/allorderdeliveries");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    const showModal = () => {
        setVisible(true);
    };
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white',width: '50%', alignSelf: 'center', padding: "10px"};

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
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
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Title style={{ flex: 1,}} title="Make Delivery"/>
                        <Button mode="contained" style={styles.button} onPress={()=>goBack()}>Go Back</Button>
                    </View>
                    <Card.Content>
                    {order &&
                        <>
                            <TextInput style={styles.input} mode="outlined" label="Full Name" value={order[0].name} />
                            <TextInput style={styles.input} mode="outlined" label="Email" value={order[0].email} />
                            <TextInput style={styles.input} mode="outlined" label="Mobile no" value={order[0].mobile_no} />
                            <TextInput style={styles.input} mode="outlined" label="Address" value={order[0].address} multiline rows={5} />
                            <TextInput style={styles.input} mode="outlined" label="Landmark" value={order[0].landmark} />
                            <TextInput style={styles.input} mode="outlined" label="District" value={order[0].district} />
                            <TextInput style={styles.input} mode="outlined" label="State" value={order[0].state} />
                            <TextInput style={styles.input} mode="outlined" label="Country" value={order[0].country} />
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={order[0].postal_code} />
                        </>
                    }
                    {its && 
                        <DataTable>
                            <Title style={{marginTop: '20px', marginBottom: '20px'}}>All Items</Title>
                            <DataTable.Header>
                                <DataTable.Title>Item Name</DataTable.Title>
                                <DataTable.Title>unit</DataTable.Title>
                                <DataTable.Title>Quantity</DataTable.Title>
                                <DataTable.Title>Final Price</DataTable.Title>
                                <DataTable.Title>Negotiate Price</DataTable.Title>
                            </DataTable.Header>
                            
                            {its.map((it, index) => {
                                return (
                                    <>
                                        <DataTable.Row>
                                            <DataTable.Cell>{it.itemName}</DataTable.Cell>
                                            <DataTable.Cell>{it.itemUnit}</DataTable.Cell>
                                            <DataTable.Cell><TextInput style={{marginTop: '2%', width: '70%'}} mode="outlined" label="Qty" value={it.quantity} onChange={(e)=>ItemChange(index, e.target.value)} /></DataTable.Cell>
                                            <DataTable.Cell>{it.targetPrice}</DataTable.Cell>
                                            <DataTable.Cell>{it.itemNegotiatePrice}</DataTable.Cell>
                                        </DataTable.Row>
                                    </>
                                )
                            })}
                        </DataTable>
                    }
                    {Platform.OS=='android' ?
                        <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditOrder', {itemId: orderid})}}>Deliver Now</Button>
                        :
                        <Button mode="contained" onPress={() => generateOTP(6378298502)} style={{width: '100%', marginTop: '20px'}}>Deliver Now</Button>
                    }
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
        flex: 1,
    },
}); 
