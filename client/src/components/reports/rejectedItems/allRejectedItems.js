import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { Provider, DefaultTheme, Title, DataTable, Searchbar } from 'react-native-paper';
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faSort } from '@fortawesome/free-solid-svg-icons';
// import { customer_manager_pool_by_manager_pool_id, manager_pool_by_id } from '../../../services/pool';
// import { users_by_id } from '../../../services/user_api';
// import { roleas, loginuserId } from '../../../utils/user';
import { Rejected_Items } from '../../../services/report/rejected_items';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

let newDate = new Date()
let date1 = newDate.getDate();
let month1 = newDate.getMonth() + 1;
let year1 = newDate.getFullYear();
let adate = year1+"-"+month1+"-"+date1;

export default function AllRejectedItems(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allItems, setAllItems] = useState();
    // const [managerPoolId, setManagerPoolId] = useState('');
    // const [managerPinCodes, setManagerPinCodes] = useState('');
    const [startDate, setStartDate] = useState("2021-01-01");
    const [endDate, setEndDate] = useState(adate);
    // const [customerPools, setCustomerPools] = useState();
    // const [isPool, setIsPool] = useState([]);
    // const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);
    // const [customerPoolId, setCustomerPoolId] = useState([]);
    // const [role, setRole] = useState('');
    // const [userId, setUserId] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');

    useEffect(() => {
        
        // if(role && role=='manager' && userId){
        //     users_by_id(userId)
        //     .then(result=>{
        //         setManagerPoolId(result[0].pool_id);
        //     })
        // }

        // if(managerPoolId){
        //     manager_pool_by_id(managerPoolId)
        //     .then(result=>{
        //         setManagerPinCodes(result[0].postal_code);
        //     })
        // }

        // if(managerPoolId){
        //     customer_manager_pool_by_manager_pool_id(managerPoolId)
        //     .then(result=>{
        //         setCustomerPools(result);
        //     })
        // }

        // if(flag && customerPools){
        //     const values = [...isPool];
        //     const values1 = [...customerPoolId];
        //     for(let i=0; i<customerPools.length; i++) {
        //         values.push(true);
        //         values1.push(customerPools[i].customer_pool_Id);   
        //     }
        //     setIsPool(values);
        //     setCustomerPoolId(values1);
        //     setFlag(false);
        // }

        if(flag2){
            Rejected_Items()
            .then(result=> {
                setAllItems(result);
                setFlag2(false);
            })
        }

        // roleas()  
        // .then(result => {
        //     setRole(result);
        // })

        // loginuserId()  
        // .then(result => {
        //     setUserId(result);
        // })

    }, [ flag2]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allItems].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllItems(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allItems].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllItems(sorted);
            setSortingOrder('ASC');
        }
    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Title>All Order Deliveries</Title>
                    </View>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    {Platform.OS === 'android' ?
                        null 
                        :
                        <View>
                            <Text style={{color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline'}}>Date Range</Text>
                            <View>
                                <Text style={styles.label}>Start Date:</Text>
                                <input type="date" onChange={(e) => setStartDate(e.target.value)}/>
                            </View>
                            <View>
                                <Text style={styles.label}>End Date:</Text>
                                <input type="date" onChange={(e) => setEndDate(e.target.value)}/>
                            </View>
                            {endDate<startDate?
                            <Text style={styles.error}>End Date should be greater than start date</Text>
                            :
                            null
                            }
                        </View>
                    }
                    <DataTable.Header style={{marginTop: 10,}}>
                        <DataTable.Title onPress={()=>sorting("custom_orderId")}><FontAwesomeIcon icon={ faSort } /> Order ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("item_name")}><FontAwesomeIcon icon={ faSort } /> Item Name</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("unit")}><FontAwesomeIcon icon={ faSort } /> Unit</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("quantity")}><FontAwesomeIcon icon={ faSort } /> Rejected Qty</DataTable.Title>
                    </DataTable.Header>
                    {/* {(role && userId && role=="manager" && allItems && managerPinCodes) &&
                        allItems.map((item, index)=>{
                            if(managerPinCodes.includes(String(item.order[0].postal_code)))
                            if(item.order[0].email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.order[0].name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.order[0].status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                var date=item.order[0].order_date.substring(0,10);
                                var d=new Date(item.order[0].order_date);
                                d.toTimeString();
                                d=String(d);
                                var hour=d.substring(16,18);
                                var custom_orderId=item.order[0].nick_name+"_"+item.order[0].postal_code+"_"+date+"_"+hour;

                                if(date>=startDate && date<=endDate)
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{item.order[0].name}</DataTable.Cell>
                                        <DataTable.Cell>{item.status}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                    }
                    {(role && userId && role=="sales" && allItems) &&
                        allItems.map((item, index)=>{
                            if(item.order[0].userId==userId)
                            if(item.order[0].email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.order[0].name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.order[0].status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                var date=item.order[0].order_date.substring(0,10);
                                var d=new Date(item.order[0].order_date);
                                d.toTimeString();
                                d=String(d);
                                var hour=d.substring(16,18);
                                var custom_orderId=item.order[0].nick_name+"_"+item.order[0].postal_code+"_"+date+"_"+hour;

                                if(date>=startDate && date<=endDate)
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{item.order[0].name}</DataTable.Cell>
                                        <DataTable.Cell>{item.status}</DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                    } */}
                    {allItems && allItems.map(it => {
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{it.custom_orderId}</DataTable.Cell>
                                <DataTable.Cell>{it.item_name}</DataTable.Cell>
                                <DataTable.Cell>{it.unit}</DataTable.Cell>
                                <DataTable.Cell>{it.quantity}</DataTable.Cell>
                            </DataTable.Row>
                        )
                    })}
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
    checkboxContainer: {
        flexDirection: "row",
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    error: {
        color: 'red',
    }
}); 