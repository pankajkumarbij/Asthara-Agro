import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
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

//define edit address component
export default function EditAddress(props, {route}) {
    //fetch address id for edit the address
    var addressid = '';
    var id = '';
    if (Platform.OS === 'android'){
        id = route.params.addressId;
    }
    else {
        addressid = props.match.params.addressid;
    }

    //initialize all required state variables
    const [addressId,setAddressId] = useState('');
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [host, setHost] = useState('');
    //fetch already stored address details for edit details 
    useEffect(() => {
        if (Platform.OS === 'android'){
            setHost('10.0.2.2');
            setAddressId(id);
        }
        else {
            setHost('localhost');
            setAddressId(addressid);
        }
        if (addressId){
            fetch(`${url}/retrive_address/${addressId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setUserId(item[0].userId);
                setAddress(item[0].address);
                setLandmark(item[0].landmark);
                setPincode(item[0]. postal_code);
                setState(item[0].state);
                setDistrict(item[0].district);
                setCountry(item[0].country);
            });
        }
    }, [host,id,addressId,addressid]);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`${url}/update_address/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }
    //define all the required input fields for edit corresponding data
    return (
        <Provider theme={theme}>
            <View style={styles.view}>
                <Card style={styles.card}>
                    <Card.Title title="Update Address"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={add => setAddress(add)} />
                    <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={land => setLandmark(land)} />
                    <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={dist => setDistrict(dist)} />
                    <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={st => setState(st)} />
                    <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={coun => setCountry(coun)} />
                    <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pin => setPincode(pin)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update address</Button>
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
    view :{
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center'
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
