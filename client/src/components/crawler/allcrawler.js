import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button,Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes,faSort } from '@fortawesome/free-solid-svg-icons';
import { retrieve_crawler } from '../../services/crawler';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AllCrawlers(props,{ navigation }) {

    const [allItem, setAllItem] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [sorting_order, setSortingOrder] = useState('ASC');

    useEffect(() => {

        //Retrieve all item Unit
        retrieve_crawler()
        .then(result => {
            console.log(result);
            setAllItem(result);
        })

    }, []);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allItem].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllItem(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allItem].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllItem(sorted);
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
                    <Title style={styles.title} >All Crowlers</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("item_name")}><FontAwesomeIcon icon={ faSort } />Item Name</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("item_grade")}><FontAwesomeIcon icon={ faSort } />Item Grade</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("item_unit")}><FontAwesomeIcon icon={ faSort } />Item Unit</DataTable.Title>
                        <DataTable.Title onPress={()=>sorting("price")}><FontAwesomeIcon icon={ faSort } />Item Price</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {allItem ?
                        allItem.map((item)=>{
                            if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{item.item_name}</DataTable.Cell>
                                    <DataTable.Cell>{item.item_grade}</DataTable.Cell>
                                    <DataTable.Cell>{item.item_unit}</DataTable.Cell>
                                    <DataTable.Cell>{item.price}</DataTable.Cell>
                                    <DataTable.Cell numeric>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItemUnit', {itemUnitId: item._id})}}>Details</Button>
                                            :
                                            <Button mode="contained" style={{width: '100%'}}><Link to={"/editcrawler/"+item._id}>Details</Link></Button>
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
    view: {
        ...Platform.select({
            ios: {
                
            },
            android: {
            },
            default: {
                
            }
        })
    },
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