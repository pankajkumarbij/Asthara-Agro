import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye,faSort } from '@fortawesome/free-solid-svg-icons';
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
    const [searchQuery, setSearchQuery] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((vendorid) => {
                setVendorId(vendorid);
            })
        }
        fetchData();

        //Retrieve vendors address
        if(vendorId){
            all_vendor_addresses(vendorId)
            .then(result => {
                setAddress(result);
            });
        }
        
    }, [vendorId ]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...address].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAddress(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...address].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAddress(sorted);
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
                    <Title style={styles.title} >Your All pickup Addresses</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("address")}><FontAwesomeIcon icon={ faSort } />Address</DataTable.Title>
                        <DataTable.Title><FontAwesomeIcon icon={ faSort } />Pin code</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("state")}><FontAwesomeIcon icon={ faSort } />State</DataTable.Title>
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
                                                <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" onPress={() => {navigation.navigate('EditItem', {addressId: address._id})}}></Button>
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
