import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
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
//define all item components
export default function AllInvoice({ navigation }) {
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/retrive_all_item`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allItems => setAllItems(allItems));
    }, [allItems, host]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title>All Invoice</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title>ID</DataTable.Title>
                        <DataTable.Title>Customer ID</DataTable.Title>
                        <DataTable.Title>Mobile</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Address</DataTable.Title>
                        <DataTable.Title>OrderId</DataTable.Title>
                        <DataTable.Title>Item ID</DataTable.Title>
                        <DataTable.Title>Item Name</DataTable.Title>
                        <DataTable.Title>Unit</DataTable.Title>
                        <DataTable.Title>Grade</DataTable.Title>
                        <DataTable.Title>Price</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>
                {allItems ?
                    allItems.map((item)=>{
                        if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>
                                    {/* {item.item_name} */}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                 {/* {item.category_name} */}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                  {/* {item.unit_name} */}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {/* {Platform.OS=='android' ?
                                        <Button color="red" icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {itemId: item._id})}}>Details</Button>
                                        :
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained" style={{width: '100%'}}><Link to={"/edititem/"+item._id}>Details</Link></Button>
                                    } */}
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
//define stylesheet for the component (IOS styles to be added)
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
                width: '50%',
                border: '1px solid gray',
                borderRadius: '2%',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 