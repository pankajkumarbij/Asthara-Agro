import React, {useState} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { loginuserId } from '../../../utils/user';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddTransportLabourFromVendor(props,{ navigation }) {

    const [visible2, setVisible2] = useState(false);
    const [vNumber, setVNumber] = useState("");
    const [vType, setVType] = useState("Choose Vehicle Type");
    const [charge, setCharge] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverMobileNumber, setDriverMobileNumber] = useState("");
    const [labourName, setLabourName] = useState("");
    const [labourMobileNumber, setLabourMobileNumber] = useState("");
    const[role,setRole] = useState("");
    const [userId,setUserId] = useState("");

    useEffect(() => {

        loginuserId()
        .then(result=>{
           setUserId(result);   
        })
        
    },[]);

    let history = useHistory();

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    function choose_v_type(type){
        setVType(type);
        closeMenu2();
    }

    function submitForm() {
        fetch(`http://localhost:5000/create_transport_labour_from_vendor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerId: userId, 
                vehicle_number: vNumber,
                vehicle_type: vType,
                driver_name: driverName,
                labour_name: labourName,
                driver_mobile_no: driverMobileNumber,
                labour_mobile_no: labourMobileNumber,
                charge: charge,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            if(data.message!="Something went wrong!"){
                alert("Yeah!", data.message, "success");
                history.push('/alltransportlabourfromvendor');
            }
            else{
                if(data.error.errors){
                    alert( "All Fields are required!");
                }
                else{
                    alert("You Have Already Added Transport and Labour Charge");
                }
            }
        });
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="Create Transport Labour from Vendor"/>
                    <Card.Content>
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vType} </Button>}>
                        <Menu.Item title="Truck" onPress={()=>choose_v_type("Truck")} />
                        <Menu.Item title="Mini Truck" onPress={()=>choose_v_type("Mini Truck")} />
                        <Menu.Item title="Auto Tempo" onPress={()=>choose_v_type("Auto Tempo")} />
                        <Menu.Item title="Car" onPress={()=>choose_v_type("Car")} />
                        <Menu.Item title="Rickshaw" onPress={()=>choose_v_type("Rickshaw")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Vehicle Number" value={vNumber} onChangeText={vNumber => setVNumber(vNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Name" value={driverName} onChangeText={driverName => setDriverName(driverName)} />
                    <TextInput style={styles.input} mode="outlined" label="Driver Mobile Number" value={driverMobileNumber} onChangeText={driverMobileNumber => setDriverMobileNumber(driverMobileNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Name" value={labourName} onChangeText={labourName => setLabourName(labourName)} />
                    <TextInput style={styles.input} mode="outlined" label="Labour Mobile Number" value={labourMobileNumber} onChangeText={labourMobileNumber => setLabourMobileNumber(labourMobileNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Charge" value={charge} onChangeText={charge => setCharge(charge)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Submit</Button>
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