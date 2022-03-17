import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform,ScrollView} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme, Searchbar, Menu } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { all_users_by_role } from '../../services/user_api';
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

//define add address component
export default function Add_customer_Address({ navigation }) {
    //initialize all required state variables
    const [visible2, setVisible2] = useState(false);
    let history = useHistory();
    const [searchQuery2, setSearchQuery2] = useState('');
    const [customerId, setCustomerId] = useState('');
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [host, setHost] = useState('');
    const [customer, setCustomer] = useState();
    const [customerEmail, setCustomerEmail] = useState("Choose customer");
    //fetch login user information for store corresponding the address data
    useEffect(() => {

        if (Platform.OS === 'android'){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        all_users_by_role("customer")
        .then(result => {
            setCustomer(result);
        })

    }, [host]);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/create_customer_address`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customerId: customerId,
                customerEmail: customerEmail,
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
            if(Platform.OS == "android"){
                navigation.navigate('All_customer_Addresses');
            }
            else{
               
                history.push('/customer_all_addresses');
            }
        }); 
    }

    const CustomerChange = (id, email) => {
        setCustomerEmail(email);
        setCustomerId(id);
        closeMenu2();
    };

    const onChangeSearch2 = query => setSearchQuery2(query);

    //define all the required input fields
    return (
        <Provider theme={theme}>
            <ScrollView>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title titleStyle={styles.title} title="Add Customer Address"/>
                    <Card.Content>
                        <Menu
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={openMenu2}>{customerEmail}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch2}
                                value={searchQuery2}
                            />
                            {customer ?
                                customer.map((item)=>{
                                    if(item.email.toUpperCase().search(searchQuery2.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                        return (
                                            <>
                                            <Menu.Item title={item.email+" ( "+item.full_name+" ) "} onPress={()=>CustomerChange(item._id, item.email)}/>
                                            </>
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No Customers are available" />
                            }
                        </Menu>
                        <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                        <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                        <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                        <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                        <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                        <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add address</Button>
                    </Card.Content>
                </Card>
            </View>
            </ScrollView>
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