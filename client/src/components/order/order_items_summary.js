import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { OrderSummary } from '../../services/order_api';
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

export default function OrderItemsSummary(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
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
        
        OrderSummary()
        .then(result=> {
            setAllOrders(result);
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    }, [allOrders, role, userId]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>Order Items Summary</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />
                    <DataTable.Header>
                        <DataTable.Title>Order ID</DataTable.Title>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                    {role && userId && allOrders ?
                        allOrders.map((order) => { 
                            if(order.item.quantity>0){ 
                                if(order.managerPoolId==managerPoolId)
                                if(order.item.itemName.toUpperCase().search(searchQuery.toUpperCase())!=-1 || order.item._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                    return(
                                        <DataTable.Row>
                                            <DataTable.Cell >{order.custom_orderId}</DataTable.Cell>
                                            <DataTable.Cell >{order.item.itemName} ({order.item.Grade})</DataTable.Cell>
                                            <DataTable.Cell >{order.status}</DataTable.Cell>
                                            <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrderItem', {itemId: order.item.itemId,orderId:order._id})}}>Details</Button>
                                                :
                                                <Link to={"/editorderitem/"+order._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                            }
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                    )
                                }
                            }
                        })
                        :
                        <ActivityIndicator color="#794BC4" size={60}/>
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