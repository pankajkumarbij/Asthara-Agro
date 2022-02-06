import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { pickup_assignment_by_id } from '../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function View_Pickup_Assignment2(props, {route}) {
    
    var pickupId = ""; 
    if(Platform.OS=="android"){
        pickupId = route.params.pickupAssignId;
    }
    else{
        pickupId = props.match.params.pickupId;
    }
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [roleas, setRoleas] = useState("");
    
    useEffect(() => {

        setRoleas(props.roleas);
        if(pickupId){
            pickup_assignment_by_id(pickupId)
            .then(result=>{
                setItems(result[0].items);
                setVendorId(result[0].vendor_id);
                setBuyerId(result[0].buyer_id);
            })
        }

    }, [pickupId,roleas,props.roleas]);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="View Pickup Assignment2"/>
                    <Card.Content>
                        {buyer_id &&
                            <TextInput mode="outlined" label="Buyer Id" value={ buyer_id}  />
                        }

                        {vendor_id &&
                            <TextInput mode="outlined" label="Vendor Id" value={vendor_id}  />
                        }

                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice}  /></DataTable.Cell>
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