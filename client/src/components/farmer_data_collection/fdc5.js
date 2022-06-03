import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView,Text } from 'react-native';
import { Provider, DefaultTheme, Button, Card,Checkbox } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { url } from '../../utils/url';
import axios from 'axios';
//import CheckBox from '@react-native-community/checkbox';
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function FarmerCheckBox( { navigation, route },props) {

    var id = '';
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [RainFed, setRainFed] = useState(false);
    const [Canal, setCanal] = useState(false);
    const [Borwall, setBorwall] = useState(false);
    const [APMC, setAPMC] = useState(false);
    const [PrivateMandi, setPrivateMandi] = useState(false);
    const [ContractFarming, setContractFarming] = useState(false);
    const [Bank, setBank] = useState(false);
    const [Private, setPrivate] = useState(false);
    const [Declaration, setDeclaration] = useState(false);

    let history = useHistory();

    function submitForm() {
        axios.put(url + '/update_fdc_checks/'+id, {
            rain_fed: RainFed,
            canal: Canal,
            borewell: Borwall,
            apmc: APMC,
            private_mandi: PrivateMandi,
            contract_formin: ContractFarming,
            bank: Bank,
            private: Private,
            declaration: Declaration,
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "successfully saved") {
                if (Platform.OS == 'android') {
                   navigation.navigate('Home');
                }
                else {
                    history.push('/');
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
        if (Platform.OS == 'android') {
            navigation.navigate('Home');
         }
    }

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <Card style={styles.card} >
                        <View >
                        <View style={styles.divbox}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}> Sources of irrigation</Text>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={RainFed}
                                        onValueChange={setRainFed} 
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>RainFed</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={Canal}
                                        onValueChange={setCanal}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Canal</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={Borwall}
                                        onValueChange={setBorwall}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Borwall</Text>
                                </View>
                            </View>
                            <View style={styles.divbox}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}>Market Information</Text>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={APMC}
                                        onValueChange={setAPMC}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>APMC</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={PrivateMandi}
                                        onValueChange={setPrivateMandi}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Private Mandi</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={ContractFarming}
                                        onValueChange={setContractFarming}
                                        style={styles.checkbox}
                                    /> 
                                      <Text style={styles.label}>Contract Farming</Text>
                                </View>
                            </View>
                            <View style={styles.divbox}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}>Input Management</Text>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={Bank}
                                        onValueChange={setBank}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>APMC</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <CheckBox
                                        value={Private}
                                        onValueChange={setPrivate}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Private Mandi</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline',marginTop:20}}>Declaration</Text>
                            <View style={styles.checkboxContainer}>
                                <CheckBox
                                    value={Declaration}
                                    onValueChange={setDeclaration}
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Consent to availability of above land for cultivation inder Sahayoga Krishi</Text>
                            </View>

                        </View>
                        <Button mode="contained" style={styles.button} onPress={() => submitForm()}>Submit</Button>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: '4%',
        alignSelf: 'center',
        ...Platform.select({
            ios: {

            },
            android: {
                width: '90%',
            },
            default: {
                width: '50%',
            }
        })
    },
    datatable: {
        alignSelf: 'center',
        marginTop: '2%',
        marginBottom: '2%',
        padding: '2%',
        ...Platform.select({
            ios: {

            },
            android: {
                width: '90%',

            },
            default: {
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
            }
        })
    },
    divbox:{
        ...Platform.select({
            ios:{

            },
            android:{
               flexDirection: "column",
               flexWrap:'wrap',           
               textAlign: "center",
               minWidth: "90%",
               margin:10


            },
            default:{
                flexDirection: "row",

            }
        })

    },
    checkboxContainer: {
        ...Platform.select({
            ios:{

            },
            android:{
               flexDirection: "row"
              
 
            },
            default:{
                flexDirection: "row",

            }
        })

    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin:10,
    },
    error: {
        color: 'red',
    }
}); 
