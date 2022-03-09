import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView  } from 'react-native';
import { Provider, DefaultTheme, Title, DataTable, Searchbar  } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { order_status } from '../../../services/report/order_status';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_order_status(props,{ navigation }) {

    const [allOrderStatus, setAllOrderStatus] = useState();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {

        order_status()  
        .then(result => {
            setAllOrderStatus(result);
            console.log(result);
        })

    }, [allOrderStatus]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>All Order Status</Title>
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
                        <DataTable.Title >Item</DataTable.Title>
                        <DataTable.Title>Quantity</DataTable.Title>
                        <DataTable.Title>Split Status</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                    </DataTable.Header>

                    {allOrderStatus &&
                        allOrderStatus.map((item)=>{        
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell >{item.orderId}</DataTable.Cell>
                                    <DataTable.Cell >{item.item_name+" ("+item.item_grade+")"}</DataTable.Cell>
                                    <DataTable.Cell >{item.quantity}</DataTable.Cell>
                                    <DataTable.Cell >{item.split_status}</DataTable.Cell>
                                    <DataTable.Cell >{item.status}</DataTable.Cell>
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