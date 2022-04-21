import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye ,faSort} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  {all_users_by_role} from '../../services/user_api';
import {url} from '../../utils/url';
import { all_vendor_items_by_itemid} from '../../services/vendor_api';

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
export default function Buyer_assignmnet(props, {route,navigation }) {

    var itemid = "";
    if(Platform.OS=="android"){
        itemid = route.params.itemId;
    }
    else{
        itemid = props.match.params.itemid;
    }
    //initialize the all states variables
    const [allItems, setAllItems] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [flag, setFlag] = useState(true);
    const [sorting_order, setSortingOrder] = useState('ASC');
    const [visible, setVisible] = useState([]);
    const [buyer, setBuyer] = useState();
    const [buyer_email, setBuyerEmail] = useState("Choose Buyer");
    const [buyer_id, setBuyerId] = useState("");
    const [visible3, setVisible3] = useState(false)
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);

    useEffect(() => {
        //to get the id of current vendor

        if(itemid &&flag){
            all_vendor_items_by_itemid(itemid)
            .then(result => {
               setAllItems(result[0]);
            setFlag(false);
            });
        }

        all_users_by_role("buyer")
        .then(result => {
            setBuyer(result);
        })

    }, [flag,itemid]);

    function chooseBuyer(id, email){
        setBuyerId(id)
        setBuyerEmail(email);
        closeMenu3();
    }

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

    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    };

    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };
    const StatusChange = (s, id, index) => {

        fetch(`${url}/vendors_update_item_buyer_status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyer_approval_status:s,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
             alert(data.message);
        });

        closeMenu(index);
    };    
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title}>Check Vendor Item</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <Menu
                        visible={visible3}
                        onDismiss={closeMenu3}
                        anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu3}>{buyer_email} </Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                                style={{marginBottom: '20px'}}
                            />
                            {buyer ?
                                buyer.map((item)=>{
                                   // if(item.pool_id==vendorPoolId)
                                    if(item.nick_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                        return (
                                            <Menu.Item title={item.nick_name} onPress={()=>chooseBuyer(item._id, item.email)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No Buyer Available" />
                            }
                        </Menu>
                    <DataTable.Header>
                        <DataTable.Title onPress={()=>sorting("item_name")}><FontAwesomeIcon icon={ faSort } />Item</DataTable.Title>
                        <DataTable.Title ><FontAwesomeIcon icon={ faSort } />Category</DataTable.Title>
                        <DataTable.Title><FontAwesomeIcon icon={ faSort } />Price</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>

                    {/* {allItems ?
                        allItems.map((item,index)=>{
                            if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                            if(item.buyer_approval_status=="pending")
                                return (
                                    <DataTable.Row>
                                        <DataTable.Cell>{item.item_name+"("+item.grade_name+")"}</DataTable.Cell>
                                        <DataTable.Cell>{item.category_name}</DataTable.Cell>
                                        <DataTable.Cell>{item.item_price}</DataTable.Cell>
                                        <DataTable.Cell>
                                            <Menu  visible={visible[index]} onDismiss={()=>closeMenu(index)} anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{item.buyer_approval_status}</Button>}>
                                                <Menu.Item title="Approved" onPress={()=>StatusChange("approved",  item._id, index)}/>
                                                <Menu.Item title="Pending" onPress={()=>StatusChange("pending",  item._id, index)}/>
                                            </Menu>
                                        </DataTable.Cell>  
                                        <DataTable.Cell numeric>
                                            {Platform.OS=='android' ?
                                                <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('VendorsViewItem', {itemId: item._id})}}></Button>
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
                    } */}
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