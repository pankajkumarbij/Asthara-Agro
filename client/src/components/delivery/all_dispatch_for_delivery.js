import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { all_deliveries } from '../../services/delivery';
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

export default function AllDispatchForDelivery(props, { navigation }) {

    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {

        all_deliveries()
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

    }, []);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Dispatch For Delivery</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Vehicle Type</DataTable.Title>
                        <DataTable.Title>Vehicle Number</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                    {role && userId && allOrders &&
                        allOrders.map((item, index)=>{
                            if(item.salesId==userId)
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{item.createdAt.substring(0,10)}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_type}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Details</Button>
                                            :
                                            <View style={{flexDirection: 'row'}}>
                                                <Link to={"/viewdispatchfordelivery/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link> &nbsp;
                                                <Link to={"/editdeliveryunloading/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Unloading</Button></Link>
                                            </View>
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