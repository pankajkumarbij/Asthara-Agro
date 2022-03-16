import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_pending_pickup_assignment_confirmed } from '../../services/pickup_api';
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

export default function All_Pending_Pickup_Assignment_Confirm_Vendor(props,{ navigation }) {

    const [allPickupAssignmentConfirm, setAllPickupAssignment] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState([])
    const [managerPoolId, setManagerPoolId] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    
    useEffect(() => {

        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_pending_pickup_assignment_confirmed()
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

    }, [allPickupAssignmentConfirm, role, userId]);

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
        fetch(`http://${host}:5000/update_pickup_assign_confirm_vendor_status/${id}`, {
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
        });
        closeMenu(index);
    };    

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title}>All Pending Pickup Assignment Confirm Vendor</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Order ID</DataTable.Title>
                        {/* <DataTable.Title>Vendor ID</DataTable.Title> */}
                        <DataTable.Title>Item</DataTable.Title>
                        {/* <DataTable.Title>Status</DataTable.Title> */}
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                                                                        
                    {(role && userId && role=="manager" && allPickupAssignmentConfirm) ?
                        allPickupAssignmentConfirm.map((pickupAssignmentConfirm,index)=>{
                            if(pickupAssignmentConfirm.managerPoolId==managerPoolId)
                            if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{pickupAssignmentConfirm.custom_orderId}</DataTable.Cell>
                                    {/* <DataTable.Cell>{pickupAssignmentConfirm.custom_vendorId}</DataTable.Cell> */}
                                    <DataTable.Cell>{pickupAssignmentConfirm.items.itemName+" ("+pickupAssignmentConfirm.items.Grade+")"}</DataTable.Cell>
                                    {/* <DataTable.Cell>
                                    <Text >{pickupAssignmentConfirm.status}</Text>
                                    </DataTable.Cell>     */}
                                    <DataTable.Cell numeric> 
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Check</Button>
                                            :
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/View_Pickup_Assignment_Confirm/"+pickupAssignmentConfirm._id}>Details</Link></Button>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            }
                        }): null
                    }
                    {(role && userId && role=="vendor" && allPickupAssignmentConfirm) ?
                        allPickupAssignmentConfirm.map((pickupAssignmentConfirm,index)=>{
                            if(pickupAssignmentConfirm.vendor_id==userId)
                            if(pickupAssignmentConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{pickupAssignmentConfirm.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell>{pickupAssignmentConfirm.custom_vendorId}</DataTable.Cell>
                                    <DataTable.Cell>{pickupAssignmentConfirm.items.itemName+" ("+pickupAssignmentConfirm.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>
                                    <Menu visible={visible[index]} onDismiss={()=>closeMenu(index)} anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{pickupAssignmentConfirm.status}</Button>}>
                                        <Menu.Item title="Accept" onPress={()=>StatusChange("vendor accepted",  pickupAssignmentConfirm._id, index)}/>
                                        <Menu.Item title="Reject" onPress={()=>StatusChange("decline",  pickupAssignmentConfirm._id, index)}/>
                                    </Menu>
                                    </DataTable.Cell>    
                                    <DataTable.Cell numeric> 
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm', {pickupConfirmId: pickupAssignmentConfirm._id})}}>Check</Button>
                                            :
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/View_Pickup_Assignment_Confirm/"+pickupAssignmentConfirm._id}>Details</Link></Button>
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