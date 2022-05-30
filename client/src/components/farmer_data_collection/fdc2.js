import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
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

export default function FarmerTable(props, { navigation, route }) {

    var id = "";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [Items, setItems] = useState([{sr:'',cropname:'',cropdetail:'',cultivationarea:'',totalqty:'',seedused:'',seedtype:'',Fertilizeruse:'',Pesticidesuse:'',croptimeframe:''}]);
    let history = useHistory();

    const ItemChange1 = (index,newsr,newcropname,newcropdetail,newcultivationarea,newtotalqty,newseedused,newseedtype,newFertilizeruse,newPesticidesuse,newcroptimeframe) => {
        if(newsr!='')
        {
          let value=[...Items];
          value[index].sr= newsr; 
          setItems(value);
        }
        else if(newcropname!='')
        {
            let value=[...Items];
            value[index].cropname=newcropname; 
            setItems(value);
        }
        else if(newcropdetail!='')
        {
            let value=[...Items];
            value[index].cropdetail=newcropdetail;
            setItems(value);

        }
        else if(newcultivationarea!='')
        {
            let value=[...Items];
            value[index].cultivationarea=newcultivationarea;
            setItems(value);

        }
        else if(newtotalqty!='')
        {
            let value=[...Items];
            value[index].totalqty=newtotalqty
            setItems(value);
        }
        else if(newseedused!='')
        {
            let value=[...Items];
            value[index].seedused=newseedused
            setItems(value);
        }        
        else if(newseedtype!='')
        {
            let value=[...Items];
            value[index].seedtype=newseedtype
            setItems(value);

        }
        else if(newcropname!='')
        {
            let value=[...Items];
            value[index].cropname=newcropname
            setItems(value);
        }
        else if(newFertilizeruse!='')
        {
            let value=[...Items];
            value[index].Fertilizeruse=newFertilizeruse
            setItems(value);
        }
        else if(newPesticidesuse!='')
        {
            let value=[...Items];
            value[index].Pesticidesuse=newPesticidesuse
            setItems(value);
        }
        else if(newcroptimeframe!='')
        {
            let value=[...Items];
            value[index].croptimeframe=newcroptimeframe
            setItems(value);
        }
    };

    const handleAddFields = () => {
        var values = [...Items];
        values.push([{sr:'',cropname:'',cropdetail:'',cultivationarea:'',totalqty:'',seedused:'',seedtype:'',Fertilizeruse:'',Pesticidesuse:'',croptimeframe:''}]);
        setItems(values);
    };

    const handleRemoveFields = index => {
        var values = [...Items];
        values.splice(index, 1);
        setItems(values);
        
    };

    function submitForm() {
        axios.put(url + '/update_fdc_crop_info/'+id, {
            Items: Items
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "successfully saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('AllCustomerPools');
                }
                else {
                    history.push('/farmerlandinfo/'+id);
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
                            <Card.Title titleStyle={styles.title} title="Crop Information(Growth in last 3 years)" />
                            <Card.Content>
                            {Items.map((it,index) => (

                                    <View>
                                        <TextInput style={styles.input} mode="outlined" label="Sr No" value={it.sr} maxLength={6} onChangeText={(text) => ItemChange1(index,text,'','','','','','','','','')}/>
                                        <TextInput style={styles.input} mode="outlined" label="Crop Name" value={it.cropname} maxLength={60} onChangeText={(text) =>ItemChange1(index,'',text,'','','','','','','','') } />
                                        <TextInput style={styles.input} mode="outlined" label="Crop details" value={it.cropdetail} maxLength={60} onChangeText={(text) =>ItemChange1(index,'','',text,'','','','','','','')} />
                                        <TextInput style={styles.input} mode="outlined" label="cultivationarea"value={it.cultivationarea} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','',text,'','','','','','')} />
                                        <TextInput style={styles.input} mode="outlined" label="totalqty" value={it.totalqty} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','','',text,'','','','','')} />
                                        <TextInput style={styles.input} mode="outlined" label="Seed used" value={it.seedused} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','','','',text,'','','','')} />
                                        <TextInput style={styles.input} mode="outlined" label="Seed Type" value={it.seedtype} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','','','','',text,'','','')} />
                                        <TextInput style={styles.input} mode="outlined" label="Fertilizeruse" value={it.Fertilizeruse} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','','','','','',text,'','')} />
                                        <TextInput style={styles.input} mode="outlined" label="Pesticidesuse" value={it.Pesticidesuse} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','','','','','','',text,'')} />
                                        <TextInput style={styles.input} mode="outlined" label="croptimeframe"value={it.croptimeframe} maxLength={60} onChangeText={(text) => ItemChange1(index,'','','','','','','','','',text)} />
                                        <View style={{ flexDirection: 'row' }}>
                                            {Platform.OS == "android" ?
                                                <>
                                                    <FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} onPress={() => handleRemoveFields(index)} />
                                                    <FontAwesomeIcon icon={faPlusCircle} onPress={() => handleAddFields()} color={'green'} size={30} />
                                                </>
                                                :
                                                <>
                                                    <Button onPress={ () => handleRemoveFields(index) } mode="outlined"><FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} /></Button>
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