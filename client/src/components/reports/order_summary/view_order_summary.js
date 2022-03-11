import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme, DataTable, Title, Button, Portal, Modal } from 'react-native-paper';
import { Order_by_id } from '../../../services/order_api';
import { useHistory } from 'react-router-dom';
import { order_status_by_orderId } from '../../../services/report/order_status';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewOrderSummary(props,{route}) {

    let history = useHistory();

    var orderid = "";
    if(Platform.OS=="android"){
        orderid = route.params.orderId;
    }
    else{
        orderid = props.match.params.orderid;
    }
    
    const [order, setOrder] = useState();
    const [allOrderStatus, setAllOrderStatus] = useState();
    const [visible, setVisible] = useState(false);
    const [it, setIt] = useState();

    useEffect(() => {

        if(orderid){
            Order_by_id(orderid)
            .then(result=> {
                setOrder(result);
            })
        }

        if(order){
            var date=order[0].order_date.substring(0,10);
            var d=new Date(order[0].order_date);
            d.toTimeString();
            d=String(d);
            var hour=d.substring(16,18);
            var custom_orderId=order[0].nick_name+"_"+order[0].postal_code+"_"+date+"_"+hour;

            if(custom_orderId){
                order_status_by_orderId(custom_orderId)  
                .then(result => {
                    setAllOrderStatus(result);
                })
            }
        }

    }, [orderid, order]);

    function goBack(){
        history.push('/ordersummary');
    }

    const showModal = (val) => {
        setVisible(true);
        setIt(val);
    };
    const hideModal = () => setVisible(false);

    const containerStyle = {backgroundColor: 'white',width: '30%', alignSelf: 'center'};

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <>
                            <DataTable>
                                <DataTable.Header>
                                    <DataTable.Title>Item Name</DataTable.Title>
                                    <DataTable.Title>Quantity</DataTable.Title>
                                    <DataTable.Title>status</DataTable.Title>
                                </DataTable.Header>
                                {it &&
                                    it.map((item)=>{
                                        return (
                                            <>
                                                <DataTable.Row>
                                                    <DataTable.Cell>{item.item_name+" ("+item.item_grade+")"}</DataTable.Cell>
                                                    <DataTable.Cell>{item.quantity}</DataTable.Cell>
                                                    <DataTable.Cell>{item.status}</DataTable.Cell>
                                                </DataTable.Row>
                                            </>
                                        )
                                    })
                                }
                            </DataTable>
                        </>
                    </Modal>
                </Portal>
                <Card style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Title style={{ flex: 1,}} title="View Order Summary"/>
                        <Button mode="contained" style={styles.button, { flex: 1,}} onPress={()=>goBack()}>Go Back</Button>
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
                            {order[0].items && 
                                <DataTable>
                                    <Title style={{marginTop: '20px', marginBottom: '20px'}}>All Items</Title>
                                    <DataTable.Header>
                                        <DataTable.Title>Item Name</DataTable.Title>
                                        <DataTable.Title>unit</DataTable.Title>
                                        <DataTable.Title>Quantity</DataTable.Title>
                                        <DataTable.Title>Final Price</DataTable.Title>
                                        <DataTable.Title>Negotiate Price</DataTable.Title>
                                        <DataTable.Title>status</DataTable.Title>
                                        <DataTable.Title>Action</DataTable.Title>
                                    </DataTable.Header>
                                    
                                    {allOrderStatus && order[0].items.map((it) => {
                                        var val=allOrderStatus.filter(o => o.item_name === it.itemName);
                                        var q=0;
                                        for(var i=0; i<val.length; i++){
                                            if(val[i].status === "Reached at Sales Hub" || val[i].status === "Out for Delivery"){
                                                q+=parseInt(val[i].quantity);
                                            }
                                        }
                                        var s={backgroundColor: 'orange'};
                                        if(q==it.quantity && val[0].status === "Reached at Sales Hub"){
                                            s={backgroundColor: 'lightgreen'};
                                        }
                                        else if(q==it.quantity && val[0].status === "Out for Delivery"){
                                            s={backgroundColor: 'lightblue'};
                                        }
                                        return (
                                            <>
                                                <DataTable.Row style={s}>
                                                    <DataTable.Cell>{it.itemName}</DataTable.Cell>
                                                    <DataTable.Cell>{it.itemUnit}</DataTable.Cell>
                                                    <DataTable.Cell>{it.quantity}</DataTable.Cell>
                                                    <DataTable.Cell>{it.targetPrice}</DataTable.Cell>
                                                    <DataTable.Cell>{it.itemNegotiatePrice}</DataTable.Cell>
                                                    <DataTable.Cell>{val[0].status}</DataTable.Cell>
                                                    <DataTable.Cell><Button onPress={()=>showModal(val)}>Details</Button></DataTable.Cell>
                                                </DataTable.Row>
                                            </>
                                        )
                                    })}
                                </DataTable>
                            }
                        </>
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
    },
}); 
