import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView,Text } from 'react-native';
import { Provider, DefaultTheme, Button, Card, Checkbox } from 'react-native-paper';
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

export default function FarmerCheckBox({ navigation, route }, props) {

    var id = '';
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [RainFed, setRainFed] = useState(true);
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
                                    <Checkbox
                                        status={RainFed ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setRainFed(!RainFed);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>RainFed</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={Canal ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setCanal(!Canal);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Canal</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={Borwall ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setBorwall(!Borwall);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Borwall</Text>
                                </View>
                            </View>
                            <View style={styles.divbox}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}>Market Information</Text>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={APMC ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setAPMC(!APMC);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>APMC</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={PrivateMandi ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setPrivateMandi(!PrivateMandi);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Private Mandi</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={ContractFarming ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setContractFarming(!ContractFarming);
                                        }}
                                        style={styles.checkbox}
                                    /> 
                                      <Text style={styles.label}>Contract Farming</Text>
                                </View>
                            </View>
                            <View style={styles.divbox}>
                                <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}>Input Management</Text>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={Bank ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setBank(!Bank);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>APMC</Text>
                                </View>
                                <View style={styles.checkboxContainer}>
                                    <Checkbox
                                        status={Private ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setPrivate(!Private);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.label}>Private Mandi</Text>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline',marginTop:20}}>Declaration</Text>
                            <View style={styles.checkboxContainer}>
                                <Checkbox
                                    status={Declaration ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setDeclaration(!Declaration);
                                    }}
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
