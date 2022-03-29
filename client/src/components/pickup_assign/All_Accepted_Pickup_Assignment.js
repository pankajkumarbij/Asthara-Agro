import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye,faSort } from '@fortawesome/free-solid-svg-icons';
import { all_accepted_pickup_assignment } from '../../services/pickup_api';
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

export default function All_Accepted_Pickup_Assignment(props,{ navigation }) {

    const [allPickupAssignment, setAllPickupAssignment] = useState();
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

        all_accepted_pickup_assignment()
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

    }, [role, userId]);

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
    
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
               <Title style={styles.title}>All Accepted Pickup Assignment</Title>
               <Searchbar
                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />

                <DataTable.Header>
                    <DataTable.Title onPress={()=>sorting("order_date")}><FontAwesomeIcon icon={ faSort } />Order ID</DataTable.Title>
                    {Platform.Os!='android'?
                     <DataTable.Title onPress={()=>sorting("custom_vendorId")}><FontAwesomeIcon icon={ faSort } />Vendor ID</DataTable.Title>
                     :null
                     }
                    <DataTable.Title ><FontAwesomeIcon icon={ faSort } />Item</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>

                {(role && userId && role=="manager" && allPickupAssignment) ?
                    allPickupAssignment.map((pickupAssignment,index)=>{
                        if(pickupAssignment.managerPoolId==managerPoolId)
                        if(pickupAssignment._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{pickupAssignment.custom_orderId}</DataTable.Cell>
                                {Platform.Os!='android'?
                                    <DataTable.Cell>{pickupAssignment.custom_vendorId}</DataTable.Cell>
                                    :null
                                }
                                <DataTable.Cell>{pickupAssignment.items.itemName+" (Grade: "+pickupAssignment.items.Grade+", Qty: "+pickupAssignment.items.quantity+")"}</DataTable.Cell>
                                <DataTable.Cell>
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment2', {purchaseId: pickupAssignment._id})}}>Check</Button>
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
                                {/* <DataTable.Cell>{pickupAssignment.custom_vendorId}</DataTable.Cell> */}
                                <DataTable.Cell>{pickupAssignment.items.itemName+" (Grade: "+pickupAssignment.items.Grade+", Qty: "+pickupAssignment.items.quantity+")"}</DataTable.Cell>
                                <DataTable.Cell>
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Pickup_Assignment2', {purchaseId: pickupAssignment._id})}}>Check</Button>
                                        :
                                        <Link to={"/Edit_Pickup_Assignment2/"+pickupAssignment._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
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