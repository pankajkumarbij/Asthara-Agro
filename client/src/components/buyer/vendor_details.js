import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { all_users_by_role } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define show vendor details component
export default function Vendor_details(props,{ navigation }) {

    const [allItems, setAllItems] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const  [roleas, setRoleas] = useState("");
    //fetch all vendor details from the database
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        //retrieve all vendors
        all_users_by_role("vendor")
        .then(result=> {
            setAllItems(result);
        })
    }, [allItems, host]);

    const onChangeSearch = query => setSearchQuery(query);
    //show all the vendor details in datatable with search bar
    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
                <DataTable style={styles.datatable}>
                    <Title>All Vendors</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        <DataTable.Title>S.no</DataTable.Title>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Email</DataTable.Title>
                        <DataTable.Title>Acton</DataTable.Title>
                    </DataTable.Header>
                {allItems ?
                    allItems.map((item)=>{
                        if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                <DataTable.Cell>{item._id}</DataTable.Cell>
                                <DataTable.Cell>{item.full_name}</DataTable.Cell>
                                <DataTable.Cell>{item.email}</DataTable.Cell>
                                <DataTable.Cell>
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} onPress={() => {navigation.navigate('EditUser', {userId: item._id})}}>Details</Button>
                                        :
                                        <Button mode="contained" style={{width: '100%'}}><Link to={"/viewuser/"+item._id}>Details</Link></Button>
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
                width: '70%',
                border: '1px solid gray',
                borderRadius: '2%',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
}); 