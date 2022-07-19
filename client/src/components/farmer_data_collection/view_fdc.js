import React, { useEffect, useState } from 'react';
import { CheckBox, View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button } from 'react-native-paper';
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

export default function ViewFDC(props, { navigation, route }) {

    var id = "";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [Items, setItems] = useState();
    const [family, setfamily] = useState();
    const [bank, setbank] = useState();
    const [crop, setcrop] = useState();
    const [land, setland] = useState();
    const [em, setem] = useState();

   useEffect(() => {
    if(id){
        fdc_by_id(id)
        .then(result => {
            setItems(result[0]);
            setfamily(result[0].family_info);
            setbank(result[0].loan_info);
            setcrop(result[0].crop_info);
            setland(result[0].land_info);
            setem(result[0].equipmentAndMachinery);
        })
    }
   },[id])

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={styles.card} >
                            <Card.Title titleStyle={styles.title} title="Farmer Data Collection" />
                            <Card.Content>
                                {Items &&
                                <View>
                                    <TextInput style={styles.input} mode="outlined" label="Name" value={Items.name} />
                                    <TextInput style={styles.input} mode="outlined" label="Father Name" value={Items.father_name} />
                                    <TextInput style={styles.input} mode="outlined" label="Total Land in acers" value={Items.total_land_in_acres} />
                                    <TextInput style={styles.input} mode="outlined" label="Village" value={Items.village} />
                                    <TextInput style={styles.input} mode="outlined" label="Pin Code" value={Items.pincode} />
                                    <TextInput style={styles.input} mode="outlined" label="Soil Type" value={Items.soil_type} />
                                    <TextInput style={styles.input} mode="outlined" label="FPO" value={Items.fpo} />
                                    <TextInput style={styles.input} mode="outlined" label="Contact No" value={Items.contact_number} />
                                    <TextInput style={styles.input} mode="outlined" label="Aadhar Card" value={Items.aadhar_number} />
                                    <TextInput style={styles.input} mode="outlined" label="Pan Card" value={Items.pan_number} />
                                    <TextInput style={styles.input} mode="outlined" label="Krishi Card Number" value={Items.krishi_number} maxLength={10} />
                                    
                                    <Card.Title titleStyle={styles.title} title="Family Information " />
                                    <Card.Content>
                                        <View style={{flexDirection: 'row' }}>
                                            <TextInput style={styles.input, {width: '33%'}} mode="outlined" label="No of Members" value={Items.members} />
                                            <TextInput style={styles.input, {width: '33%'}} mode="outlined" label="No of Adults" value={Items.adults} />
                                            <TextInput style={styles.input, {width: '33%'}} mode="outlined" label="No of Childs" value={Items.childs} />
                                        </View>
                                        {family && family.map((it, index) => (
                                            <View>
                                                <Text style={styles.input}>Family Member {index+1}</Text>
                                                <TextInput style={styles.input} mode="outlined" label="Family Member Name" value={it.name} />
                                                <TextInput style={styles.input} mode="outlined" label="Relation eg:son" value={it.relation} />
                                                <TextInput style={styles.input} mode="outlined" label="Age" value={it.dob} />
                                            </View>
                                        ))}
                                    </Card.Content>

                                    <Card.Title titleStyle={styles.title} title="Loan Details" />
                                    <Card.Content>
                                        {bank && bank.map((it, index) => (
                                            <View>
                                                <Text style={styles.input}>Bank Loan {index+1}</Text>
                                                <TextInput style={styles.input} mode="outlined" label="Type of Loan" value={it.typeofloan} />
                                                <TextInput style={styles.input} mode="outlined" label="Bank Name" value={it.bankname} />
                                                <TextInput style={styles.input} mode="outlined" label="amount(in INC)" value={it.amount} />
                                                <TextInput style={styles.input} mode="outlined" label="Date of credit(YYYY-MM-DD)" value={it.datecredit} />
                                                <TextInput style={styles.input} mode="outlined" label="pending amount(in INC)" value={it.pendingamount} />
                                                <TextInput style={styles.input} mode="outlined" label="rate of interest" value={it.rateofinterest} />
                                                <TextInput style={styles.input} mode="outlined" label="duration" value={it.duration} />
                                            </View>
                                        ))}
                                    </Card.Content>

                                    <Card.Title titleStyle={styles.title} title="Crop Information" />
                                    <Card.Content>
                                        {crop && crop.map((it, index) => (
                                            <View>
                                                <Text style={styles.input}>Crop Info {index+1}</Text>
                                                <TextInput style={styles.input} mode="outlined" label="Crop Name" value={it.cropname} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="Crop details" value={it.cropdetail} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="cultivation area" value={it.cultivationarea} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="total qty" value={it.totalqty} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="Seed used" value={it.seedused} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="Seed Type" value={it.seedtype} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="Fertilizer use" value={it.Fertilizeruse} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="Pesticides use" value={it.Pesticidesuse} maxLength={60} />
                                                <TextInput style={styles.input} mode="outlined" label="crop time frame" value={it.croptimeframe} maxLength={60} />
                                            </View>
                                        ))}
                                    </Card.Content>

                                    <Card.Title titleStyle={styles.title} title="Land Information" />
                                    <Card.Content>
                                        {land && land.map((it, index) => (
                                            <View>
                                                <Text style={styles.input}>Land Info {index+1}</Text>
                                                <TextInput style={styles.input} mode="outlined" label="Crop Grown in this land(from above)" value={it.CropGrowth} maxLength={6} />
                                                <TextInput style={styles.input} mode="outlined" label="Longitude" value={it.Longitude} maxLength={6} />
                                                <TextInput style={styles.input} mode="outlined" label="Latitude" value={it.Latitude} maxLength={6} />
                                                <TextInput style={styles.input} mode="outlined" label="Max area in acers" value={it.area} maxLength={6} />
                                            </View>

                                        ))}
                                    </Card.Content>

                                    <Card.Title titleStyle={styles.title} title="Equipment & Mechinary" />
                                    <Card.Content>
                                        {em && em.map((it, index) => (
                                            <View>
                                                <Text style={styles.input}>Equipment Info {index+1}</Text>
                                                <TextInput style={styles.input} mode="outlined" label="Equipment details" value={it.equipment} maxLength={6} />
                                                <TextInput style={styles.input} mode="outlined" label="Rent/own" value={it.Rent} maxLength={6} />
                                            </View>
                                        ))}
                                    </Card.Content>

                                    <View style={styles.divbox}>
                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}> Sources of irrigation</Text>
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={Items.rain_fed=="false" ? false : true} 
                                                style={styles.checkbox}
                                            />
                                            <Text style={styles.label}>RainFed</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={Items.canal=="false" ? false : true} 
                                                style={styles.checkbox}
                                            />
                                            <Text style={styles.label}>Canal</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={Items.borewell=="false" ? false : true} 
                                                style={styles.checkbox}
                                            />
                                            <Text style={styles.label}>Borwall</Text>
                                        </View>
                                    </View>
                                    <View style={styles.divbox}>
                                        <Text style={{ color: 'gray', fontWeight: 'bold', fontStyle: 'italic', textDecorationLine: 'underline' }}>Market Information</Text>
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={Items.apmc=="false" ? false : true} 
                                                style={styles.checkbox}
                                            />
                                            <Text style={styles.label}>APMC</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={Items.private_mandi=="false" ? false : true} 
                                                style={styles.checkbox}
                                            />
                                            <Text style={styles.label}>Private Mandi</Text>
                                        </View>
                                        <View style={styles.checkboxContainer}>
                                            <CheckBox
                                                value={Items.contract_forming=="false" ? false : true} 
                                                style={styles.checkbox}
                                            /> 
                                            <Text style={styles.label}>Contract Farming</Text>
                                        </View>
                                    </View>
                                </View>
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
}); 