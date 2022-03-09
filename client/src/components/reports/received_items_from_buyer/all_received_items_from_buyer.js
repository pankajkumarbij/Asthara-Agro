import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator, Text  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, TextInput  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faCamera } from '@fortawesome/free-solid-svg-icons';
import { recieved_from_buyer } from '../../../services/report/recieved_from_buyer_api';
import { roleas, loginuserId } from '../../../utils/user';
import { users_by_id } from '../../../services/user_api';
import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import { all_completed_purchase_orders } from '../../../services/pickup_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Received_Orders_From_Buyer(props,{ navigation }) {

    const [allReceivedItems, setAllReceivedItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [managerPoolId, setManagerPoolId] = useState('');
    const [visible3, setVisible3] = useState(false);
    const [ data, setData ] = useState('Not Found');
    const [flag, setFlag] = useState(false);
    const [msg, setMsg] = useState("");
    const [addedItems, setAddedItems] = useState([]);
    const [acpo, setACPO] = useState();
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {

        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_completed_purchase_orders()  
        .then(result => {
            setACPO(result);
        })

        recieved_from_buyer()  
        .then(result => {
            setAllReceivedItems(result);
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    }, [allReceivedItems, acpo, userId, role]);

    const ItemChange = () => {

        var val=acpo.find(o => o.barcode === data);
        if(val==undefined){
            setMsg("Error!! Item not found");
        }
        else{
            if(addedItems.includes(data)){
                setMsg("Error!! Item is already scanned");
            }
            else{
                const values1 = [...addedItems];
                values1.push(data);
                setAddedItems(values1); 

                var beepsound = new Audio('./beep-02.mp3');   
                beepsound.play();

                fetch(`http://localhost:5000/create_rfb`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        vehicle_number: val.vehicle_number,
                        driver_name: val.driver_name,
                        labour_name: val.labour_name,
                        driver_mobile_no: val.driver_mobile_no,
                        labour_mobile_no: val.labour_mobile_no,
                        purchase_order: val.purchase_order,
                        barcode: val.barcode,
                    })
                }).then(res => res.json())
                .catch(error => console.log(error))
                .then(data => {
                    // console.log(data);
                    // alert(data.message);
                    // console.log(data);
                });
                fetch(`http://localhost:5000/update_order_item_status/${val.purchase_order.custom_orderId}/${val.purchase_order.items.itemName}/${val.purchase_order.items.Grade}/${val.purchase_order.items.quantity}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        status:"Reached at Sales Hub",
                    })
                }).then(res => res.json())
                .catch(error => console.log(error))
                .then(data => {
                    //  alert(data.message);
                });
                setMsg("Success!! Added");
            }
        }
        setData("Not Found");
    };

    if(flag==false && data!="Not Found"){
        ItemChange();
    }
    
    const showModal = () => setVisible3(true);
    const hideModal = () => setVisible3(false);

    function scan() {
        showModal();
    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Received Orders From Buyer</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />

                    <DataTable.Header>
                        <DataTable.Title >Order ID</DataTable.Title>
                        <DataTable.Title >Vehicle Number</DataTable.Title>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>

                    {(role && userId && role=="manager" && allReceivedItems) &&
                        allReceivedItems.map((item)=>{
                            if(item.purchase_order.managerPoolId==managerPoolId)
                            if(item._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{item.purchase_order.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell>{item.purchase_order.items.itemName+" ("+item.purchase_order.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm_Buyer', {pickupConfirmId: item._id})}}>Details</Button>
                                            :
                                            <Link to={"/editreceivedorder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ) 
                            }
                        })
                    }
                    {(role && userId && role=="buyer" && allReceivedItems) &&
                        allReceivedItems.map((item)=>{
                            if(item.purchase_order.buyer_id==userId)
                            if(item._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{item.purchase_order.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell>{item.purchase_order.items.itemName+" ("+item.purchase_order.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm_Buyer', {pickupConfirmId: item._id})}}>Details</Button>
                                            :
                                            <Link to={"/editreceivedorder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ) 
                            }
                        })
                    }
                    {(role && userId && (role=="sales") && allReceivedItems) &&
                        allReceivedItems.map((item)=>{
                            if(item.purchase_order.sales_id==userId)
                            if(item._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{item.purchase_order.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell>{item.purchase_order.items.itemName+" ("+item.purchase_order.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Pickup_Assignment_Confirm_Buyer', {pickupConfirmId: item._id})}}>Details</Button>
                                            :
                                            <Link to={"/editreceivedorder/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            ) 
                            }
                        })
                    }
                    {(role && userId && role=="sales" && visible3) &&
                        <>
                            <BarcodeScannerComponent
                                width="50%"
                                onUpdate={(err, result) => {
                                    if (result) setData(result.text)
                                }}
                            />
                            <Text>{msg}</Text>
                            {!flag ?
                                <Button onPress={()=>setFlag(true)}>Manually Add</Button>
                                :
                                <Button onPress={()=>setFlag(false)}>Start Scan</Button>
                            }
                            {flag &&
                                <View style={{padding: '5px', display: 'flex'}}>
                                    <TextInput style={styles.input} mode="outlined" label="Data" value={data} onChangeText={data => setData(data)} />
                                    <Button onPress={()=>ItemChange()}>Add</Button>
                                </View>
                            }
                        </>
                    }
                    {role && userId && role=="sales" && !visible3 &&
                        <Button mode="contained" style={styles.button} onPress={() => scan()} icon={() => <FontAwesomeIcon icon={ faCamera } />}>Start Scan</Button>
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