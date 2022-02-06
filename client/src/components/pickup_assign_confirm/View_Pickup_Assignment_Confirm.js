import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import {  pickup_assignment_confirm_by_id } from '../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function View_Pickup_Assignment_Confirm(props, {route}) {
    
    var pickupConfirmId = ""; 
    if(Platform.OS=="android"){
        pickupConfirmId = route.params.pickupAssignId;
    }
    else{
        pickupConfirmId = props.match.params.pickupConfirmId;
    }

    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");

    useEffect(() => {

        if(pickupConfirmId){
            pickup_assignment_confirm_by_id(pickupConfirmId)
            .then(result=>{
                console.log(result);
                setItems(result[0].items);
                setVendorId(result[0].vendor_id);
                setBuyerId(result[0].buyer_id);
            })
        }

    }, [pickupConfirmId]);

    return (
        <Provider theme={theme}>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="View Pickup Assignment Confirm"/>
                    <Card.Content>

                        {pickupConfirmId &&
                            <TextInput style={styles.input} mode="outlined" label="Pickup Assign ID" value={pickupConfirmId} />
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
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} /></DataTable.Cell>
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