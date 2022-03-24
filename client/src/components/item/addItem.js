import React, {useState} from 'react';
import { View, StyleSheet, Platform,} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme} from 'react-native-paper';
import axios from 'axios';
import {url} from '../../utils/url';
import { useHistory } from 'react-router-dom';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define add items component
export default function AddItem({ navigation }) {
   
    const [itemName, setItemName] = useState("");
    let history = useHistory();

    function submitForm() {
        axios.post(url + '/create_item', {
            item_name: itemName,
          })
          .then(function (response) {
              console.log(response);
            alert(response.data.message);
            if(response.data)
            {
                if(Platform.OS=='android'){
                    navigation.navigate('AllItems');
                }
                else{
                    history.push('/allitems');
                }
            }
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title titleStyle={styles.title} title="ADD ITEM"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Item Name" value={itemName} onChangeText={itemName => setItemName(itemName)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Item</Button>
                    </Card.Content>
                </Card>
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
                
            },
            android: {
                marginTop: '10%',
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
                marginTop: '4%',
                marginBottom: '4%',
                width: '75%',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                
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
    button: {
        marginTop: '2%',
    }
}); 
