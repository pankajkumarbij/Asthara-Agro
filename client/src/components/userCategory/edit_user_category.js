import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditUserCategory(props,{route}) {

    var userCategoryid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.userCategoryid;
    }
    else{
        userCategoryid = props.match.params.userCategoryid;
    }

    const [userCategoryId, setUserCategoryId] = useState("");
    const [userCategoryName, setUserCategoryName] = useState("");
    const [host, setHost] = useState("");
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setUserCategoryId(id);
        }
        else{
            setHost("localhost");
            setUserCategoryId(userCategoryid);
        }
        if(userCategoryId){
            fetch(`http://${host}:5000/retrive_user_category/${userCategoryId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(user => {
                setUserCategoryName(user[0].category_name);
            });
        }
    }, [host,userCategoryId,id,userCategoryid]);

    function submitForm() {
        fetch(`http://${host}:5000/update_user_category/${userCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category_name: userCategoryName,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }
       const StatusChange = (s) => {
        fetch(`http://${host}:5000/disabled_user_category/${userCategoryId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
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
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                {userCategoryName ?
                <Card style={styles.card}>
                    <Card.Title title="Edit User Category"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="User Category Name" value={userCategoryName} onChangeText={userCategoryName => setUserCategoryName(userCategoryName)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update User Category </Button>
                    <Button mode="contained" style={styles.button} color='red' 
                    onPress={()=>StatusChange("disabled")}
                    >Disable User Category</Button>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
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
                width: '50%',
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
