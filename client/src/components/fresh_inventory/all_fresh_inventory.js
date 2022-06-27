import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView, Image } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faSort } from '@fortawesome/free-solid-svg-icons';
import { all_fresh_inventory } from '../../services/fresh_inventory';
import { users_by_id } from '../../services/user_api';
import {roleas, loginuserId} from '../../utils/user';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

//define all item components
export default function AllFreshInventory({navigation }) {
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');
    const [managerPoolId, setManagerPoolId] = useState('');
    const[role,setRole] = useState("");
    const [userId,setUserId] = useState("");

    useEffect(() => {
        //Retrieve all items
        all_fresh_inventory()
        .then(result => {
            setAllItems(result);
        })

        roleas()
        .then(result=>{
           setRole(result);   
        })

        loginuserId()
        .then(result=>{
           setUserId(result);   
        })

        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

    }, [role, userId]); 

    const sorting = ()=>{
        if(sorting_order=="ASC"){
            const sorted=([...allItems].sort((a,b)=>
            a.item_name.toLowerCase()>b.item_name.toLowerCase() ?1:-1));
            setAllItems(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allItems].sort((a,b)=>
            a.item_name.toLowerCase<b.item_name.toLowerCase ?1:-1));
            setAllItems(sorted);
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
                    <Title style={styles.title} >Fresh Inventory</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting()}><FontAwesomeIcon icon={ faSort } />Order Id</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting()}><FontAwesomeIcon icon={ faSort } />Item</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting()}><FontAwesomeIcon icon={ faSort } />Unit</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting()}><FontAwesomeIcon icon={ faSort } />Quantity</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting()}><FontAwesomeIcon icon={ faSort } />Price</DataTable.Title>
                        {/* <DataTable.Title numeric>Action</DataTable.Title> */}
                    </DataTable.Header>
                    {(role && userId && role=="manager" && allItems) ?
                    allItems.map((item)=>{
                        if(item.order.managerPoolId==managerPoolId)
                        if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{item.custom_orderId}</DataTable.Cell>
                                <DataTable.Cell>{item.item_name+" ("+item.grade+")"}</DataTable.Cell>
                                <DataTable.Cell>{item.unit}</DataTable.Cell>
                                <DataTable.Cell>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell>{item.price}</DataTable.Cell>
                                {/* <DataTable.Cell numeric>
                                    {Platform.OS=='android' ?
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>Details</Button>
                                        :
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}}><Link to={"/edititem/"+item._id}>Details</Link></Button>
                                    }
                                </DataTable.Cell> */}
                            </DataTable.Row>
                        )
                        }
                    })
                    :
                    null
                    }

                    {(role && userId && role=="buyer" && allItems) ?
                    allItems.map((item)=>{
                        if(item.order.buyer_id==userId)
                        if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{item.custom_orderId}</DataTable.Cell>
                                <DataTable.Cell>{item.item_name+" ("+item.grade+")"}</DataTable.Cell>
                                <DataTable.Cell>{item.unit}</DataTable.Cell>
                                <DataTable.Cell>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell>{item.price}</DataTable.Cell>
                                {/* <DataTable.Cell numeric>
                                    {Platform.OS=='android' ?
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>Details</Button>
                                        :
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}}><Link to={"/edititem/"+item._id}>Details</Link></Button>
                                    }
                                </DataTable.Cell> */}
                            </DataTable.Row>
                        )
                        }
                    })
                    :
                    null
                    }
                </DataTable>
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    view: {
        ...Platform.select({
            ios: {
                
            },
            android: {
            },
            default: {
                
            }
        })
    },
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