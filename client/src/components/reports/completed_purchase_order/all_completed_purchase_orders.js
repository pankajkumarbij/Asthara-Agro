import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Portal, Modal  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye, faSort } from '@fortawesome/free-solid-svg-icons';
import { all_completed_purchase_orders } from '../../../services/pickup_api';
import {roleas, loginuserId} from '../../../utils/user';
import { users_by_id } from '../../../services/user_api';
import { all_serial_number } from '../../../services/serialnumber';
// import BarCode from '../../barcode/barcode';
import {url} from '../../../utils/url';
import QRCode from "react-qr-code";
// import QRCodes from 'react-native-qrcode-svg';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Completed_Purchase_Orders(props,{ navigation }) {

    const [allPickupAssignmentConfirm, setAllPickupAssignment] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [managerPoolId, setManagerPoolId] = useState('');
    const [visible, setVisible] = useState(false);
    const [barcode, setBarcode] = useState("");
    const[role,setRole] = useState("");
    const [userId,setUserId] = useState("");
    const [sorting_order, setSortingOrder] = useState('ASC');
    const [serial_number, setSerialNumber] = useState("000001");
    const [snid, setSnid] = useState("");

    useEffect(() => {

        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }
        
        roleas()
        .then(result=>{
           setRole(result);   
        })

        loginuserId()
        .then(result=>{
           setUserId(result);   
        })

        all_completed_purchase_orders()  
        .then(result => {
            setAllPickupAssignment(result);
        })

        all_serial_number()
        .then(result => {
            setSerialNumber(result[0].sn);
            setSnid(result[0]._id);
        })

    }, [role,userId,serial_number]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allPickupAssignmentConfirm].sort((a,b)=>
            a.purchase_order[col].toLowerCase()>b.purchase_order[col].toLowerCase() ?1:-1));
            setAllPickupAssignment(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allPickupAssignmentConfirm].sort((a,b)=>
            a.purchase_order[col].toLowerCase()<b.purchase_order[col].toLowerCase() ?1:-1));
            setAllPickupAssignment(sorted);
            setSortingOrder('ASC');
        }
    }

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    function BarCodeGen(data, id){
        setBarcode(data);
        fetch(`${url}/update_barcode_completed_purchase_order/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                barcode: data,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            //console.log(data);
        });

        fetch(`${url}/update_sn/${snid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sn: parseInt(serial_number)+1,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
            //console.log(data);
            setSerialNumber(parseInt(serial_number)+1);
        });
        showModal();
    }

    const onChangeSearch = query => setSearchQuery(query);

    const containerStyle = {backgroundColor: 'white', alignSelf: 'center', padding: '20px'};

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <>
                            {/* <BarCode barcode={barcode} /> */}
                            {Platform.OS=='android' ?
                                // <QRCodes value={barcode} />
                                <Text>QR</Text>
                            :
                                <QRCode value={barcode} />
                            }
                            <Text>{barcode}</Text>
                        </>
                    </Modal>
                </Portal>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title}>All Completed Purchase Orders</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("custom_orderId")}><FontAwesomeIcon icon={ faSort } /> Order ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("custom_vendorId")}><FontAwesomeIcon icon={ faSort } /> Vendor ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("items.itemName")}><FontAwesomeIcon icon={ faSort } /> Item</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                        {role && role=='buyer' ?
                            <DataTable.Title>BarCode</DataTable.Title>
                            :null
                        }
                    </DataTable.Header>
                                                                            
                    {(role && userId && role=="manager" && allPickupAssignmentConfirm) ?
                        allPickupAssignmentConfirm.map((item)=>{
                            if(item.purchase_order.managerPoolId==managerPoolId)
                            if(item._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{item.purchase_order.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{item.purchase_order.custom_vendorId}</DataTable.Cell>
                                    <DataTable.Cell>{item.purchase_order.items.itemName+" ("+item.purchase_order.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Comp_Purchase', {id: item._id})}}></Button>
                                            :
                                            <Link to={"/View_Completed_Purchase_Order/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                            }
                        }) : null
                    }
                    {(serial_number && role && userId && role=="buyer" && allPickupAssignmentConfirm) ?
                        allPickupAssignmentConfirm.map((item)=>{
                            const today = new Date();
                            let yyyy = today.getFullYear();
                            let mm = today.getMonth() + 1;
                            let dd = today.getDate();
                            const tt = dd +""+ mm + yyyy;
                            // if(item.purchase_order.buyer_id==userId)
                            if(item._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{item.purchase_order.custom_orderId}</DataTable.Cell>
                                    <DataTable.Cell >{item.purchase_order.custom_vendorId ? item.purchase_order.custom_vendorId : "Fresh Inventory"}</DataTable.Cell>
                                    <DataTable.Cell>{item.purchase_order.items.itemName+" ("+item.purchase_order.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Comp_Purchase', {id: item._id})}}></Button>
                                            :
                                            <Link to={"/View_Completed_Purchase_Order/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" onPress={() => BarCodeGen(serial_number+tt+"_"+item.purchase_order.items.itemName+"_"+item.purchase_order.items.Grade+"_"+item.purchase_order.items.quantity, item._id)}>QR</Button>
                                            :
                                            <Button mode="contained" onPress={() => BarCodeGen(serial_number+tt+"_"+item.purchase_order.items.itemName+"_"+item.purchase_order.items.Grade+"_"+item.purchase_order.items.quantity, item._id)} style={{width: '100%'}}>QRCode</Button>
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
                width: '100%',
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