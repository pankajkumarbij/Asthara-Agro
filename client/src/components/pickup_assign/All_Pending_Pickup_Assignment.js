import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator, Text  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye,faSort } from '@fortawesome/free-solid-svg-icons';
import { all_pending_pickup_assignment } from '../../services/pickup_api';
import {host} from '../../utils/host';
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

export default function All_Pending_Pickup_Assignment(props,{ navigation }) {

    const [allPickupAssignment, setAllPickupAssignment] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState([]);
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
        
        all_pending_pickup_assignment()
        .then(result => {
            setAllPickupAssignment(result);
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    }, [ role, userId]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allPickupAssignment].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllPickupAssignment(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allPickupAssignment].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllPickupAssignment(sorted);
            setSortingOrder('ASC');
        }
    }

    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    };

    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };

    const StatusChange = (s, id, index) => {

        fetch(`http://${host}:5000/update_order_item_status/${allPickupAssignment[index].custom_orderId}/${allPickupAssignment[index].items.itemName}/${allPickupAssignment[index].items.Grade}/${allPickupAssignment[index].items.quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status:"Out for Pickup",
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            //  alert(data.message);
        });

        fetch(`http://${host}:5000/update_pickup_assign_status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });
        closeMenu(index);
    };    

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
             <DataTable style={styles.datatable}>
               <Title style={styles.title}>All Pending Pickup Assignment</Title>
               <Searchbar
                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                <DataTable.Header>
                    <DataTable.Title onPress={()=>sorting("order_date")}><FontAwesomeIcon icon={ faSort } />Order ID</DataTable.Title>
                    {Platform.OS!=="android" ?
                        <DataTable.Title onPress={()=>sorting("custom_vendorId")}><FontAwesomeIcon icon={ faSort } />Vendor ID</DataTable.Title>
                        :
                        null
                    }
                    {Platform.OS!=="android" ?
                        <DataTable.Title><FontAwesomeIcon icon={ faSort } />Item</DataTable.Title>
                        :
                            null
                    } 
                    <DataTable.Title numericonPress={()=>sorting("status")}><FontAwesomeIcon icon={ faSort } />Status</DataTable.Title>
                    <DataTable.Title numeric>Action</DataTable.Title>
                </DataTable.Header>
                                                                    
                {(role && userId && role=="manager" && allPickupAssignment) ?
                    allPickupAssignment.map((pickupAssignment,index)=>{
                        if(pickupAssignment.managerPoolId==managerPoolId)
                        if(pickupAssignment._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{pickupAssignment.custom_orderId}</DataTable.Cell>
                                    {Platform.OS!=='android'?
                                        <DataTable.Cell>{pickupAssignment.custom_vendorId}</DataTable.Cell>
                                    :null}
                                    {Platform.OS!=='android'?
                                        <DataTable.Cell>{pickupAssignment.items.itemName+" (Grade: "+pickupAssignment.items.Grade+", Qty: "+pickupAssignment.items.quantity+")"}</DataTable.Cell>  
                                    :null} 
                                    <DataTable.Cell  numeric> <Text>{pickupAssignment.status}</Text></DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Pickup_Assignment2', {purchaseId: pickupAssignment._id})}}>Check</Button>
                                            :
                                            <Link to={"/View_Pickup_Assignment2/"+pickupAssignment._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        }
                    }): null
                }
                {(role && userId && role=="buyer" && allPickupAssignment) ?
                    allPickupAssignment.map((pickupAssignment,index)=>{
                        if(pickupAssignment.buyer_id==userId)
                        if(pickupAssignment._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{pickupAssignment.custom_orderId}</DataTable.Cell>
                                    {Platform.OS!=="Android" ?
                                        <DataTable.Cell>{pickupAssignment.custom_vendorId}</DataTable.Cell>
                                        :
                                        null
                                    }
                                    <DataTable.Cell>{pickupAssignment.items.itemName+" (Grade: "+pickupAssignment.items.Grade+", Qty: "+pickupAssignment.items.quantity+")"}</DataTable.Cell>
                                    {Platform.OS!=="Android" ?
                                        <DataTable.Cell  numeric>
                                            <Menu  visible={visible[index]} onDismiss={()=>closeMenu(index)} anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{pickupAssignment.status}</Button>}>
                                                <Menu.Item title="Accept" onPress={()=>StatusChange("accepted",  pickupAssignment._id, index)}/>
                                                <Menu.Item title="Decline" onPress={()=>StatusChange("decline",  pickupAssignment._id, index)}/>
                                            </Menu>
                                        </DataTable.Cell>   
                                        :
                                        null
                                    }
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Pickup_Assignment2', {purchaseId: pickupAssignment._id})}}>Check</Button>
                                            :
                                            <Link to={"/View_Pickup_Assignment2/"+pickupAssignment._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
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