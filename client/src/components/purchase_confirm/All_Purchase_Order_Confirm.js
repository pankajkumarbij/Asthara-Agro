import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator, Text  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Portal, Modal, TextInput  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { users_by_id } from '../../services/user_api';
import { all_confirm_purchase_order, purchase_order } from '../../services/order_api';
import { all_vendor_items_by_id_pincode } from '../../services/vendor_api';
import { roleas, loginuserId } from '../../utils/user';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Purchase_Order_Confirm({ navigation }) {

    const [allPurchaseOrderConfirm, setAllPurchaseOrderConfirm] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const [vendor, setVendor] = useState();
    const [address, setAddress] = useState();
    const [managerPoolId, setManagerPoolId] = useState('');

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const[role,setRole] = useState("");
    const [userId,setUserId] = useState("");

    useEffect(() => {

        roleas()
        .then(result=>{
           setRole(result);   
        })

        loginuserId()
        .then(result=>{
           setUserId(result);   
        })

        if(role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_confirm_purchase_order()
        .then(result=>{
            setAllPurchaseOrderConfirm(result);
        })

    }, [allPurchaseOrderConfirm,role,userId]);

    function VendorDetails(id, customid) {
        users_by_id(id)
        .then(result => {
            setVendor(result[0]);
            showModal();
        })

        const pincode = customid.split("_")[1];

        all_vendor_items_by_id_pincode(id, pincode)
        .then(result => {
            setAddress(result[0]);
        })
    }

    const onChangeSearch = query => setSearchQuery(query);

    const containerStyle = {backgroundColor: 'white', padding: 20, width: '50%', alignSelf: 'center'};

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        {vendor && address &&
                            <>
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput style={{flex: 1,}} mode="outlined" label="Email" value={vendor.email} />
                                    <TextInput style={{flex: 1,}} mode="outlined" label="Name" value={vendor.full_name} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput style={{flex: 1,}} mode="outlined" label="Nick Name" value={vendor.nick_name} />
                                    <TextInput style={{flex: 1,}} mode="outlined" label="Mobile No" value={vendor.mobile_no} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput style={{flex: 1, marginTop: '3%'}} mode="outlined" label="Address" value={address.address} />
                                    <TextInput style={{flex: 1, marginTop: '3%'}} mode="outlined" label="Landmark" value={address.landmark} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput style={{flex: 1,}} mode="outlined" label="District" value={address.district} />
                                    <TextInput style={{flex: 1,}} mode="outlined" label="State" value={address.state} />
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TextInput style={{flex: 1,}} mode="outlined" label="Country" value={address.country} />
                                    <TextInput style={{flex: 1,}} mode="outlined" label="Pin Code" value={address.postal_code} />
                                </View>
                            </>
                        }
                    </Modal>
                </Portal>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title} >All Confirm Purchase Order</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Order ID</DataTable.Title>
                        <DataTable.Title>Vendor ID</DataTable.Title>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {role=="manager" && allPurchaseOrderConfirm ?
                        allPurchaseOrderConfirm.map((purchaseOrderConfirm)=>{
                            if(purchaseOrderConfirm.managerPoolId==managerPoolId)
                            if(purchaseOrderConfirm._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{purchaseOrderConfirm.custom_orderId}</DataTable.Cell>
                                        <DataTable.Cell onPress={() => VendorDetails(purchaseOrderConfirm.vendor_id, purchaseOrderConfirm.custom_vendorId)}>{purchaseOrderConfirm.custom_vendorId}</DataTable.Cell>
                                        <DataTable.Cell>{purchaseOrderConfirm.items.itemName+" ("+purchaseOrderConfirm.items.Grade+")"}</DataTable.Cell>
                                        <DataTable.Cell>{purchaseOrderConfirm.status}</DataTable.Cell>
                                        <DataTable.Cell numeric> 
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('View_Purchase_Order_Confirm3', {purchaseId: purchaseOrderConfirm._id})}}>Details</Button>
                                                :
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/View_Purchase_Order_Confirm3/"+purchaseOrderConfirm._id}>Details</Link></Button>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
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
                // textAlign: 'center',
                // color: 'green',
                // fontSize: 28,
                // fontFamily: 'Roboto'
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