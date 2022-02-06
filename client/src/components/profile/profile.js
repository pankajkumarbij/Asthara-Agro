import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, Text, SafeAreaView, ScrollView, Image} from 'react-native';
import { Card, Provider, DefaultTheme, Button, TextInput } from 'react-native-paper';
import { Link } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { users_by_id, user_address, user_bank } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Profile({ navigation }) {

    const [userId, setUserId] = useState('');
    const [user, setUser] = useState();
    const [address, setAddress] = useState();
    const [bank, setBank] = useState();
    const [host, setHost] = useState("");

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
        }
        fetchData();

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        if(userId){
            //Retrieve user by userId
            users_by_id(userId)
            .then(result => {
                setUser(result[0]);
            })

            user_address(userId)
            .then(result => {
                setAddress(result[0]);
            })

            user_bank(userId)
            .then(result => {
                setBank(result[0]);
            })
        }

    }, [user, address, bank, host, userId]);

    function deleteaddress(id){
        fetch(`http://${host}:5000/delete_address/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            setAddress("");
        });  
    }

    function deletebank(id){
        fetch(`http://${host}:5000/delete_bank/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            setBank("");
        });  
    }
    
    const StatusChange = (s) => {
        fetch(`http://${host}:5000/send_delete_account_remark/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                remark: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        });
        // closeMenu(index);
    }; 

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: '2%' }}>
                <Card style={styles.card}>
                    {user &&
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <Card.Title style={{ flex: 2,}} title="USER Details:-"/>
                            <Button>
                                <Link to={"/edituser/"+user._id}>
                                    <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                </Link>
                            </Button>
                        </View>
                        <Card.Content>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex:1, marginTop: '2%', }}>
                                    {user.image ?
                                            <Image
                                                style={{width: 200, height: 210, border: '1px solid black'}}
                                                source={user.image}
                                            />
                                        :
                                            <Text>No Image</Text>
                                    }
                                </View>
                                <View style={{ flex:3, }}>
                                    <TextInput style={styles.input} mode="outlined" label="User Category" value={user.role} />
                                    <TextInput style={styles.input} mode="outlined" label="Full Name" value={user.full_name} />
                                    <TextInput style={styles.input} mode="outlined" label="Email" value={user.email} />
                                </View>
                            </View>
                            <TextInput style={styles.input} mode="outlined" label="Mobile No" value={user.mobile_no} />
                            <TextInput style={styles.input} mode="outlined" label="ID Type" value={user.idType} />
                            <TextInput style={styles.input} mode="outlined" label="ID Number" value={user.idNumber} />
                            <TextInput style={styles.input} mode="outlined" label="Gst No" value={user.gst_no} />
                        </Card.Content>
                    </>
                    }
                </Card>
                <Card style={styles.card}>
                    {address ?
                    <>
                        <View style={{ flexDirection: 'row'}}>
                            <Card.Title style={{ flex: 2,}} title="Address:-"/>
                            <Button>
                                <Link to={"/editaddress/"+address._id}>
                                    <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                </Link>
                                <Button onPress={()=>deleteaddress(address._id)} >
                                    <FontAwesomeIcon icon={ faTrash } color="red" size={25} />
                                </Button>
                            </Button>
                        </View>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" label="Address" value={address.address} />
                            <TextInput style={styles.input} mode="outlined" label="Landmark" value={address.landmark} />
                            <TextInput style={styles.input} mode="outlined" label="District" value={address.district} />
                            <TextInput style={styles.input} mode="outlined" label="State" value={address.state} />
                            <TextInput style={styles.input} mode="outlined" label="Country" value={address.country} />
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={address.postal_code} />
                        </Card.Content>
                    </>
                    :
                    <>
                        <Card.Title style={{ flex: 2,}} title="Address:-"/>
                        {Platform.OS=='android' ?
                            <Button mode="contained" style={{padding: '1%', marginTop: '2%'}} onPress={() => {navigation.navigate('AddAddress')}}>Add Address</Button>
                            :
                            <Button mode="contained" style={{padding: '1%', marginTop: '2%'}}><Link to={"/addaddress/"+userId}>Add Address</Link></Button>
                        }
                    </>
                    }
                </Card>
                <Card style={styles.card}>
                    {bank ?
                    <>
                        <View style={{ flexDirection: 'row'}}>
                            <Card.Title style={{ flex: 2,}} title="Bank Details:-"/>
                            <Button>
                                <Link to={"/editbankdetails/"+bank._id}>
                                    <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                </Link>
                            </Button>
                            <Button onPress={()=>deletebank(bank._id)} >
                                <FontAwesomeIcon icon={ faTrash } color="red" size={25} />
                            </Button>
                        </View>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" label="IFSC Code" value={bank.ifsc_code} />
                            <TextInput style={styles.input} mode="outlined" label="Bank Name" value={bank.bank_name} />
                            <TextInput style={styles.input} mode="outlined" label="Branch" value={bank.branch_name} />
                            <TextInput style={styles.input} mode="outlined" label="Account No" value={bank.account_number} />
                            <TextInput style={styles.input} mode="outlined" label="Accounbt Type" value={bank.account_type} />
                            <TextInput style={styles.input} mode="outlined" label="Account Holder Name" value={bank.account_holder_name} />
                        </Card.Content>
                    </>
                    :
                    <>
                        <Card.Title style={{ flex: 2,}} title="Bank Details:-"/>
                        {Platform.OS=='android' ?
                            <Button mode="contained" style={{padding: '1%', marginTop: '2%'}} onPress={() => {navigation.navigate('AddBankDetails')}}>Add Bank Details</Button>
                            :
                            <Button mode="contained" style={{padding: '1%', marginTop: '2%'}}><Link to={"/addbankdetails/"+userId}>Add Bank Details</Link></Button>
                        }
                    </>
                    }
                </Card>
                <Card style={styles.card}>
                    <Card.Title title="Delete Account"/>
                    <Card.Content>
                        {user && 
                            <>
                                <Text style={styles.text1}> {user.remark}</Text>
                            </>
                        }
                    </Card.Content>
                    <Card.Content>    
                        <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("detete account request sent!")}>Delete Account</Button>
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
        paddingBottom: '3%',
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginBottom: '10%',
                width: '90%',
            },
            default: {
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
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
}); 
