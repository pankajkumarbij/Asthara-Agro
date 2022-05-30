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

export default function FarmerLandInfo(props, { navigation, route }) {

    var id = "";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    var [Items, setItems] = useState([{ sr: '', CropGrowth: '', Longitude: '', Latitude: '', area: '' }]);
    let history = useHistory();

    const ItemChange = (index, newsr, newcrop, newLongitude, newLatitude, newarea) => {
        if (newsr != '') {
            let value = [...Items];
            value[index].sr = newsr;
            setItems(value);
        }
        else if (newcrop != '') {
            let value = [...Items];
            value[index].CropGrowth = newcrop;
            setItems(value);
        }
        else if (newLongitude != '') {
            let value = [...Items];
            value[index].Longitude = newLongitude;
            setItems(value);
        }
        else if (newLatitude != '') {
            let value = [...Items];
            value[index].Latitude = newLatitude;
            setItems(value);
        }
        else {
            let value = [...Items];
            value[index].area = newarea;
            setItems(value);
        }
    };

    const handleAddFields = () => {
        var values = [...Items];
        values.push([{ sr: '', CropGrowth: '', Longitude: '', Latitude: '', area: '' }]);
        setItems(values);
        console.log(Items);
    };

    const handleRemoveFields = index => {
       var values = [...Items];
        values.splice(index, 1);
        setItems(values);
        console.log(Items);
    };

    function submitForm() {
        axios.put(url + '/update_fdc_land_info/'+id, {
            Item: Items
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "successfully saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('AllCustomerPools');
                }
                else {
                    history.push('/farmerequipmenttable/'+id);
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
                            <Card.Title titleStyle={styles.title} title="Land Information" />
                            <Card.Content>
                                {Items.map((it, index) => (
                                    <View>
                                        <TextInput style={styles.input} mode="outlined" label="Sr No." value={it.sr} maxLength={6} onChangeText={(text) => ItemChange(index, text, '', '', '', '')} />
                                        <TextInput style={styles.input} mode="outlined" label="Crop Grown in this land(from above)" value={it.CropGrowth} maxLength={6} onChangeText={(text) => ItemChange(index, '', text, '', '', '')} />
                                        <TextInput style={styles.input} mode="outlined" label="Longitude" value={it.Longitude} maxLength={6} onChangeText={(text) => ItemChange(index, '', '', text, '', '')} />
                                        <TextInput style={styles.input} mode="outlined" label="Latitude" value={it.Latitude} maxLength={6} onChangeText={(text) => ItemChange(index, '', '', '', text, '')} />
                                        <TextInput style={styles.input} mode="outlined" label="Max area in acers" value={it.area} maxLength={6} onChangeText={(text) => ItemChange(index, '', '', '', '', text)} />


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
