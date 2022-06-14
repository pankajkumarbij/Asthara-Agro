import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme, Menu } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
export default function Add_vendor_Address({ navigation }) {
    //initialize all required state variables
    const [vendorId, setVendorId] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState("Choose Landmark");
    const [landmarks, setLandmarks] = useState();
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [host, setHost] = useState('');
    const [visible1, setVisible1] = useState(false);

    let history = useHistory();
    //fetch login user information for store corresponding the address data
    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((vendorid) => {
                setVendorId(vendorid);
            })
        }
        fetchData();
        if (Platform.OS === 'android'){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
    }, [host, vendorId]);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/create_vendor_address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                vendorId: vendorId,
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
            history.push('/vendors_additem');
        }); 
    }

    function getAddress(pincode){
        setPincode(pincode);
        axios.get('https://api.postalpincode.in/pincode/'+pincode)
        .then(res => {
            console.log(res.data[0].PostOffice);
            setLandmarks(res.data[0].PostOffice);
            setDistrict(res.data[0].PostOffice[0].District);
            setState(res.data[0].PostOffice[0].State);
            setCountry(res.data[0].PostOffice[0].Country);
        }).catch(err => console.log(err))
    }

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    //define all the required input fields
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title titleStyle={styles.title} title="Add Address"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => getAddress(pincode)} />
                        <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                        <Menu
                            visible={visible1}
                            onDismiss={closeMenu1}
                            anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={openMenu1}>{landmark}</Button>}>
                            {landmarks ?
                                landmarks.map((item)=>{
                                    return (
                                        <>
                                        <Menu.Item title={item.Name} onPress={()=>setLandmark(item.Name)}/>
                                        </>
                                    )
                                })
                                :
                                <Menu.Item title="No Landmarks are available" />
                            }
                        </Menu>
                        <TextInput style={styles.input} mode="outlined" label="District" value={district}/>
                        <TextInput style={styles.input} mode="outlined" label="State" value={state}/>
                        <TextInput style={styles.input} mode="outlined" label="Country" value={country}/>
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add address</Button>
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
                // textAlign: 'center',
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
