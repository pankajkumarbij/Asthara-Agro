import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_accepted_purchase_order } from '../../services/order_api';
import { role, userId } from '../../utils/user';
import { users_by_id } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Accepted_Purchase_Orders(props,{ navigation }) {

    const [allPurchaseOrders, setAllPurchaseOrders] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [managerPoolId, setManagerPoolId] = useState('');

    useEffect(() => {
        
        if(role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_accepted_purchase_order()
        .then(result => {
            setAllPurchaseOrders(result)
        })
        
    }, [allPurchaseOrders]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title >All Accepted Purchase Orders</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title >Order ID</DataTable.Title>
                        <DataTable.Title >Vendor ID</DataTable.Title>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {(role=="manager" && allPurchaseOrders) &&
                        allPurchaseOrders.map((purchaseOrder,index)=>{
                            if(purchaseOrder.managerPoolId==managerPoolId)
                            if(purchaseOrder._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{purchaseOrder.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{purchaseOrder.custom_vendorId}</DataTable.Cell>
                                    <DataTable.Cell>{purchaseOrder.items.itemName+" ("+purchaseOrder.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '50%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Purchase_Order', {purchaseId: purchaseOrder._id})}}>Details</Button>
                                            :
                                            <Link to={"/View_Purchase_Order/"+purchaseOrder._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            }
                        })
                    }
                    {(role=="vendor" && allPurchaseOrders) &&
                        allPurchaseOrders.map((purchaseOrder,index)=>{
                            if(purchaseOrder.vendor_id==userId)
                            if(purchaseOrder._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{purchaseOrder.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{purchaseOrder.custom_vendorId}</DataTable.Cell>
                                    <DataTable.Cell>{purchaseOrder.items.itemName+" ("+purchaseOrder.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '50%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Purchase_Order', {purchaseId: purchaseOrder._id})}}>Details</Button>
                                            :
                                            <Link to={"/View_Purchase_Order/"+purchaseOrder._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            }
                        })
                    }
                </DataTable>
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: '2%',
        alignSelf: 'center',
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '20%',
            }
        })
    },
    datatable: {
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        padding: '2%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                width: '90%',
            },
            default: {
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 