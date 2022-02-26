import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, Image, Text } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme, Button } from 'react-native-paper';
import { Link, useParams } from 'react-router-dom';
import { users_by_id, user_address, user_bank, user_category} from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewUser( {route}) {

    var userid = "";
    const {userid1} = useParams();
    if(Platform.OS=="android"){
        userid = route.params.userId;
    }
    else{
        userid = userid1;
    }
    
    const [user, setUser] = useState();
    const [address, setAddress] = useState();
    const [bank, setBank] = useState();

    useEffect(() => {

        if(userid){
            //Retrieve user by userId
            users_by_id(userid)
            .then(result => {
                setUser(result[0]);
            })

            user_address(userid)
            .then(result => {
                setAddress(result[0]);
            })

            user_bank(userid)
            .then(result => {
                setBank(result[0]);
            })
        }

    }, [userid]);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
                            <TextInput style={styles.input} mode="outlined" label="Pool Name" value={user.pool_name} />
                            <TextInput style={styles.input} mode="outlined" label="Gst No" value={user.gst_no} />
                        </Card.Content>
                    </>
                    }
                    {address &&
                    <>
                        <View style={{ flexDirection: 'row', marginTop: '2%'}}>
                            <Card.Title style={{ flex: 2,}} title="Address:-"/>
                            <Button>
                                <Link to={"/editaddress/"+address._id}>
                                    <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                </Link>
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
                    }
                    {bank &&
                    <>
                        <View style={{ flexDirection: 'row', marginTop: '2%'}}>
                            <Card.Title style={{ flex: 2,}} title="Bank Details:-"/>
                            <Button>
                                <Link to={"/editbankdetails/"+bank._id}>
                                    <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                                </Link>
                            </Button>
                        </View>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" label="IFSC Code" value={bank.ifsc_code} />
                            <TextInput style={styles.input} mode="outlined" label="Bank Name" value={bank.bank_name} />
                            <TextInput style={styles.input} mode="outlined" label="Branch" value={bank.branch_name} />
                            <TextInput style={styles.input} mode="outlined" label="Account No" value={bank.account_number} />
                            <TextInput style={styles.input} mode="outlined" label="Account Holder Name" value={bank.account_holder_name} />
                            <TextInput style={styles.input} mode="outlined" label="Account Type" value={bank.account_type} />
                        </Card.Content>
                    </>
                    }
                    </Card>
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