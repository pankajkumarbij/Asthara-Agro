import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
// import swal from '@sweetalert/with-react'
import axios from 'axios';
import {url} from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddManagerPool({ navigation }) {

    const [poolName, setPoolName] = useState("");
    const [items, setItems] = useState(['']);
    const [pincodeError, setPincodeError] = useState(['']);

    let history = useHistory();

    const ItemChange = (index, fieldvalue) => {
        const error = [...pincodeError];
        const values = [...items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{6,}/;
        if(!numberRegex.test(fieldvalue)){
            error[index] = "Pin Code Only Should be Numeric";
            setPincodeError(error);
        }
        else if(!minLengthRegex.test(fieldvalue)){
            error[index] = "Pin Code Length should be 6";
            setPincodeError(error);
        }
        else{
            error[index] = '';
            setPincodeError(error);
        }
        values[index] = fieldvalue.replace(/[^0-9]/g, '');
        setItems(values);
    };

    const handleAddFields = () => {
        const values = [...items];
        values.push('');
        setItems(values);
        const error = [...pincodeError];
        error.push('');
        setPincodeError(error);
    };
    
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        axios.post(url + `/create_manager_pool`, {
            pool_name: poolName,
            postal_code: items
          })
        .then(function (response){
            console.log(response.data);
            if(response.data.message!="something wrong!"){
                alert(response.data.message);
                if(Platform.OS=='android'){
                    navigation.navigate('AllManagerPools');
                }
                else{
                    history.push('/allmanagerpools');
                }
            }
            else{
                if(response.data.error.errors){
                    alert("All Fields are required!");
                }
                else if(response.data.error.keyPattern.postal_code){
                    alert("Pin Code "+response.data.error.keyValue.postal_code+" is already available in another pool!");
                }
                else if(response.data.error.keyPattern.pool_name){
                    alert("Pool "+response.data.error.keyValue.pool_name+" is already created!");
                }
            }
        })
        .catch(function (error) {
            console.log(error);
         });
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title titleStyle={styles.title} title="New Manager Pool"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Pool Name (RAJ_JPR_SANGANER)" value={poolName} onChangeText={poolName => setPoolName(poolName)} />
                    {items.map((it, index) => (
                        <View>
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={it} maxLength={6} onChangeText={(text)=>ItemChange(index, text)} />
                            {pincodeError[index] ?
                                <Text style={{color: "red"}}>{pincodeError[index]}</Text>
                            :
                            <View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                        <FontAwesomeIcon icon={ faPlusCircle } onPress={() => handleAddFields()} color={ 'green' } size={30} />
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>
                                        <Button  onPress={() => handleAddFields()}  mode="outlined"><FontAwesomeIcon icon={ faPlusCircle } color={ 'green' } size={30} /></Button>
                                    </>
                                }
                            </View>
                            }
                        </View>
                    ))}
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Submit</Button>
                    </Card.Content>
                </Card>
            </View>
        </ScrollView>
        </SafeAreaView>
        </Provider>
    );
}

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