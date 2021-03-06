import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faSort } from '@fortawesome/free-solid-svg-icons';
import { all_accepted_purchase_order } from '../../services/order_api';
import { roleas, loginuserId } from '../../utils/user';
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
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');

    useEffect(() => {
        
        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_accepted_purchase_order()
        .then(result => {
            setAllPurchaseOrders(result)
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })
        
    }, [role, userId]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allPurchaseOrders].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllPurchaseOrders(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allPurchaseOrders].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllPurchaseOrders(sorted);
            setSortingOrder('ASC');
        }
    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title}>All Accepted Purchase Orders</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("custom_orderId")}><FontAwesomeIcon icon={ faSort } /> Order ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("custom_vendorId")}><FontAwesomeIcon icon={ faSort } /> Vendor ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("items.itemName")}><FontAwesomeIcon icon={ faSort } /> Item</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {(role && userId && role=="manager" && allPurchaseOrders) ?
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
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Purchase_Order', {purchaseId: purchaseOrder._id})}}></Button>
                                            :
                                            <Link to={"/View_Purchase_Order/"+purchaseOrder._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            }
                        }): null
                    }
                    {(role && userId && role=="vendor" && allPurchaseOrders) ?
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
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Purchase_Order', {purchaseId: purchaseOrder._id})}}>Check</Button>
                                            :
                                            <Link to={"/View_Purchase_Order/"+purchaseOrder._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            }
                        }): null
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
    title: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                textAlign: 'center',
                color: 'green',
                fontFamily: 'Roboto'
            },
            default: {
                textAlign: 'center',
                color: 'green',
                fontSize: 28,
                fontFamily: 'Roboto'
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
                width: '100%',
            },
            default: {
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 