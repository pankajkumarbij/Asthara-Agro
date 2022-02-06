import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { all_confirm_purchase_order_by_id } from '../../services/order_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Purchase_Order_Confirm3(props, {route}) {
    
    var purchaseconfirmid = ""; 
    if(Platform.OS=="android"){
        purchaseconfirmid = route.params.purchaseConfirmId;
    }
    else{
        purchaseconfirmid = props.match.params.purchaseconfirmid;
    }

    const [items, setItems] = useState();
    
    useEffect(() => {

        if(purchaseconfirmid){
            all_confirm_purchase_order_by_id(purchaseconfirmid)
            .then(result=>{
                setItems(result[0].items);
            })
        }

    }, [purchaseconfirmid]);
  
    return (
        <Provider theme={theme}>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="View Confirm Purchase Order"/>
                    <Card.Content>
                        {items &&
                            <DataTable style={{marginTop: '20px'}}>
                                <DataTable.Row>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity}  /></DataTable.Cell>
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
    },
}); 