import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Pickup_Assignment_Confirm(props, {route}) {
    
    var id="";
    var pickupConfirmId = ""; 
    if(Platform.OS=="android"){
        id = route.params.pickupAssignId;
    }
    else{
        pickupConfirmId = props.match.params.pickupConfirmId;
    }

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [pickupAssignId, setPickupAssignId] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [buyer_id,setBuyerId] = useState("Choose Buyer");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);

    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }

    function chooseBuyer(buyerId) {
        setBuyerId(buyerId);
        closeMenu2();
    }

    function chooseVendor(vendorId) {
        setVendorId(vendorId);
        closeMenu2();
    }

    function choosePickup(pickupAssignId) {
        setPickupAssignId(pickupAssignId);
        closeMenu2();
    }

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPickupAssignId(id);
        }
        else{
            setHost("localhost");
            setPickupAssignId(pickupConfirmId);
        }

        if(pickupAssignId){
            fetch(`http://${host}:5000/retrive_pickup_assignment_confirm/${pickupConfirmId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setIndentId(item[0].indent_id);
                setOrderId(item[0].order_id);
                setPurchaseId(item[0].purchaseId);
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setBuyerId(item[0].buyer_id);
                setStatus(item[0].status);
                setFlag(true);
                console.log(item[0])
            });
        }

    }, [host,pickupAssignId,pickupConfirmId,id]);

    const ItemChange = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].quantity = fieldvalue;
        }
        setItems(values);
    };

    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    const ItemChange2 = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].itemPrice = fieldvalue;
        }
        setItems(values);
    };

    return (
        <Provider theme={theme}>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="Edit Pickup Assignment Confirm"/>
                    <Card.Content>
                        {pickupAssignId &&
                            <Menu 
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>Pickup Assign ID: {pickupAssignId}</Button>}>
                                <Menu.Item title="${pId}" onPress={()=>choosePickup(pickupAssignId)} />
                            </Menu>
                        }

                        {buyer_id &&
                            <Menu 
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>Buyer ID: {buyer_id}</Button>}>
                                <Menu.Item title="${pId}" onPress={()=>chooseBuyer(buyer_id)} />
                            </Menu>
                        }

                        {vendor_id &&
                            <Menu 
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>Vendor ID: {vendor_id}</Button>}>
                                <Menu.Item title="${pId}" onPress={()=>chooseVendor(vendor_id)} />
                            </Menu>
                        }

                        {items &&
                            <DataTable style={styles.datatable}>
                                <DataTable.Row style={styles.input}>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={items.itemName} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>ItemChange(0, "quantity", text, '')} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>ItemChange2(0, "itemPrice", text, '')} /></DataTable.Cell>
                                    <DataTable.Cell><View style={{flexDirection: 'row'}}>
                                        {Platform.OS=="android" ?
                                            <>
                                                <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(0)}/>
                                            </>
                                            :
                                            <>
                                                <Button onPress={() => handleRemoveFields(0)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                        }
                                    </View></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        }
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