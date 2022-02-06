import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, ActivityIndicator  } from 'react-native';
import { Provider, DefaultTheme, Button, Title, DataTable, Searchbar, Menu  } from 'react-native-paper';
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
//define AllIndents component
export default function AllIndents({ navigation }) {
    //initialize all required state variables
    const [allIndents, setAllIndents] = useState();
    const [host, setHost] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState([]);
    //fetch all Indents
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/displayindent`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(allIndents => setAllIndents(allIndents));
    }, [allIndents, host]);

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
        fetch(`http://${host}:5000/update_indent_status/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
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
    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={styles.view}>
             <DataTable style={styles.datatable}>
                    <Title>All Indents</Title>
               <Searchbar
                        icon={() => <FontAwesomeIcon icon={ faSearch } />}
                        clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                        placeholder="Search"
                        onChangeText={onChangeSearch}
		                value={searchQuery}
                    />

                    <DataTable.Header>
                        <DataTable.Title>Indent ID</DataTable.Title>
                        <DataTable.Title numeric>Status</DataTable.Title>
                        <DataTable.Title numeric>Action</DataTable.Title>
                    </DataTable.Header>
                                                                                                                                                                                                                        
                {allIndents ?
                    allIndents.map((indent,index)=>{
                         if(indent._id.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                       
                        return (
                              <DataTable.Row>
                                <DataTable.Cell>{indent._id}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    <Menu visible={visible[index]} onDismiss={()=>closeMenu(index)} anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{indent.status}</Button>}>
                                    <Menu.Item title="Approve" onPress={()=>StatusChange("approved", indent._id, index)}/>
                                    <Menu.Item title="Reject" onPress={()=>StatusChange("rejected", indent._id, index)}/>
                                    {/* <Menu.Item title="Pending" onPress={()=>StatusChange("pending",  indent._id, index)}/> */}
                                    </Menu>
                                </DataTable.Cell>
                                <DataTable.Cell numeric> 
                                    {Platform.OS=='android' ?
                                        <Button mode="contained" style={{width: '100%'}} icon={() => <FontAwesomeIcon icon={ faEye } />} onPress={() => {navigation.navigate('Edit_Indent', {indentId: indent._id})}}>Details</Button>
                                        :
                                        <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEye } />} style={{width: '100%'}}><Link to={"/Edit_Indent/"+indent._id}>Details</Link></Button>
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