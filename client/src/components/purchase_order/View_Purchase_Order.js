import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { purchase_order_by_id } from '../../services/order_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function View_Purchase_Order(props, {route}) {

    var id="";
    var purchaseid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseId;
    }
    else{
        purchaseid = props.match.params.purchaseid;
    }

    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [flag, setFlag] = useState(true);

    useEffect(() => {

        if(Platform.OS=="android"){
            setPurchaseId(id);
        }
        else{
            setPurchaseId(purchaseid);
        }
        if(flag && purchaseId){
            purchase_order_by_id(purchaseId)
            .then(result => {
                    setOrderId(result[0].order_id)
                    setItems(result[0].items);
                    setVendorId(result[0].vendor_id);
                    setStatus(result[0].status);
                    setFlag(false);
            })
        }

    }, [ purchaseId, purchaseid, id, items, order_id, vendor_id, status, flag]);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="View Purchase Order"/>
                    <Card.Content>
                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} /></DataTable.Cell>
                                    <TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} />
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