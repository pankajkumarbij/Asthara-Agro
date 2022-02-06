import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
import { customer_address_by_id } from '../../services/customer_api';

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
    var addressid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.addressId;
    }
    else{
        addressid = props.match.params.addressid;
    }

    //initialize all required state variables
    const [addressId,setAddressId]=useState("");
    const [customerId, setCustomerId] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [host, setHost] = useState('');
    //fetch already stored address details for edit details 
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setAddressId(id);
        }
        else{
            setHost("localhost");
            setAddressId(addressid);
        }

        if(addressId){
            customer_address_by_id(addressId)
            .then(result => {
                setCustomerId(result[0].customerId);
                setAddress(result[0].address);
                setLandmark(result[0].landmark);
                setPincode(result[0]. postal_code);
                setState(result[0].state);
                setDistrict(result[0].district);
                setCountry(result[0].country);
            });
        }

    }, [host,id,addressId,addressid]);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/update_customer_address/${addressId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }
    function deleteaddress(){
        fetch(`http://${host}:5000/delete_customer_address/${addressId}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            setAddress("");
        });
    }
    //define all the required input fields for edit corresponding data
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Update Address"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                        <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                        <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                        <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                        <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                        <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update address</Button>
                        <Button mode="contained" color='red' style={styles.button} onPress={()=>deleteaddress()}>delete address</Button>
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
    button: {
        marginTop: '2%',
    }
}); 
