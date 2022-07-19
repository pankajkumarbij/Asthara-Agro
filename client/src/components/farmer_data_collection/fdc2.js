import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text, Keyboard ,TouchableWithoutFeedback} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button } from 'react-native-paper';
import { Route, useHistory } from 'react-router-dom';
import { url } from '../../utils/url';
import axios from 'axios';
import { fdc_by_id } from '../../services/fdc';

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
  
    var id = '';
    if (Platform.OS =='android') {
         id=route.params.id;

    }
    else {
         id= props.match.params.id;
    }

    const [Items, setItems] = useState([{cropname: '', cropdetail: '', cultivationarea: '', totalqty: '', seedused: '', seedtype: '', Fertilizeruse: '', Pesticidesuse: '', croptimeframe: '' }]);
    let history = useHistory();
    const [cropnmeError, setcropnmeError]=useState(['']);
    const [cropdtError, setcropdtError]=useState(['']);
    const [cultivationareaError, setcultivationareaError]=useState(['']);
    const [totalqtyError, settotalqtyError]=useState(['']);
    const [seedusedError, setseedusedError]=useState(['']);
    const [seedtypeError, setseedtypeError]=useState(['']);
    const [ferError, setferError]=useState(['']);
    const [pesError, setpesError]=useState(['']);
    const [croptimeError, setcroptimeError]=useState(['']);
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        if(id && flag){
            fdc_by_id(id)
            .then(result => {
                if(result[0].crop_info){
                    setItems(result[0].crop_info);
                }
                setFlag(false);
            })
        }
    },[id, flag])

    const ItemChange2 = (index, newcropname) => {

        var error=[...cropnmeError];
        if(newcropname.length==0)
        {
            error[index]= "required";
            setcropnmeError(error);

        }
        else
        {
            error.splice(index, 1);
            setcropnmeError(error);
        }
        var value = [...Items];
        value[index].cropname =newcropname;
        setItems(value);


    }
    const ItemChange3 = (index, newcropdetail) => {
        var error=[...cropdtError];
        if(newcropdetail.length==0)
        {
            error[index]= "required";
            setcropdtError(error);

        }
        else
        {
            error.splice(index, 1);
            setcropdtError(error);
        }
     
        var value = [...Items];
        value[index].cropdetail =newcropdetail;
        setItems(value);
    }
    const ItemChange4 = (index, newcultivationarea) => {
     
        
        const error = [...cultivationareaError];
        const values = [...Items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{1,}/;
        if(newcultivationarea.length==0)
        {
            error[index]="required";
            setcultivationareaError(error);
        }
        else if(!numberRegex.test(newcultivationarea)){
            error[index]= "No. Only Should be Numeric";
            setcultivationareaError(error);
        }
        else{
            error.splice(index, 1);
            setcultivationareaError(error);
        }
        values[index].cultivationarea = newcultivationarea.replace(/[^0-9]/g, '');
        setItems(values);
    }
    const ItemChange5 = (index, newtotalqty) => {
     
        const error = [...totalqtyError];
        const values = [...Items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{1,}/;
        if(newtotalqty.length==0)
        {
            error[index]="required";
            settotalqtyError(error);
        }
        else if(!numberRegex.test(newtotalqty)){
            error[index]= "No. Only Should be Numeric";
            settotalqtyError(error);
        }
        else{
            error.splice(index, 1);
            settotalqtyError(error);
        }
        values[index].totalqty = newtotalqty.replace(/[^0-9]/g, '');
        setItems(values);
    }    
    const ItemChange6= (index, newseedused) => {

        const error=[...seedusedError];
        if(newseedused.length==0)
        {
            error[index]="required";
            setseedusedError(error);
        }
        else{
            error.splice(index, 1);
            setseedusedError(error);

        }

     
        var value = [...Items];
        value[index].seedused =newseedused;
        setItems(value);
    }
    const ItemChange7= (index, newseedtype) => {
        const error=[...seedtypeError];
        if(newseedtype.length==0)
        {
            error[index]="required";
            setseedtypeError(error);
        }
        else{
            error.splice(index, 1);
            setseedtypeError(error);

        }
    
        var value = [...Items];
        value[index].seedtype =newseedtype;
        setItems(value);
    }
    const ItemChange8= (index, newFertilizeruse) => {
        const error=[...ferError];
        if(newFertilizeruse.length==0)
        {
            error[index]="required";
            setferError(error);
        }
        else{
            error.splice(index, 1);
            setferError(error);

        }
     
        var value = [...Items];
        value[index].Fertilizeruse =newFertilizeruse;
        setItems(value);
    }
    const ItemChange9= (index, newPesticidesuse) => {
        const error=[...pesError];
        if(newPesticidesuse.length==0)
        {
            error[index]="required";
            setpesError(error);
        }
        else{
            error.splice(index, 1);
            setpesError(error);

        }
     
        var value = [...Items];
        value[index].Pesticidesuse =newPesticidesuse;
        setItems(value);
    }
    const ItemChange10= (index, newcroptimeframe) => {
        const error=[...croptimeError];
        if(newcroptimeframe.length==0)
        {
            error[index]="required";
            setcroptimeError(error);
        }
        else{
            error.splice(index, 1);
            setcroptimeError(error);

        }
     
     
        var value = [...Items];
        value[index].croptimeframe =newcroptimeframe;
        setItems(value);
    }

    const handleAddFields = () => {
        var values = [...Items];
        values.push({cropname: '', cropdetail: '', cultivationarea: '', totalqty: '', seedused: '', seedtype: '', Fertilizeruse: '', Pesticidesuse: '', croptimeframe: '' });
        setItems(values);
    };

    const handleRemoveFields = index => {
        var values = [...Items];
        values.splice(index, 1);
        setItems(values);

    };

    function submitForm() {
        axios.put(url + '/update_fdc_crop_info/' + id, {
            Items: Items
        })
            .then(function (response) {
                //alert(response.data.msg);
                if (response.data.msg == "successfully saved") {
                    if (Platform.OS == 'android') {
                        navigation.navigate('FarmerLandInfo',{id:id});
                    }
                    else {

                        history.push('/farmerlandinfo/' + id);
                    }
                }
               if (Platform.OS == 'android') {
                    navigation.navigate('FarmerLandInfo',{id:id});
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    function submitError(){
        alert("All Field required");
    }

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={styles.card} >
                            <Card.Title titleStyle={styles.title} title="Crop Information(Growth in last 3 years)" />
                            <Card.Content>
                                {Items && Items.map((it, index) => (
                                    <View>
                                        <TextInput style={styles.input} mode="outlined" label="Crop Name" value={it.cropname} maxLength={60} onChangeText={(text) => ItemChange2(index, text)} />
                                        {cropnmeError[index] ?
                                        <Text style={{color: "red"}}>{cropnmeError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Crop details" value={it.cropdetail} maxLength={60} onChangeText={(text) => ItemChange3(index, text)} />
                                        {cropdtError[index] ?
                                        <Text style={{color: "red"}}>{cropdtError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="cultivation area" value={it.cultivationarea} maxLength={60} onChangeText={(text) => ItemChange4(index, text)} />
                                        {cultivationareaError[index] ?
                                        <Text style={{color: "red"}}>{cultivationareaError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="total qty" value={it.totalqty} maxLength={60} onChangeText={(text) => ItemChange5(index, text)} />
                                        {totalqtyError[index] ?
                                        <Text style={{color: "red"}}>{totalqtyError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Seed used" value={it.seedused} maxLength={60} onChangeText={(text) => ItemChange6(index, text)} />
                                        {seedusedError[index] ?
                                        <Text style={{color: "red"}}>{seedusedError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Seed Type" value={it.seedtype} maxLength={60} onChangeText={(text) => ItemChange7(index, text)} />
                                        {seedtypeError[index] ?
                                        <Text style={{color: "red"}}>{seedtypeError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Fertilizer use" value={it.Fertilizeruse} maxLength={60} onChangeText={(text) => ItemChange8(index, text)} />
                                        {ferError[index] ?
                                        <Text style={{color: "red"}}>{ferError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Pesticides use" value={it.Pesticidesuse} maxLength={60} onChangeText={(text) => ItemChange9(index, text)} />
                                        {pesError[index] ?
                                        <Text style={{color: "red"}}>{pesError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="crop time frame" value={it.croptimeframe} maxLength={60} onChangeText={(text) => ItemChange10(index, text)} />
                                        {croptimeError[index] ?
                                        <Text style={{color: "red"}}>{croptimeError[index]}</Text> :<></>
                                         }
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
                               {cropnmeError.length==0 && cropdtError.length==0 && cultivationareaError.length==0
                               && totalqtyError.length==0 && seedusedError.length==0 && seedtypeError.length==0
                               && ferError.length==0 && pesError.length==0 && croptimeError.length==0?
                                <Button mode="contained" style={styles.button} onPress={() => submitForm()}>Submit</Button>:
                                <Button mode="contained" style={styles.button} onPress={() => submitError()}>Submit</Button>
                               }
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