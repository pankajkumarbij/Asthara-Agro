import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar } from 'react-native-paper';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faEye,faSort } from '@fortawesome/free-solid-svg-icons';
import { all_users } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AllUsers(props,{ navigation }) {

    const [allUsers, setAllUsers] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [roleas, setRoleas] = useState("");
    const [sorting_order, setSortingOrder] = useState('ASC');

    useEffect(() => {

        setRoleas(props.roleas);
        //Retrieve all users
        all_users()
        .then(function(result) {
            setAllUsers(result);
        })
    }, [roleas, props.roleas]);

    const sorting = (col)=>{
        if(sorting_order=="ASC"){
            const sorted=([...allUsers].sort((a,b)=>
            a[col].toLowerCase()>b[col].toLowerCase() ?1:-1));
            setAllUsers(sorted);
            setSortingOrder('DES');
        }
        if(sorting_order=="DES"){
            const sorted=([...allUsers].sort((a,b)=>
            a[col].toLowerCase()<b[col].toLowerCase() ?1:-1));
            setAllUsers(sorted);
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
                    <Title style={styles.title} >All Users</Title>
                    <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />
                    <DataTable.Header>
                        {/* <DataTable.Title>Email</DataTable.Title> */}
                        {Platform.OS !== "android" &&
                        <DataTable.Title onPress={()=>sorting("full_name")}><FontAwesomeIcon icon={ faSort } />Full Name</DataTable.Title>
                        }
                        <DataTable.Title onPress={()=>sorting("nick_name")}><FontAwesomeIcon icon={ faSort } />Nick Name</DataTable.Title>
                        
                        <DataTable.Title onPress={()=>sorting("role")}><FontAwesomeIcon icon={ faSort } />Role</DataTable.Title>
                        <DataTable.Title>Action</DataTable.Title>
                    </DataTable.Header>
                {allUsers ?
                    allUsers.map((item)=>{
                        if(item.email.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery.toUpperCase())!=-1 || item.role.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                        return (
                            <DataTable.Row>
                                {/* <DataTable.Cell>{item.email}</DataTable.Cell> */}
                                {Platform.OS !== "android" &&
                                <DataTable.Cell>{item.full_name}</DataTable.Cell>
                                }
                                <DataTable.Cell>{item.nick_name}</DataTable.Cell>
                                
                                <DataTable.Cell>{item.role}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {Platform.OS=='android' ?
                                        <Button icon={() => <FontAwesomeIcon icon={ faEye } />} mode="contained"  onPress={() => {navigation.navigate('ViewUser', {userId: item._id})}}>Check</Button>
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