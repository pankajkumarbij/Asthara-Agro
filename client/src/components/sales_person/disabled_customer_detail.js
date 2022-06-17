import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar,Menu } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Disabled_Customer_details({ navigation }) {

    const [allItems, setAllItems] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState([]);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch('http://localhost:5000/retrive_all_disabled_customer', {
          method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allItems => setAllItems(allItems));
    }, [allItems, host]);

    const onChangeSearch = query => setSearchQuery(query);

     //openMenu for Open Menu
    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    };
    //closeMenu for Close Menu
    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };
    //statusChange() define function for update the status field
    const StatusChange = (s, id, index) => {
        fetch(`http://${host}:5000/enable_customer/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
                remark:"",
                
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });
        closeMenu(index);
    };

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title style={styles.title}>Disabled Customers</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title>S.no</DataTable.Title>
                        {Platform.OS=="android" ?
                                    <></>
                                    : 
                                    <>
                                        <DataTable.Title>Name</DataTable.Title>
                                    </>
                        }
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title>Action1</DataTable.Title>
                        <DataTable.Title>Action2</DataTable.Title>
                    </DataTable.Header>
                {allItems ?
                    allItems.map((item,index)=>{
                        if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{item._id}</DataTable.Cell>
                                {Platform.OS=="android" ?
                                    <></>
                                    : 
                                    <>
                                        <DataTable.Cell>{item.full_name}</DataTable.Cell>
                                    </>
                                }
                                <DataTable.Cell>{item.email}</DataTable.Cell>
                                <DataTable.Cell>{item.status}</DataTable.Cell>
                                <DataTable.Cell>
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditItem', {vendorId: item._id})}}>Details</Button>
                                        :
                                        <Button mode="contained" style={{width: '100%'}}><Link to={"/editcustomerdetails/"+item._id}>Details</Link></Button>
                                    }
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Menu visible={visible[index]} onDismiss={()=>closeMenu(index)} anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>Enable</Button>}>
                                        <Menu.Item title="Enable" onPress={()=>StatusChange("enabled", item._id, index)}/>
                                        <Menu.Item title="Disable" onPress={()=>StatusChange("disabled", item._id, index)}/>
                                    </Menu>
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
                width: '50%',
                border: '1px solid gray',
                borderRadius: '2%',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 