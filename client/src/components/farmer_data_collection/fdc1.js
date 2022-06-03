import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { url } from '../../utils/url';
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

export default function BackgroundInfo({ navigation }) {
    const [name, setname] = useState('');
    const [fathername, setfathername] = useState('');
    const [village, setvillage] = useState('');
    const [totalland, settotalland] = useState('');
    const [soiltype, setsoiltype] = useState('');
    const [fpo, setfpo] = useState('');
    const [contact, setcontact] = useState('');

    let history = useHistory();

    function submitForm() {
        axios.post(url + '/create_fdc', {
            name: name,
            father_name: fathername,
            village: village,
            fpo: fpo,
            contact_number: contact,
            total_land_in_acres: totalland,
            soil_type: soiltype,
            date: Date.now(),
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "Successfully Saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('FarmerTable',{id:response.data.data._id});
                }
                else {
                    history.push('/farmertable/'+response.data.data._id);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={styles.card} >
                            <Card.Title titleStyle={styles.title} title="Personal Information" />
                            <Card.Content>
                                <View>
                                    <TextInput style={styles.input} mode="outlined" label="Name" value={name} onChangeText={(text) => setname(text)} />
                                    <TextInput style={styles.input} mode="outlined" label="Father Name" value={fathername} onChangeText={(text) => setfathername(text)} />
                                    <TextInput style={styles.input} mode="outlined" label="Total Land in acers" value={totalland} onChangeText={(text) => settotalland(text)} />
                                    <TextInput style={styles.input} mode="outlined" label="Village" value={village} onChangeText={(text) => setvillage(text)} />
                                    <TextInput style={styles.input} mode="outlined" label="Soil Type" value={soiltype} onChangeText={(text) => setsoiltype(text)} />
                                    <TextInput style={styles.input} mode="outlined" label="FPO" value={fpo} onChangeText={(text) => setfpo(text)} />
                                    <TextInput style={styles.input} mode="outlined" label="Contact No" value={contact} maxLength={10} onChangeText={(text) => setcontact(text)} />
                                </View>
                                <Button mode="contained" style={styles.button} onPress={() => submitForm()}>Submit</Button>
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
