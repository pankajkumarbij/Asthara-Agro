import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { all_vendor_items_by_id } from '../../services/vendor_api';

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
export default function VendorsAllItems(props,{ navigation }) {
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState('');
    const [roleas, setRoleas] = useState("");
    useEffect(() => {
        //to get the id of current vendor
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
        }
        fetchData();

        setRoleas(props.roleas);

        if(userId){
            
            all_vendor_items_by_id(userId)
            .then(result => {
                console.log(result);
                setAllItems(result);
            });
        }

    }, [allItems,userId, roleas,props.roleas]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={{marginBottom: '20px'}}>Vendor ItemList</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                        style={{marginBottom: '20px'}}
                    />
                    <DataTable.Header>
                        <DataTable.Title>Item</DataTable.Title>
                        <DataTable.Title>Category</DataTable.Title>
                        <DataTable.Title>Grade</DataTable.Title>
                        <DataTable.Title>Unit</DataTable.Title>
                        <DataTable.Title>Quantity</DataTable.Title>
                        <DataTable.Title>Price</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>

                    {allItems ?
                        allItems.map((item)=>{
                            if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.item_name}</DataTable.Cell>
                                        <DataTable.Cell>{item.category_name}</DataTable.Cell>
                                        <DataTable.Cell>{item.grade_name}</DataTable.Cell>
                                        <DataTable.Cell>{item.unit_name}</DataTable.Cell>
                                        <DataTable.Cell>{item.item_quantity}</DataTable.Cell>
                                        <DataTable.Cell>{item.item_price}</DataTable.Cell>
                                        <DataTable.Cell>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('VendorsViewItem', {itemId: item._id})}}>Details</Button>
                                                :
                                                <Link to={"/vendors_view_item/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
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
//define stylesheet for the component (IOS styles to be added)
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