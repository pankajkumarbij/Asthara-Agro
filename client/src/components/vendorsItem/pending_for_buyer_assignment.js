import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye ,faSort} from '@fortawesome/free-solid-svg-icons';
import { all_vendor_items } from '../../services/vendor_api';
import { users_by_id } from '../../services/user_api';
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
//define all item components
export default function Buyer_assignmnet(props, {navigation }) {
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [userId, setUserId] = useState('');
    const [role, setRole] = useState("");
    const [sorting_order, setSortingOrder] = useState('ASC');
    const [managerPoolId, setManagerPoolId] = useState('');

    useEffect(() => {
        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        if(userId){
            
            all_vendor_items()
            .then(result => {
                setAllItems(result);
            });
        }

    }, [userId,role]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allItems].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllItems(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allItems].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllItems(sorted);
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
                    <Title style={styles.title}>Vendor Pending Item</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("item_name")}><FontAwesomeIcon icon={ faSort } />Item</DataTable.Title>
                        <DataTable.Title ><FontAwesomeIcon icon={ faSort } />Category</DataTable.Title>
                        <DataTable.Title><FontAwesomeIcon icon={ faSort } />Price</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {allItems ?
                        allItems.map((item,index)=>{
                            if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                            if(item.buyer_approval_status=="pending" && !item.buyer_id && managerPoolId==item.manager_pool)
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.item_name+"("+item.grade_name+")"}</DataTable.Cell>
                                        <DataTable.Cell>{item.category_name}</DataTable.Cell>
                                        <DataTable.Cell>{item.item_price}</DataTable.Cell>
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('VendorsViewItem', {itemId: item._id})}}></Button>
                                                :
                                                <Link to={"/assign_buyer_for_vendorItem/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Assign Buyer</Button></Link>
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