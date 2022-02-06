import React, {useState, useEffect} from 'react';
import { TextInput, DefaultTheme, Card, Button, Provider  } from 'react-native-paper';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Sales_add_customer(){

    const [fullname,setFullname] = useState("");
    const [nickname,setNickname] = useState("");
    const [email,setEmail] = useState("");
    const [mobile_no,SetMobile_no] = useState("");
    const [gst_no,setGst_no] = useState("");
    const [password,setPassword] = useState("");
    const [confirm_password,setConfirm_password] = useState("");
    const [category,setCategory] = useState("");
    const [role,setRole]=useState("");


    useEffect(() => {
        fetch('http://localhost:5000/retrive_user_category_type/customer', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data =>{
            setCategory(data[0]._id);
            setRole(data[0].category_name);
        });
    }, []);

    function submitForm(){
        fetch('http://localhost:5000/create_user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category:category,
                full_name:fullname,
                nick_name:nickname,
                email:email,
                mobile_no:mobile_no,
                gst_no:gst_no,
                password:password,
                role:role,
                confirm_password:confirm_password,
            })
        })
        .then(res => res.json())
        .then(data => console.log(data)); 
        setFullname("");
        setNickname("");
        setEmail("");
        SetMobile_no("");
        setGst_no("");
        setPassword("");
        setConfirm_password("");
    }

    return (
        <Provider theme={theme}>
            <ScrollView keyboardDismissMode="interactive" >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Card style={styles.card}>
                        <Card.Title title="ADD CUSTOMER"/>
                        <Card.Content>
                            <TextInput style={styles.input} mode="outlined" type="text" label="Enter full name" value={fullname} onChangeText={fullname=>setFullname(fullname)} />
                            <TextInput style={styles.input} mode="outlined" type="text" label="Enter nick name" value={nickname} onChangeText={nickname=>setNickname(nickname)} />
                            <TextInput style={styles.input} mode="outlined" type="email" label="Enter email" value={email} onChangeText={email=>setEmail(email)} />
                            <TextInput style={styles.input} mode="outlined" type="number" label="enter mobile number" value={mobile_no} onChangeText={mobile_no=>SetMobile_no(mobile_no)} />
                            <TextInput style={styles.input} mode="outlined" label="enter GST number" type="text" value={gst_no} onChangeText={gst_no=>setGst_no(gst_no)} />
                            <TextInput style={styles.input} mode="outlined" type="text" label="Password" value={password} onChangeText={password=>setPassword(password)} secureTextEntry={true} />
                            <TextInput style={styles.input} mode="outlined" type="text" label="confirm Password" value={confirm_password} onChangeText={confirm_password=>setConfirm_password(confirm_password)} secureTextEntry={true} />
                            <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Customer</Button>
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
        </Provider>
    );
};
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
