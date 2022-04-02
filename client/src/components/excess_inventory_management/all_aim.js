import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';
import { all_aim } from '../../services/access_inventory_management';
import { roleas, loginuserId } from '../../utils/user';
import { users_by_id } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function All_Aim(props,{ navigation }) {

    const [allAim, setAllAim] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [managerPoolId, setManagerPoolId] = useState('');
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        
        if(role && role=='manager' && userId){
            users_by_id(userId)
            .then(result=>{
                setManagerPoolId(result[0].pool_id);
            })
        }

        all_aim()
        .then(result => {
            setAllAim(result);
            // console.log(result);
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
        })

    }, [allAim, role, userId]);

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                <Title style={styles.title}>All Excess Inventory Items</Title>
                <Searchbar
                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                    placeholder="Search"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
                <DataTable.Header>
                    {/* <DataTable.Title>Buyer ID</DataTable.Title>
                    <DataTable.Title>Vendor ID</DataTable.Title> */}
                    <DataTable.Title>Item</DataTable.Title>
                    <DataTable.Title>Excess Item Quantity</DataTable.Title>
                    <DataTable.Title>Status</DataTable.Title>
                    <DataTable.Title>Action</DataTable.Title>
                </DataTable.Header>

                {(role && userId && role=="manager" && allAim) ?
                    allAim.map((purchaseOrder,index)=>{
                        if(purchaseOrder.managerPoolId==managerPoolId)
                        if(purchaseOrder._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{purchaseOrder.custom_orderId}</DataTable.Cell>
                                    {/* <DataTable.Cell>{purchaseOrder.custom_vendorId}</DataTable.Cell> */}
                                    <DataTable.Cell>{purchaseOrder.items.itemName+" ("+purchaseOrder.items.Grade+")"}</DataTable.Cell>
                                    {/* <DataTable.Cell>{purchaseOrder.status}</DataTable.Cell> */}
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Purchase_Order', {purchaseId: purchaseOrder._id})}}>Check</Button>
                                            :
                                            <Link to={"/View_Aim/"+purchaseOrder._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>       
                                </DataTable.Row>
                            )
                        }
                        else{
                            return "";
                        }
                    }): null
                }
                {(role && userId && role=="buyer" && allAim) ?
                    allAim.map((aim,index)=>{
                        if(aim.buyerId==userId)
                        if(aim._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){              
                            return (
                                <DataTable.Row>
                                    {/* <DataTable.Cell>{aim.buyerId}</DataTable.Cell>
                                    <DataTable.Cell>{aim.vendorId}</DataTable.Cell> */}
                                    
                                    <DataTable.Cell>{aim.items.itemName+" ("+aim.items.Grade+")"}</DataTable.Cell>
                                    <DataTable.Cell>{aim.excess_quantity}</DataTable.Cell>
                                    <DataTable.Cell>{aim.status}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Purchase_Order', {purchaseId: aim._id})}}>Check</Button>
                                            :
                                            <Link to={"/View_Aim/"+aim._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>       
                                </DataTable.Row>
                            )
                        }
                        else{
                            return "";
                        }
                    }): null
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