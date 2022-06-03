import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react';
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

export default function FarmerEquipmentTable({ navigation, route }, props) {

    var id = '';
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [Items, setItems] = useState([{ sr: '', equipment: '', Rent: '' }]);
    let history = useHistory();
    
    const ItemChange = (index, newsr, newequipment, newrent) => {
        if (newsr != '') {
            let value = [...Items];
            value[index].sr = newsr;
            setItems(value);
        }
        else if (newequipment != '') {
            let value = [...Items];
            value[index].equipment = newequipment;
            setItems(value);
        }
        else {
            let value = [...Items];
            value[index].Rent = newrent;
            setItems(value);
        }
    };

    const handleAddFields = () => {
        var values = [...Items];
        values.push([{ sr: '', equipment: '', Rent: '' }]);
        setItems(values);
        console.log(Items);

    };

    const handleRemoveFields = index => {
        if(index>=0)
        {
         var values = [...Items];
          values.splice(index, 1);
        setItems(values);
        console.log(Items);
        
        }
    };


    function submitForm() {
        axios.put(url + '/update_fdc_em_info/'+id, {
            Item: Items
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "successfully saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('FarmerCheckBox',{id:id});
                }
                else {
                    history.push('/farmercheckbox/'+id);
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
                            <Card.Title titleStyle={styles.title} title="Equipment & Mechinary" />
                            <Card.Content>
                                {Items.map((it, index) => (
                                    <View>
                                        <TextInput style={styles.input} mode="outlined" label="Sr No." value={it.sr} maxLength={6} onChangeText={(text) => ItemChange(index, text, '', '')} />
                                        <TextInput style={styles.input} mode="outlined" label="Equipment details" value={it.equipment} maxLength={6} onChangeText={(text) => ItemChange(index, '', text, '')} />
                                        <TextInput style={styles.input} mode="outlined" label="Rent/own" value={it.Rent} maxLength={6} onChangeText={(text) => ItemChange(index, '', '', text)} />


                                        <View style={{ flexDirection: 'row' }}>
                                            {Platform.OS == "android" ?
                                                <>
                                                    <FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} onPress={() => handleRemoveFields(index)} />
                                                    <FontAwesomeIcon icon={faPlusCircle} onPress={() => handleAddFields()} color={'green'} size={30} />
                                                </>
                                                :
                                                <>
                                                    <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} /></Button>
                                                    <Button onPress={() => handleAddFields()} mode="outlined"><FontAwesomeIcon icon={faPlusCircle} color={'green'} size={30} /></Button>
                                                </>
                                            }

                                        </View>
                                    </View>
                                ))}
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
