import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { transport_labour_from_vendor } from '../../../services/transport_labour/transport_labour_from_vendor';
import { loginuserId } from '../../../utils/user';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AllTransportLabourFromVendor(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [userId,setUserId] = useState("");

    useEffect(() => {

        loginuserId()
        .then(result=>{
           setUserId(result);   
        })

        transport_labour_from_vendor()
        .then(result=> {
            setAllOrders(result);
        })

    }, [userId]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <Title >All Transport Labour From Vendor</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Vehicle Type</DataTable.Title>
                        <DataTable.Title>Vehicle Number</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                    {allOrders &&
                        allOrders.map((item, index)=>{
                            if(item.buyerId==userId)
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{item.date}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_type}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                            :
                                            <Link to={"/viewtransportlabourfromvendor/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        })
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