import { faMinusCircle, faPlusCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Card, Button, Menu, Searchbar } from 'react-native-paper';
import { Link, useHistory } from 'react-router-dom';
import { all_customer_pools, all_vendor_pools } from '../../services/pool';
// import swal from '@sweetalert/with-react'
import {url} from '../../utils/url';
import axios from 'axios';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddCustomerVendorPool(props,{ navigation }) {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [customers, setCustomers] = useState();
    const [vendors, setVendors] = useState();
    const [customer, setCustomer] = useState("Choose Customer Pool");
    const [vendor, setVendor] = useState("Choose Vendor Pool");
    const [customerId, setCustomerId] = useState("");
    const [vendorId, setVendorId] = useState("");

    useEffect(() => {
        //Retrieve all customer list
        all_customer_pools()
        .then(result => {
            setCustomers(result);
        })

        //Retrieve all vendor list
        all_vendor_pools()
        .then(result => {
            setVendors(result);
        })

    }, [customers, vendors]);

    let history = useHistory();

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    function ChooseCustomer(id, poolName){
        setCustomerId(id);
        setCustomer(poolName);
        closeMenu1();
    }

    function ChooseVendor(id, poolName){
        setVendorId(id);
        setVendor(poolName);
        closeMenu2();
    }

    function submitForm() {
        axios.post(url + `/create_vendor_customer_cross_pool`, {
                customer_pool_name: customer,
                customer_pool_Id: customerId,
                vendor_pool_name: vendor,
                vendor_pool_Id: vendorId
          })
          .then(function (response) {
            alert(response.data.message);
            history.push('/allcustomervendorpools');
        })
        axios.put(url + `/updateflag_vendor_pool/${vendorId}`, {
            flag_value:1
          })
        .then(function (response) {
            alert(response.data.message);
        });
        axios.put(url + `/updateflag_customer_pool/${customerId}`, {
            flag_value:1
          })
          .then(function (response) {
            alert(response.data.message);
        })  
        .catch(function (error) {
            console.log(error);
         });   
    }

    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    
    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title titleStyle={styles.title} title="New Customer Vendor Cross Pool"/>
                    <Card.Content>
                        <Menu
                        visible={visible1}
                        onDismiss={closeMenu1}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{customer}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch1}
                                value={searchQuery1}
                            />
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                                :
                                <Link to="/addcustomerpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Customer Pool</Button></Link>
                            }
                            {customers ?
                                customers.map((item)=>{
                                    if(item.flag_value === 0){
                                        return (
                                            <Menu.Item title={item.pool_name} onPress={()=>ChooseCustomer(item._id, item.pool_name)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No Customer Pool Available" />
                            }
                        </Menu>
                        <Menu
                        visible={visible2}
                        onDismiss={closeMenu2}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{vendor}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch2}
                                value={searchQuery2}
                            />
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                                :
                                <Link to="/addvendorpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Vendor Pool</Button></Link>
                            }
                            {vendors ?
                                vendors.map((item)=>{
                                    if(item.flag_value === 0){
                                        return (
                                            <Menu.Item title={item.pool_name} onPress={()=>ChooseVendor(item._id, item.pool_name)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No Vendor Pool Available" />
                            }
                        </Menu>
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Submit</Button>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginTop: '10%',
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginTop: '4%',
                marginBottom: '4%',
                width: '75%',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                
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
    button: {
        marginTop: '2%',
    }
}); 