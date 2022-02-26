import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Accepted_Delivery({ navigation }) {

    const [allUpdateDelivery, setAllUpdateDelivery] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        fetch(`http://${host}:5000/retrive_all_accepted_update_delivery`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allUpdateDelivery => setAllUpdateDelivery(allUpdateDelivery));

    }, [allUpdateDelivery, host]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title >All Confirm Delivery </Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Delivery ID</DataTable.Title>
                        <DataTable.Title numeric>Sales ID</DataTable.Title>
                        <DataTable.Title numeric>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                                                                     
                    {allUpdateDelivery ?
                        allUpdateDelivery.map((updateDelivery)=>{
                            if(updateDelivery._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{updateDelivery._id}</DataTable.Cell>
                                        <DataTable.Cell>{updateDelivery.sales_id}</DataTable.Cell>
                                        <DataTable.Cell numeric>{updateDelivery.status}</DataTable.Cell>
                                        <DataTable.Cell numeric> 
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Confirm_Delivery', {deliveryId: updateDelivery._id})}}>Details</Button>
                                                :
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} ><Link to={"/Edit_Confirm_Delivery/"+updateDelivery._id}>Details</Link></Button>
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