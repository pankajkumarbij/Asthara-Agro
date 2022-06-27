import React, {useState} from 'react';
import { useEffect } from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu } from 'react-native-paper';
import { transport_labour_from_vendor_by_id } from '../../../services/transport_labour/transport_labour_from_vendor';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewTransportLabourFromVendor(props,{ route, navigation }) {

    var id = "";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [vNumber, setVNumber] = useState("");
    const [vType, setVType] = useState("Choose Vehicle Type");
    const [charge, setCharge] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");

    useEffect(() => {

        if(id){
            transport_labour_from_vendor_by_id(id)
            .then(result=> {
                setVType(result[0].vehicle_type);
                setVNumber(result[0].vehicle_number);
                setCharge(result[0].charge);
                setLabourName(result[0].labour_name);
                setLabourMobileNumber(result[0].labour_mobile_no);
                setDriverName(result[0].driver_name);
                setDriverMobileNumber(result[0].driver_mobile_no);
            })
        }

    },[id])

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="View Transport Labour from Vendor"/>
                    <Card.Content>
                    <Menu
                    anchor={<Button style={styles.input} mode="outlined">{vType}</Button>}>
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Vehicle Number" value={vNumber} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Name" value={driverName} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Mobile Number" value={driverMobileNumber} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Name" value={labourName} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Mobile Number" value={labourMobileNumber} />
                    <TextInput style={styles.input} mode="outlined" label="Charge" value={charge} />
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
    button: {
        marginTop: '2%',
    }
}); 