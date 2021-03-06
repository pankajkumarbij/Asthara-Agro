import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Provider, DefaultTheme,DataTable, Button } from 'react-native-paper';
import { retrieve_crawler_by_item_name } from '../../services/crawler';
import { url } from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Aim(props, {route}) {

    var id="";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [aimId, setAimId] = useState("");
    const [excess_quantity, setExcessQuantity] = useState();
    const [waste_quantity, setWasteQuantity] = useState();
    const [sold_quantity, setSoldQuantity] = useState();
    const [sold_price, setSoldPrice] = useState();
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState(""); 
    const [flag, setFlag] = useState(true);
    const [mandi_price, setMandiPrice] = useState();

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setAimId(id);
        }
        else{
            setHost("localhost");
            setAimId(id);
        }

        if(flag && aimId){
            fetch(`http://${host}:5000/retrieve_excess_inventory_detail/${aimId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setExcessQuantity(item[0].excess_quantity);
                setWasteQuantity(item[0].wastage);
                setSoldQuantity(item[0].reserved);
                setItems(item[0].items);
                setVendorId(item[0].vendorId);
                setBuyerId(item[0].buyerId);
                setFlag(false);
            });
        }

        if(items){
            retrieve_crawler_by_item_name(items.itemName)
            .then((result)=>{
                setMandiPrice(result[0].price);
            })
        }

    }, [host,aimId,id,flag,items]);

    function update(){
        var s="Pending";
        if(excess_quantity-waste_quantity-sold_quantity==0){
            s="Completed";
        }
        axios.put(url + '/update_excess_inventory_by_quantity/'+aimId, {
            status: s,
            wastage: waste_quantity,
            sold: sold_quantity,
            reserved: excess_quantity-waste_quantity-sold_quantity,
            sold_price: sold_price,
        })
        .then(function (response) {
            alert(response.data.message);
            if(response){
                history.push('/allitemgrades');
            }
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }

    const getColor = (itemNegotiatePrice,targetPrice) => {
        let BackgroundColor = '';
        if(targetPrice && itemNegotiatePrice){    
            if(itemNegotiatePrice <= 0) {
                BackgroundColor = '';
            } else if(itemNegotiatePrice >= targetPrice) {
                BackgroundColor = 'lightgreen';
            } else if(itemNegotiatePrice >= ((targetPrice / 100) * 95)) {
                BackgroundColor = 'yellow';
            } else if(itemNegotiatePrice >= ((targetPrice / 100) * 85)) {
                BackgroundColor = 'orange';
            } else BackgroundColor = 'red';
        }
        return BackgroundColor;
    };

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Excess Inventory Item"/>
                    <Card.Content>

                        {buyer_id &&
                            <TextInput style={styles.input} mode="outlined" label="Buyer ID" value={buyer_id} />
                        }

                        {vendor_id &&
                            <TextInput style={styles.input} mode="outlined" label="Vendor ID" value={vendor_id} />
                        }

                        {items && mandi_price ?
                            <View>
                                <TextInput style={styles.input} mode="outlined" label="Excess Quantity" value={excess_quantity} />
                                <DataTable style={styles.datatable}>
                                    <DataTable.Row style={styles.input}>
                                        <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                        <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                        <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Market Price" value={mandi_price} /></DataTable.Cell>
                                    </DataTable.Row>
                                </DataTable>    
                            </View>     
                            :
                            null   
                        }

                        <TextInput style={styles.input} mode="outlined" label="Waste Quantity" value={waste_quantity} onChangeText={(text)=>setWasteQuantity(text)} />

                        <TextInput style={styles.input} mode="outlined" label="Sold Quantity" value={sold_quantity} onChangeText={(text)=>setSoldQuantity(text)} />

                        <TextInput style={{ backgroundColor: getColor(sold_price, mandi_price) }} mode="outlined" label="Sold Price" value={sold_price} onChangeText={(text)=>setSoldPrice(text)} />

                        {sold_price && mandi_price && sold_quantity ?
                            <TextInput style={styles.input} mode="outlined" label="Insentive (RS)" value={(sold_price-mandi_price)*sold_quantity*0.1} />
                            :
                            null
                        }
                        
                        <DataTable.Cell>
                            {Platform.OS=="android" ?
                                <>
                                    <Button onPress={() => update()} mode="outlined">Update</Button>
                                </>
                                :
                                <>
                                    <Button style={styles.input} onPress={() => update()} mode="outlined">Update</Button>
                                </>
                            }
                        </DataTable.Cell>

                    </Card.Content>
                </Card>
            </View>
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
        backgroundColor: 'white',
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