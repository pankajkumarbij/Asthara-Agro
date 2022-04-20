import React, {useState} from 'react';
import { useEffect } from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Image} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu, DataTable, Title } from 'react-native-paper';
import { transport_labour_for_sales_by_id } from '../../../services/transport_labour/transport_labout_for_sales';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewTransportLabourForSales(props,{ route, navigation }) {

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
    const [items, setItems] = useState();
    const [img, setImg] = useState();
    const [img2, setImg2] = useState();
    const [img3, setImg3] = useState();
    const [img4, setImg4] = useState();
    const [img5, setImg5] = useState();

    useEffect(() => {

        if(id){
            transport_labour_for_sales_by_id(id)
            .then(result=> {
                setVType(result[0].vehicle_type);
                setVNumber(result[0].vehicle_number);
                setCharge(result[0].charge);
                setLabourName(result[0].labour_name);
                setLabourMobileNumber(result[0].labour_mobile_no);
                setDriverName(result[0].driver_name);
                setDriverMobileNumber(result[0].driver_mobile_no);
                setItems(result[0].orders_items);
                setImg(result[0].img);
                setImg2(result[0].img2);
                setImg3(result[0].img3);
                setImg4(result[0].img4);
                setImg5(result[0].img5);
                console.log(result);
            })
        }

    },[id])

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="View Transport Labour for Sales"/>
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
                    {items &&
                        <DataTable>
                            <Title style={{marginTop: '20px', marginBottom: '20px'}}>Orders</Title>
                            <DataTable.Header>
                                <DataTable.Title>Order Id</DataTable.Title>
                                <DataTable.Title>Item Name</DataTable.Title>
                                <DataTable.Title>Grade</DataTable.Title>
                                <DataTable.Title>Quantity</DataTable.Title>
                            </DataTable.Header>
                            
                            {items.map((it, index) => (
                                <>
                                    <DataTable.Row>
                                        <DataTable.Cell>{it.orderId}</DataTable.Cell>
                                        <DataTable.Cell>{it.itemName}</DataTable.Cell>
                                        <DataTable.Cell>{it.Grade}</DataTable.Cell>
                                        <DataTable.Cell>{it.quantity}</DataTable.Cell>
                                    </DataTable.Row>
                                </>
                            ))}
                        </DataTable>
                    }
                    <View style={{flexDirection: 'row'}}>
                    {img ?
                        <Image
                            style={{width: 200, height: 210, border: '1px solid black'}}
                            source={img}
                        />
                        :
                        null
                    }
                    {img2 ?
                        <Image
                            style={{width: 200, height: 210, border: '1px solid black'}}
                            source={img2}
                        />
                        :
                        null
                    }
                    {img3 ?
                        <Image
                            style={{width: 200, height: 210, border: '1px solid black'}}
                            source={img3}
                        />
                        :
                        null
                    }
                    {img4 ?
                        <Image
                            style={{width: 200, height: 210, border: '1px solid black'}}
                            source={img4}
                        />
                        :
                        null
                    }
                    {img5 ?
                        <Image
                            style={{width: 200, height: 210, border: '1px solid black'}}
                            source={img5}
                        />
                        :
                        null
                    }
                    </View>
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