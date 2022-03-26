import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView  } from 'react-native';
import { Provider, DefaultTheme, Title, DataTable, Searchbar  } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faSort, faTimes } from '@fortawesome/free-solid-svg-icons';
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
    const [sorting_order, setSortingOrder] = useState('ASC');

    useEffect(() => {

        order_status()  
        .then(result => {
            setAllOrderStatus(result);
            console.log(result);
        })

    }, []);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allOrderStatus].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllOrderStatus(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allOrderStatus].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllOrderStatus(sorted);
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
                    <Title style={styles.title}>All Order Status</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("orderId")}><FontAwesomeIcon icon={ faSort } /> Order ID</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("item_name")}><FontAwesomeIcon icon={ faSort } /> Item</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("quantity")}><FontAwesomeIcon icon={ faSort } /> Quantity</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("split_status")}><FontAwesomeIcon icon={ faSort } /> Split Status</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("status")}><FontAwesomeIcon icon={ faSort } /> Status</DataTable.Title>
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