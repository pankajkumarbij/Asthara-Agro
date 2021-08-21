import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import Vendor_details from './vendor_details';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define edit vendor component
export default function EditVendor(props,{route}) {
    //fetch corresponding vendor id for edit the data
    var vendorid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.vendorId;
    }
    else{
        vendorid = props.match.params.vendorid;
    }
    //initialize all required state variables
    const [vendorId, setVendorId] = useState("");
    const [full_name, setFull_name] = useState("");
    const [email, setEmail] = useState("");
    const [gst, setGst] = useState("");
    const [mobile_no, setMobile_no] = useState("");
    const [host, setHost] = useState("");
    //fetch corresponding vendor details for edit
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setVendorId(id);
        }
        else{
            setHost("localhost");
            setVendorId(vendorid);
        }
        if(vendorId){
            fetch(`http://${host}:5000/retrive_vendor/${vendorId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setFull_name(item[0].full_name);
                setEmail(item[0].email);
                setGst(item[0].gst_no);
                setMobile_no(item[0].mobile_no);
            });
        }
    }, [host,vendorId,id,vendorid]);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/update_vendor/${vendorId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                full_name:full_name,
                email:email,
                mobile_no:mobile_no,
                gst_no:gst,
                
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }
    //define all the required input fields
    return (
        <Provider theme={theme}>
            <ScrollView keyboardDismissMode="interactive" >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={styles.card}>
                        <Card.Title title="UPDATE VENDOR"/>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" type="text" label="Enter your full name" value={full_name} onChangeText={fullname=>setFull_name(fullname)} />
                            <TextInput style={styles.input} mode="outlined" type="email" label="Enter email" value={email} onChangeText={email=>setEmail(email)} />
                            <TextInput style={styles.input} mode="outlined" type="number" label="enter mobile number" value={mobile_no} onChangeText={mobile_no=>setMobile_no(mobile_no)} />
                            <TextInput style={styles.input} mode="outlined" label="enter GST number" type="text" value={gst} onChangeText={gst_no=>setGst(gst_no)} />
                            <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Vendor Details</Button>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </Provider>
    );
};
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
                width: '50%',
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
