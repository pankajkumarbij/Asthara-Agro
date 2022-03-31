import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faSort } from '@fortawesome/free-solid-svg-icons';
import { Order_by_status } from '../../services/order_api';
import { roleas, loginuserId } from '../../utils/user';
import { manager_pool_by_id } from '../../services/pool';
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

export default function ApprovedOrders(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [visible, setVisible] = useState([]);
    const [flag, setFlag] = useState(false);
    const [managerPoolId, setManagerPoolId] = useState('');
    const [managerPinCodes, setManagerPinCodes] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');
    const [flag2, setFlag2] = useState(true);

    useEffect(() => {

        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        if(managerPoolId){
            manager_pool_by_id(managerPoolId)
            .then(result=>{
                setManagerPinCodes(result[0].postal_code);
            })
        }

        if(flag2){
            Order_by_status("approved")
            .then(result=> {
                setAllOrders(result);
                setFlag2(false);
            })
        }

        if(flag && allOrders.length > 0){
            for(let i = 0; i < allOrders.length; i++){
                const values = [...visible];
                values[i]=true;
                setVisible(values);
            }
            setFlag(true);
        }

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    }, [allOrders,  visible, flag, managerPinCodes, managerPoolId, role, userId, flag2]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allOrders].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllOrders(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allOrders].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllOrders(sorted);
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
                <Title style={styles.title} >Approved Orders</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("order_date")}><FontAwesomeIcon icon={ faSort } /> Order ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("name")}><FontAwesomeIcon icon={ faSort } /> Customer Name</DataTable.Title>
                        {role== "manager" ?
                            <DataTable.Title>Incentive</DataTable.Title>
                            :
                            null
                        }
                        <DataTable.Title onPress={()=>sorting("status")}><FontAwesomeIcon icon={ faSort } /> Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {(role && userId && role=="manager" && allOrders) ?
                        allOrders.map((item, index)=>{
                            if(managerPinCodes.includes(String(item.postal_code)))
                            if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                var date=item.order_date.substring(0,10);
                                var d=new Date(item.order_date);
                                d.toTimeString();
                                d=String(d);
                                var hour=d.substring(16,18);
                                var custom_orderId=item.nick_name+"_"+item.postal_code+"_"+date+"_"+hour;
                                var incentive=0.0;
                                item.items.map((it, index)=>{
                                    incentive+=(parseInt(it.itemNegotiatePrice)-it.targetPrice)*it.quantity*0.1;
                                })
                                console.log(incentive.toFixed(2));
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        <DataTable.Cell>{incentive.toFixed(2)}</DataTable.Cell>
                                        <DataTable.Cell>{item.status}</DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Check</Button>
                                                :
                                                <Link to={"/vieworder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                        :null
                    }
                    {(role && userId && role=="sales" && allOrders) ?
                        allOrders.map((item, index)=>{
                            if(item.userId==userId)
                            if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                var date=item.order_date.substring(0,10);
                                var d=new Date(item.order_date);
                                d.toTimeString();
                                d=String(d);
                                var hour=d.substring(16,18);
                                var custom_orderId=item.nick_name+"_"+item.postal_code+"_"+date+"_"+hour;
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                                :
                                                <Link to={"/vieworder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                        :null
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