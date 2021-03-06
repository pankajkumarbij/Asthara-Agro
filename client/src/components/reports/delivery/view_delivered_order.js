import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme, DataTable, Title, Button, Portal, Modal } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { Delivered_order_by_id } from '../../../services/report/delivered';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewOrderDelivery(props,{route}) {

    let history = useHistory();

    var orderid = "";
    if(Platform.OS=="android"){
        orderid = route.params.id;
    }
    else{
        orderid = props.match.params.id;
    }
    
    const [order, setOrder] = useState();
    const [acceptedItems, setAcceptedItems] = useState();

    useEffect(() => {

        if(orderid){
            Delivered_order_by_id(orderid)
            .then(result=> {
                setOrder(result[0].order);
                setAcceptedItems(result[0].accepted_items);
            })
        }

    }, [orderid, order]);

    function goBack(){
        history.push('/allorderdeliveries');
    }

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Card.Title style={{ flex: 1,}} title="View Order Delivery Details"/>
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
                            {order[0].items && 
                                <DataTable>
                                    <Title style={{marginTop: '20px', marginBottom: '20px'}}>All Items</Title>
                                    <DataTable.Header>
                                        <DataTable.Title>Item Name</DataTable.Title>
                                        <DataTable.Title>unit</DataTable.Title>
                                        <DataTable.Title>Quantity</DataTable.Title>
                                        <DataTable.Title>Accepted</DataTable.Title>
                                        <DataTable.Title>Rejected</DataTable.Title>
                                        <DataTable.Title>Quantity</DataTable.Title>
                                        <DataTable.Title>Final Price</DataTable.Title>
                                        <DataTable.Title>Negotiate Price</DataTable.Title>
                                    </DataTable.Header>
                                    
                                    {acceptedItems && order[0].items.map((it, index) => {
                                        return (
                                            <>
                                                <DataTable.Row>
                                                    <DataTable.Cell>{it.itemName}</DataTable.Cell>
                                                    <DataTable.Cell>{it.itemUnit}</DataTable.Cell>
                                                    <DataTable.Cell>{it.quantity}</DataTable.Cell>
                                                    <DataTable.Cell>{acceptedItems[index].quantity}</DataTable.Cell>
                                                    <DataTable.Cell>{it.quantity-acceptedItems[index].quantity}</DataTable.Cell>
                                                    <DataTable.Cell>{it.targetPrice}</DataTable.Cell>
                                                    <DataTable.Cell>{it.itemNegotiatePrice}</DataTable.Cell>
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
        flex: 1,
    },
}); 
