import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { item_by_item_id } from '../../services/item_api';
import axios from 'axios';
import {url} from'../../utils/url';
import {useHistory} from 'react-router-dom';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define edit item component
export default function EditItem({route},props) {

    var itemid = "";
    let history=useHistory();
    if(Platform.OS=="android"){
        itemid = route.params.itemId;
    }
    else{
        itemid = props.match.params.itemid;
    }
    const [itemName, setItemName] = useState("");
    const [flag, setFlag] = useState(true);

    useEffect(() => {

        if(itemid && flag){
            //Retrieve item by itemId
            item_by_item_id(itemid)
            .then(result=> {
                setItemName(result[0].item_name);
                setFlag(false);
            })
        }

    }, [itemName,flag,itemid]);

    //define submit function for sending the data into database
    function submitForm() {
        axios.put(url + '/update_item/'+itemid, {
            item_name: itemName,
          })
          .then(function (response) {
            alert(response.data.message);
            if(response.data)
            {
                history.push('/allitems');
            }
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    const StatusChange = (s) => {
        axios.put(url + '/disabled_item/'+itemid, {
            status: s,
          })
          .then(function (response) {
            alert(response.data.message);
            if(response.data)
            {
                history.push('/disabled_all_items');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    };

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {itemid?
                    <Card style={styles.card}>
                        <Card.Title title="EDIT ITEM"/>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" label="Item Name" value={itemName} onChangeText={itemName => setItemName(itemName)} />
                            <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item</Button>
                            <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("disabled")}>Disable Item</Button>
                        </Card.Content>
                    </Card>
                    :
                    <ActivityIndicator size={50}/>
                }
            </View>
        </Provider>
    );
}
//define stylesheet for the component (IOS styles to be added)
const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                //to be updated for IOS
                marginTop: '10%',
                width: '90%',
            },
            android: {
                marginTop: '10%',
                width: '90%',
            },
            default: {
                marginTop: '4%',
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        backgroundColor: 'white',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                
            }
        })
    },
    button: {
        marginTop: '2%',
    }
}); 
