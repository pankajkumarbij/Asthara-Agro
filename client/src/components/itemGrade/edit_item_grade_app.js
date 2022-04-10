import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
import { item_grade_by_grade_id } from '../../services/item_api';
import axios from 'axios';
import {url} from '../../utils/url';
import {useHistory} from "react-router-dom";
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditItemGradeapp({route,navigation},props) {

    var itemGradeid = "";
    var id="";
    let history=useHistory();
    if(Platform.OS=="android"){
        itemGradeid = route.params.itemGradeId;
    }
    else{
        itemGradeid = props.match.params.itemGradeid;
    }
    const [itemGradeName, setItemGradeName] = useState("");
    const [host, setHost] = useState("");
    
    useEffect(() => {

        if(itemGradeid){
            //Retrieve item grade by ItemGradeid
            item_grade_by_grade_id(itemGradeid)
            .then(result => {
                setItemGradeName(result[0].grade_name);
            })
        }

    }, [itemGradeid]);

    function submitForm() {
        axios.put(url + '/update_item_grade/'+itemGradeid, {
            grade_name: itemGradeName,
        })
          .then(function (response) {
            //console.log(response);
            alert(response.data.message);
            if(response)
              {
                navigation.navigate('AllItemGrade');

              }

          })
          .catch(function (error) {
            console.log(error);
          }); 
    }
       
    const StatusChange = (s) => {
        axios.put(url + '/enabled_item_grade/'+itemGradeid, {
            status: s,
        })
          .then(function (response) {
              console.log(response);
            alert(response.data.message);
            if(response){
                navigation.navigate('AllItemGrade');
            }       
          })
          .catch(function (error) {
            console.log(error);
          });
    }; 

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {itemGradeName ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM GRADE"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Item Grade Name" value={itemGradeName} onChangeText={itemGradeName => setItemGradeName(itemGradeName)} />
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item Grade </Button>
                        <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("disabled")}>Disable Item Grade</Button>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
            </View>
        </Provider>
    );
}

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
