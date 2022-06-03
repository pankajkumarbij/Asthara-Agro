import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { transport_labour_for_sales } from '../../../services/transport_labour/transport_labout_for_sales';
import { roleas, loginuserId } from '../../../utils/user';
import  {all_users_by_role} from '../../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AllTransportLabourForSales(props, { navigation }) {

    const [visible3, setVisible3] = useState(false)
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [allOrders, setAllOrders] = useState();
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState("");
    const [buyer, setBuyer] = useState();
    const [buyer_id, setBuyerId] = useState("");
    const [buyer_email, setBuyerEmail] = useState("Choose Buyer");

    useEffect(() => {

        transport_labour_for_sales()
        .then(result=> {
            setAllOrders(result);
            console.log(result);
        })

        roleas()  
        .then(result => {
            setRole(result);
        })

        loginuserId()  
        .then(result => {
            setUserId(result);
            setBuyerId(result);
        })

        all_users_by_role("buyer")
        .then(result => {
            setBuyer(result);
        })

        var dt = new Date().toLocaleString().substring(0,10);
        let newString = "";
        newString += dt.substring(6,10)+"-"+dt.substring(3,5)+"-"+dt.substring(0,2);
        setDate(newString);

    }, []);

    function chooseBuyer(id, email){
        setBuyerId(id)
        setBuyerEmail(email);
        closeMenu3();
    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title} >All Transport Labour For Sales</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View>
                            <Text style={{color: 'gray', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline'}}>Date</Text>
                            <View>
                                <input type="date" onChange={(e) => setDate(e.target.value)}/>
                            </View>
                        </View>
                        <View>
                            {role=="manager" ?
                            <Text style={{color: 'gray', fontSize: '20px', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline'}}>Select Buyer</Text>
                            :
                            null
                            }
                            {role=="manager" ?
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
                                        if(item.nick_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                            return (
                                                <Menu.Item title={item.nick_name} onPress={()=>chooseBuyer(item._id, item.email)} />
                                            )
                                        }
                                    })
                                    :
                                    null
                                }
                            </Menu>
                            :null
                            }
                        </View>
                    </View>
                    <DataTable.Header>
                        <DataTable.Title>Date</DataTable.Title>
                        <DataTable.Title>Vehicle Type</DataTable.Title>
                        <DataTable.Title>Vehicle Number</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>
                    {role && userId && allOrders ?
                        allOrders.map((item, index)=>{
                            if(item.buyerId==buyer_id)
                            if(item.createdAt.substring(0,10)==date)
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{item.createdAt.substring(0,10)}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_type}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Check</Button>
                                            :
                                            <Link to={"/viewtransportlabourforsales/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
                        }): null
                    }
                    {role=="sales" && allOrders ?
                        allOrders.map((item, index)=>{
                            if(item.createdAt.substring(0,10)==date)
                            return (
                                <DataTable.Row>
                                    <DataTable.Cell>{item.createdAt.substring(0,10)}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_type}</DataTable.Cell>
                                    <DataTable.Cell>{item.vehicle_number}</DataTable.Cell>
                                    <DataTable.Cell>
                                        {Platform.OS=='android' ?
                                            <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('EditOrder', {itemId: item._id})}}>Check</Button>
                                            :
                                            <View style={{flexDirection: 'row'}}>
                                                <Link to={"/viewtransportlabourforsales/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Details</Button></Link> &nbsp;
                                                <Link to={"/edittransportlabourforsalesunloading/"+item._id}><Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}>Unloading</Button></Link>
                                            </View>
                                        }
                                    </DataTable.Cell>
                                </DataTable.Row>
                            )
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