import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { users_by_id } from '../../services/user_api';
import { url } from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

//define add address component
export default function AddAddress({navigation,route},props) {

    var userid="";
    if(Platform.OS=="android"){
        userid = route.params.userid;
    }
    else{
        userid = props.match.params.userid;
    }

    let history = useHistory();

    //initialize all required state variables
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [host, setHost] = useState('');
    const [role, setRole] = useState();
    const [Email, setEmail] = useState('');
    //fetch login user information for store corresponding the address data
    useEffect(() => {
        if(userid){
            setUserId(userid);
        }

        if (Platform.OS === 'android'){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        users_by_id(userid)
        .then(result => {
            setRole(result[0].role);
            setEmail(result[0].email);
        })

    }, [host, userid]);
    //define a function for sending the data in corresponding database
    function submitForm() {

        if(role=="vendor"){
            fetch(url+`/create_vendor_address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    vendorId: userId,
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
            }); 
        }

        if(role=="customer"){
            fetch(url+`/create_customer_address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId: userId,
                    customerEmail: Email,
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
            }); 
        }

        fetch(url+`/create_address`, {
            method: 'POST',
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
                postal_code: pincode,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            if(Platform.OS=='android')
            {
                navigation.navigate('AddBankDetails',{userid:userId});
            }
            else
            {
                history.push('/addbankdetails/'+userId);
            }
        }); 
    }
    //define all the required input fields
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                <Card.Title titleStyle={styles.title} title="Add Address"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                    <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                    <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                    <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                    <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                    <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Save & Add Bank</Button>
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
        marginBottom: '2%',
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
                marginTop: '1%',
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
