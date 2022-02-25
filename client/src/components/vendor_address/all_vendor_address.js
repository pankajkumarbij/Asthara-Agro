import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { all_vendor_addresses } from '../../services/vendor_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_addressesVendor({ navigation }) {

    const [vendorId, setVendorId] = useState('');
    const [address, setAddress] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((vendorid) => {
                setVendorId(vendorid);
            })
        }
        fetchData();

        if(Platform.OS == "android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        //Retrieve vendors address
        if(vendorId){
            all_vendor_addresses(vendorId)
            .then(result => {
                setAddress(result);
            });
        }
        
    }, [address, host, vendorId ]);
    
    const onChangeSearch = query => setSearchQuery(query);
    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>Your All pickup Addresses</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />
                    <DataTable.Header>
                        <DataTable.Title>Address</DataTable.Title>
                        <DataTable.Title>Pin code</DataTable.Title>
                        <DataTable.Title>State</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>
                        { address  ?
                            address.map((address,index)=>{
                                return(
                                    <DataTable.Row>
                                        <DataTable.Cell>{address.address}</DataTable.Cell>
                                        <DataTable.Cell>{address.postal_code}</DataTable.Cell>
                                        <DataTable.Cell>{address.state}</DataTable.Cell>
                                        <DataTable.Cell>
                                            {Platform.OS=='android' ?
                                                <Button color="red" icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {addressId: address._id})}}>Details</Button>
                                                :
                                                <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}}><Link to={"/edit_vendor_address/"+address._id}>Details</Link></Button>
                                            }
                                        </DataTable.Cell>
                                    </DataTable.Row> 
                                    
                                )
                            })
                            :
                            <ActivityIndicator color="#794BC4" size={60}/>

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
