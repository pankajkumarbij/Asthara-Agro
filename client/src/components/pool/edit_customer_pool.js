import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button } from 'react-native-paper';
import { useHistory, Link, Router } from 'react-router-dom';
import { customer_pool_by_id } from '../../services/pool';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditCustomerPool(props,{ navigation }) {

    const id = props.match.params.id;

    const [poolName, setPoolName] = useState("");
    const [items, setItems] = useState([]);
    const [pincodeError, setPincodeError] = useState(['']);

    useEffect(() => {

        customer_pool_by_id(id)
        .then(result => {
            setPoolName(result[0].pool_name)
            setItems(result[0].postal_code);
        })

    }, [id]);

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
        fetch(`http://localhost:5000/update_customer_pool/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pool_name: poolName,
                postal_code: items
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            if(data.message!="Something wrong!"){
                alert(data.message);
                history.push('/allcustomerpools');
            }
            else{
                if(data.err.errors){
                    alert("All Fields are required!");
                }
                else if(data.err.keyPattern.postal_code){
                    alert("Pin Code "+data.err.keyValue.postal_code+" is already available in another pool!");
                }
                else if(data.err.keyPattern.pool_name){
                    alert("Pool "+data.err.keyValue.pool_name+" is already created!");
                }
            }
        });
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="Edit Customer Pool"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Pool Name (RAJ_JPR_SANGANER)" value={poolName} onChangeText={poolName => setPoolName(poolName)} />
                    {items.map((it, index) => (
                        <View>
                            <TextInput style={styles.input} mode="outlined" maxLength={6} label="Pin Code" value={it} onChangeText={(text)=>ItemChange(index, text)} />
                            {pincodeError[index] &&
                                <Text style={{color: "red"}}>{pincodeError[index]}</Text>
                            }
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
    button: {
        marginTop: '2%',
    }
}); 