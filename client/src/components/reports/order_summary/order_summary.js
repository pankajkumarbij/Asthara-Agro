import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, CheckBox, Text } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faPrint } from '@fortawesome/free-solid-svg-icons';
import { allOrder } from '../../../services/order_api';
import { customer_manager_pool_by_manager_pool_id, manager_pool_by_id } from '../../../services/pool';
import { users_by_id } from '../../../services/user_api';
import { roleas, loginuserId } from '../../../utils/user';

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

export default function OrderSummary(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [managerPoolId, setManagerPoolId] = useState('');
    const [managerPinCodes, setManagerPinCodes] = useState('');
    const [isPending, setIsPending] = useState(true);
    const [isRejected, setIsRejected] = useState(true);
    const [isDelivered, setIsDelivered] = useState(true);
    const [startDate, setStartDate] = useState("2021-01-01");
    const [endDate, setEndDate] = useState(adate);
    const [customerPools, setCustomerPools] = useState();
    const [isPool, setIsPool] = useState([]);
    const [flag, setFlag] = useState(true);
    const [customerPoolId, setCustomerPoolId] = useState([]);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

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

        if(managerPoolId){
            customer_manager_pool_by_manager_pool_id(managerPoolId)
            .then(result=>{
                setCustomerPools(result);
            })
        }

        if(flag && customerPools){
            const values = [...isPool];
            const values1 = [...customerPoolId];
            for(let i=0; i<customerPools.length; i++) {
                values.push(true);
                values1.push(customerPools[i].customer_pool_Id);   
            }
            setIsPool(values);
            setCustomerPoolId(values1);
            setFlag(false);
        }

        allOrder()
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

    }, [managerPoolId, customerPools, isPool, flag, customerPoolId, role, userId]);

    function printPageArea(){
        var printContent = document.getElementById("print").innerHTML;
        var WinPrint = window.open('', '', 'width=900,height=650');
        WinPrint.document.write(printContent);
        WinPrint.document.close();
        WinPrint.focus();
        WinPrint.print();
    }

    function changePoolCheck(index){
        const values = [...isPool];
        values[index]=!values[index];
        setIsPool(values);

        // const values = [...isPool];
        // values[index]=!values[index];
        // setIsPool(values);
    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <View style={{flexDirection: 'row', marginBottom: '20px', justifyContent: 'space-between'}}>
                        <Title>Order Summary</Title>
                        <Button mode="outlined" onPress={()=>printPageArea()} icon={() => <FontAwesomeIcon icon={ faPrint } />}>Print</Button>
                    </View>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />
                    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: 'gray', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline'}}>Status</Text>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={isPending}
                                    onValueChange={setIsPending}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Pending</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={isRejected}
                                    onValueChange={setIsRejected}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Rejected</Text>
                            </View>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={isDelivered}
                                    onValueChange={setIsDelivered}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Delivered</Text>
                            </View>
                        </View>
                        {role && userId && role=="manager"  && 
                        <View>
                            <Text style={{color: 'gray', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline'}}>Customer Pool</Text>
                            <ScrollView style={{height: '50px'}}>
                            {isPool && customerPools &&
                                customerPools.map((item, index)=>{
                                    return(
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={isPool[index]}
                                                onValueChange={()=>changePoolCheck(index)}
                                                style={styles.checkbox}
                                            />
                                            <Text style={styles.label}>{item.customer_pool_name}</Text>
                                        </View>
                                    )
                                })
                            }
                            </ScrollView>
                        </View>
                        }
                        <View>
                            <Text style={{color: 'gray', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline'}}>Date Range</Text>
                            <View>
                                <Text style={styles.label}>Start Date:</Text>
                                <input type="date" onChange={(e) => setStartDate(e.target.value)}/>
                            </View>
                            <View>
                                <Text style={styles.label}>End Date:</Text>
                                <input type="date" onChange={(e) => setEndDate(e.target.value)}/>
                            </View>
                        </View>
                    </View>
                    <DataTable.Header style={{marginTop: 10,}}>
                        <DataTable.Title>Order ID</DataTable.Title>
                        <DataTable.Title>Customer Name</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                    {(role && userId && role=="manager" && allOrders && managerPinCodes && customerPoolId) &&
                        allOrders.map((item, index)=>{
                            if(managerPinCodes.includes(String(item.postal_code)))
                            if(customerPoolId.includes(String(item.customerPoolId)))
                            if((isPending && (item.status=="pending" || item.status=="approved")) || (isRejected && item.status=="rejected") || (isDelivered && item.status=="delivered"))
                            if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                var date=item.order_date.substring(0,10);
                                var d=new Date(item.order_date);
                                d.toTimeString();
                                d=String(d);
                                var hour=d.substring(16,18);
                                var custom_orderId=item.nick_name+"_"+item.postal_code+"_"+date+"_"+hour;

                                if(date>=startDate && date<=endDate)
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        {(item.status=="pending" || item.status=="approved") &&
                                            <DataTable.Cell>pending</DataTable.Cell>
                                        }
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                                :
                                                <Link to={"/viewordersummary/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                    }
                    {(role && userId && role=="sales" && allOrders) &&
                        allOrders.map((item, index)=>{
                            if(item.userId==userId)
                            if((isPending && (item.status=="pending" || item.status=="approved")) || (isRejected && item.status=="rejected") || (isDelivered && item.status=="delivered"))
                            if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                var date=item.order_date.substring(0,10);
                                var d=new Date(item.order_date);
                                d.toTimeString();
                                d=String(d);
                                var hour=d.substring(16,18);
                                var custom_orderId=item.nick_name+"_"+item.postal_code+"_"+date+"_"+hour;

                                if(date>=startDate && date<=endDate)
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell>{item.name}</DataTable.Cell>
                                        {(item.status=="pending" || item.status=="approved") &&
                                            <DataTable.Cell>pending</DataTable.Cell>
                                        }
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                                :
                                                <Link to={"/viewordersummary/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }
                        })
                    }
                </DataTable>
                {Platform.OS=='android' ?
                    <Text>ok</Text>
                    :
                    <div id="print" style={{visibility: 'hidden'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <div style={{display: 'flex'}}>
                                <img src="../../../images/Asthara-Logo.png" width="50" /> &nbsp;&nbsp;
                                <h3>Asthara Agro</h3>
                            </div>
                            <div>
                                <h3>Order Summary</h3>
                            </div>
                        </div>
                        <hr/>
                        <div style={{display: 'flex', justifyContent: 'space-around'}}>
                            <h6>Start Date: {startDate}</h6>
                            <h6>End Date: {endDate}</h6>
                            <h6>Status: {isPending && "Pending, "}{isRejected && "Rejected, "}{isDelivered && "Delivered, "}</h6>
                        </div>
                        <center>
                            <div style={{width: '80%'}}>
                                <table style={{border: '1px solid black', width: '100%'}}>
                                    <tr style={{border: '1px solid black'}}>
                                        <th>Order ID</th>
                                        <th>Customer Name</th>
                                        <th>Status</th>
                                    </tr>
                                    {(role=="manager"  && allOrders && managerPinCodes) &&
                                    allOrders.map((item, index)=>{
                                        if(managerPinCodes.includes(String(item.postal_code)))
                                        if((isPending && (item.status=="pending" || item.status=="approved")) || (isRejected && item.status=="rejected") || (isDelivered && item.status=="delivered"))
                                        if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.status.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                            var date=item.order_date.substring(0,10);
                                            var d=new Date(item.order_date);
                                            d.toTimeString();
                                            d=String(d);
                                            var hour=d.substring(16,18);
                                            var custom_orderId=item.nick_name+"_"+item.postal_code+"_"+date+"_"+hour;

                                            if(date>=startDate && date<=endDate)
                                            return (
                                                <tr style={{border: '1px solid gray'}}>
                                                    <td style={{border: '1px solid gray', padding: '5px'}}>{custom_orderId}</td>
                                                    <td style={{border: '1px solid gray', padding: '5px'}}>{item.name}</td>
                                                    <td style={{border: '1px solid gray', padding: '5px'}}>{item.status}</td>
                                                </tr>
                                            )
                                        }
                                    })}
                                </table>
                            </div>
                        </center>
                    </div>
                }
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
}); 