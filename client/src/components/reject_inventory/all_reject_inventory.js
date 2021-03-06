import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView, Image } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faSort } from '@fortawesome/free-solid-svg-icons';
import { all_reject_inventory } from '../../services/reject_inventory';
import { users_by_id } from '../../services/user_api';
import {roleas, loginuserId} from '../../utils/user';
import { manager_pool_by_id } from '../../services/pool';

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
export default function AllRejectInventory({navigation }) {
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');
    const [managerPoolId, setManagerPoolId] = useState('');
    const[role,setRole] = useState("");
    const [userId,setUserId] = useState("");
    const [managerPoolPin, setManagerPoolPin] = useState();

    useEffect(() => {
        //Retrieve all items
        all_reject_inventory()
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

        if(role && (role=='manager' || role=='buyer') && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        if(role=='manager' && managerPoolId){
            manager_pool_by_id(managerPoolId)
            .then(result=>{
                setManagerPoolPin(result[0].postal_code);
            })
        }

    }, [role, userId, managerPoolId]); 

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

    function scrap(item){
        fetch(`http://localhost:5000/create_scrap_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order:item,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // console.log(data);
            alert(data.message);
        });

        fetch(`http://localhost:5000/delete_reject_inventory_by_id/${item._id}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });
    }

    function mandi(item){
        fetch(`http://localhost:5000/create_mandi_inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order:item,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // console.log(data);
            alert(data.message);
        });

        fetch(`http://localhost:5000/delete_reject_inventory_by_id/${item._id}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });

    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title} >Reject Inventory</Title>
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
                        {role=="manager" &&
                            <>
                                <DataTable.Title numeric>Scrap</DataTable.Title>
                                <DataTable.Title numeric>Mandi</DataTable.Title>
                            </>
                        }
                    </DataTable.Header>

                    {(role && userId && role=="manager" && allItems && managerPoolPin) ?
                    allItems.map((item)=>{
                        if((item.order.managerPoolId && managerPoolId==item.order.managerPool) || (item.order[0] && managerPoolPin.includes(String(item.order[0].postal_code))))
                        if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{item.custom_orderId}</DataTable.Cell>
                                <DataTable.Cell>{item.item_name+" ("+item.grade+")"}</DataTable.Cell>
                                <DataTable.Cell>{item.unit}</DataTable.Cell>
                                <DataTable.Cell>{item.quantity}</DataTable.Cell>
                                <DataTable.Cell>{item.price}</DataTable.Cell>
                                {role=="manager" &&
                                <>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>Scrap</Button>
                                            :
                                            <Button mode="contained" style={{width: '100%'}} onPress={()=>scrap(item)}>Scrap</Button>
                                        }
                                    </DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>Mandi</Button>
                                            :
                                            <Button mode="contained" style={{width: '100%'}} onPress={()=>mandi(item)}>Mandi</Button>
                                        }
                                    </DataTable.Cell>
                                </>
                                }
                            </DataTable.Row>
                        )
                        }
                    })
                    :
                    null
                    }

                    {(role && userId && role=="buyer" && allItems && managerPoolId) ?
                    allItems.map((item)=>{
                        if((item.order.buyer_id && userId==item.order.buyer_id) || (item.order[0] && managerPoolId==item.order[0].vendorPoolId))
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