import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { all_customer_items_by_id } from '../../services/customer_api';
import { all_users_by_role } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_addresses({ navigation }) {

    const [visible2, setVisible2] = useState(false);

    const [searchQuery2, setSearchQuery2] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [customerEmail, setCustomerEmail] = useState("Choose customer");
    const [customer, setCustomer] = useState();
    const [address, setAddress] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((customerid) => {
                setCustomerId(customerid);
            })
        }
        fetchData();

        if(Platform.OS == "android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        //Retrieve customers
        all_users_by_role("customer")
        .then(result => {
            setCustomer(result);
        })
        
    }, [address, host, customerId ]);
    
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const CustomerChange = (id, email) => {
        setCustomerEmail(email);
        setCustomerId(id);

        all_customer_items_by_id(id)
        .then(result => {
            setAddress(result);
        })
        closeMenu2();
    };

    const onChangeSearch2 = query => setSearchQuery2(query);
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title}>Customer All Addresses</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <Menu
                        visible={visible2}
                        onDismiss={closeMenu2}
                        anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={openMenu2}>{customerEmail}</Button>}>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch2}
                            value={searchQuery2}
                        />
                        {customer ?
                            customer.map((item)=>{
                                if(item.email.toUpperCase().search(searchQuery2.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                    return (
                                        <>
                                        <Menu.Item title={item.email+" ( "+item.full_name+" ) "} onPress={()=>CustomerChange(item._id, item.email)}/>
                                        </>
                                    )
                                }
                            })
                            :
                            <Menu.Item title="No Customers are available" />
                        }
                    </Menu>
                    <DataTable.Header>
                        <DataTable.Title>Address</DataTable.Title>
                        <DataTable.Title>Landmark</DataTable.Title>
                        {/* <DataTable.Title>Pin code</DataTable.Title>
                        <DataTable.Title>State (District)</DataTable.Title>
                        <DataTable.Title>Country</DataTable.Title> */}
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>
                    { address  ?
                        address.map((address,index)=>{
                            return(
                                <DataTable.Row>
                                    <DataTable.Cell>{address.address}</DataTable.Cell>
                                    <DataTable.Cell>{address.landmark}</DataTable.Cell>
                                    {/* <DataTable.Cell>{address.postal_code}</DataTable.Cell>
                                    <DataTable.Cell>{address.state+" ("+address.district+")"}</DataTable.Cell>
                                    <DataTable.Cell>{address.country}</DataTable.Cell> */}
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button  mode="contained"  onPress={() => {navigation.navigate('EditItem', {addressId: address._id})}}>De</Button>
                                            :
                                            <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}}><Link to={"/edit_customer_address/"+address._id}>Details</Link></Button>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row> 
                                
                            )
                        })
                        :null
                    } 
            </DataTable>
            </View>
        </ScrollView>
        </SafeAreaView>s
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