import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView,Text } from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
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

export default function FarmerLandInfo( props, { navigation, route }) {
   
    var id = '';
    if (Platform.OS =='android') {
         id=route.params.id;

    }
    else {
         id= props.match.params.id;
    }
   
    var [Items, setItems] = useState([{CropGrowth: 'Choose Crop', Longitude: '', Latitude: '', area: '' }]);
    let history = useHistory();
    var [longError,setlongError]=useState(['']);
    var [latiError,setlatiError]=useState(['']);
    var [latiError,setlatiError]=useState(['']);
    var [areaError,setaraeError]=useState(['']);
    var [cropError,setcropError]=useState(['']);
    const [flag, setFlag] = useState(true);
    const [crop, setCrop] = useState();
    const [visible4, setVisible4] = useState([]);

    useEffect(() => {
        if(id && flag){
            fdc_by_id(id)
            .then(result => {
                if(result[0].land_info){
                    setItems(result[0].land_info);
                    setCrop(result[0].crop_info);
                    {result[0].crop_info.map(crop => {
                        var val= [...visible4];
                        val.push(false);
                        setVisible4(val);
                    })}
                    console.log(result[0].crop_info);
                }
                setFlag(false);
            })
        }
    },[id, flag, visible4])

    const ItemChange2 = (index, newCropGrowth) => {
   
        var value = [...Items];
        const error = [...cropError];

        if(newCropGrowth.length==0)
        {
            error[index]= "required";
            setcropError(error);
        }
        else
        {
            error.splice(index, 1);
            setcropError(error);

        }
        value[index].CropGrowth=newCropGrowth;
        setItems(value);
        closeMenu4(index);
    };

    const ItemChange3= (index, newlongitude) => {
   
        const error = [...longError];
        const values = [...Items];
        const numberRegex = /^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$/;
        const minLengthRegex = /\d{6,}/;
        if(newlongitude.length==0)
        {
            error[index]= "required";
            setlongError(error);
        }
        if(!numberRegex.test(newlongitude)){
            error[index]= "Invalid Longitude";
            setlongError(error);
        }
        else
        {
            error.splice(index, 1);
            setlongError(error);

        }

        values[index].Longitude= newlongitude.replace(/[^0-9]/g, '');
        setItems(values);
    };
    const ItemChange4= (index, newlatitude) => {
   
        const error = [...latiError];
        const values = [...Items];
        const numberRegex = /^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$/;
        const minLengthRegex = /\d{6,}/;
        if(newlatitude.length==0)
        {
            error[index]="required";
            setlatiError(error);
        }
        if(!numberRegex.test(newlatitude)){
            error[index]= "Invalid Latitude";
            setlatiError(error);
        }
        else{
            error.splice(index, 1);
            setlatiError(error);
        }
        values[index].Latitude= newlatitude.replace(/[^0-9]/g, '');
        setItems(values);
    };
    const ItemChange5= (index, newarea) => {
   
        const error = [...areaError];
        const values = [...Items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{1,}/;
        if(newarea.length==0)
        {
            error[index]= "required";
            setaraeError(error);
        }
        else if(!numberRegex.test(newarea)){
            error[index]= "Area Only Should be Numeric";
            setaraeError(error);
        }
        else{
            error.splice(index, 1);
            setaraeError(error);
        }
        values[index].area= newarea.replace(/[^0-9]/g, '');
        setItems(values);
    };


    const handleAddFields = () => {
        var values = [...Items];
        values.push({CropGrowth: 'Choose Crop', Longitude: '', Latitude: '', area: '' });
        setItems(values);

        var val= [...visible4];
        val.push(false);
        setVisible4(val);

    };

    const handleRemoveFields = index => {
       var values = [...Items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        axios.put(url + '/update_fdc_land_info/'+id, {
            Item:Items
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "successfully saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('FarmerEquipmentTable',{id:id});
                }
                else {
                    history.push('/farmerequipmenttable/'+id);
                }
            }
            if (Platform.OS == 'android') {
                navigation.navigate('FarmerEquipmentTable',{id:id});
            }

        })
        .catch(function (error) {
            console.log(error);
        });
    }
    function submitError(){
        alert("All Field required");
    }

    const openMenu4 = (index) => {
        const values = [...visible4];
        values[index]=true;
        setVisible4(values);
    };

    const closeMenu4 = (index) => {
        const values = [...visible4];
        values[index]=false;
        setVisible4(values);4
    };

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={styles.card} >
                            <Card.Title titleStyle={styles.title} title="Land Information" />
                            <Card.Content>
                                {Items && Items.map((it, index) => (
                                    <View>
                                        <Menu
                                        visible={visible4[index]}
                                        onDismiss={()=>closeMenu4(index)}
                                        anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu4(index)}>{it.CropGrowth}</Button>}>
                                            {crop ?
                                                crop.map((cr)=>{
                                                    return (
                                                        <>
                                                        <Menu.Item title={cr.cropname} onPress={() => ItemChange2(index,cr.cropname)}/>
                                                        </>
                                                    )
                                                })
                                                :
                                                <Menu.Item title="No Crops are available" />
                                            }
                                        </Menu>
                                        {/* <TextInput style={styles.input} mode="outlined" label="Crop Grown in this land(from above)" value={it.CropGrowth} maxLength={6} onChangeText={(text) => ItemChange2(index,text)} />
                                        {cropError[index] ?
                                        <Text style={{color: "red"}}>{cropError[index]}</Text> :<></>
                                         } */}
                                        <TextInput style={styles.input} mode="outlined" label="Longitude" value={it.Longitude} maxLength={6} onChangeText={(text) => ItemChange3(index,text)} />
                                        {longError[index] ?
                                        <Text style={{color: "red"}}>{longError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Latitude" value={it.Latitude} maxLength={6} onChangeText={(text) => ItemChange4(index,text)} />
                                        {latiError[index] ?
                                        <Text style={{color: "red"}}>{latiError[index]}</Text> :<></>
                                         }
                                        <TextInput style={styles.input} mode="outlined" label="Max area in acers" value={it.area} maxLength={6} onChangeText={(text) => ItemChange5(index,text)} />
                                        {areaError[index] ?
                                        <Text style={{color: "red"}}>{areaError[index]}</Text> :<></>
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
                                {cropError.length==0 && longError.length==0 && latiError.length==0  && areaError.length==0?
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