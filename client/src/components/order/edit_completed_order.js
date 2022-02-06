import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faMinusCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { Order_by_id } from '../../services/order_api';
import {all_vendor_items} from '../../services/vendor_api';
const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditCompletedOrder(props, { route }) {

    var orderid = "";
    var id = "";
    if (Platform.OS == "android") {
        id = route.params.orderId;
    }
    else {
        orderid = props.match.params.orderid;
    }

    const [searchQuery1, setSearchQuery1] = useState('');
    const [orderId, setOrderId] = useState("");
    const [visible, setVisible] = useState([]);
    const [visible2, setVisible2] = useState(true);
    const [item, setItem] = useState();
    const [host, setHost] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0, itemUnit: '', itemPrice: '' }]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [sales, setSales] = useState();
    const [sales_id, setSalesId] = useState("");
    const [sales_email, setSalesEmail] = useState("Choose Sales");
    const [userId, setUserId] = useState("");
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);
    const [flag3, setFlag3] = useState(true);

    useEffect(() => {

        if (Platform.OS == "android") {
            setHost("10.0.2.2");
            setOrderId(id);
        }
        else {
            setHost("localhost");
            setOrderId(orderid);
        }
        // fetch all sales
        if(flag3){
            fetch("http://localhost:5000/retrive_all_sales", {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(sales => {
                setSales(sales);
                setFlag3(false);
            });
        }

        if (flag2){
            all_vendor_items()
            .then(result=>{
                setItem(result);
                setFlag2(false);
            })
        }

        if (flag && orderId) {
            Order_by_id(orderId)
            .then(result=> {
                setName(result[0].name);
                setEmail(result[0].email);
                setMobileNo(result[0].mobile_no);
                setAddress(result[0].address);
                setLandmark(result[0].landmark);
                setDistrict(result[0].district);
                setState(result[0].state);
                setCountry(result[0].country);
                setPincode(result[0].postal_code);
                setItems(result[0].items);
                setUserId(result[0].userId);
                setFlag(false);
            });
        }

    }, [item, sales, host, orderId, id, orderid, flag, flag2, flag3, name, email, mobileNo, address, landmark, district, state, country, pincode, items, userId, sales_id]);

    const openMenu = (index) => {
        const values = [...visible];
        values[index] = true;
        setVisible(values);
    };

    const closeMenu = (index) => {
        const values = [...visible];
        values[index] = false;
        setVisible(values);
    };

    const openMenu2 = () => {
        setVisible2(true);
    };
    const closeMenu2 = () => {
        setVisible2(false);
    };

    const ItemChange = (index, fieldname, fieldvalue, itemId, unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit = unit;
            closeMenu(index);
        }
        else {
            values[index].quantity = fieldvalue;
        }
        setItems(values);
    };

    const ItemChange3 = (index, fieldname, fieldvalue, itemId, unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit = unit;
        }
        else {
            values[index].itemNegotiatePrice = fieldvalue;
        }
        setItems(values);
    };

    const ItemChange4 = (index, fieldname, fieldvalue, itemId, unit, price) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit = unit;
            values[index].itemPrice = price;
        }
        else {
            values[index].finalPrice = fieldvalue;
        }
        setItems(values);
    };

    const handleAddFields = () => {
        const values = [...items];
        values.push({ itemId: '', itemName: 'Choose Item', quantity: 0 });
        setItems(values);
    };

    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };
    // for asign Sales 
    function submitForm() {
        fetch(`http://${host}:5000/create_delivery_assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requestedBy: userId,
                name: name,
                mobile_no: mobileNo,
                email: email,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode,
                orderId: orderId,
                items: items,
                sales_id: sales_id,
                userId: userId,
                status: status,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
        });
    }

    function chooseSales(id, email) {
        setSalesId(id)
        setSalesEmail(email);
        closeMenu2();
    }

    const onChangeSearch1 = query => setSearchQuery1(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <View>
                        <Card style={styles.card}>
                            <Card.Title title="Edit Completed Order" />
                            <Card.Content>
                                <TextInput style={styles.input} mode="outlined" label="Full Name" value={name} onChangeText={name => setName(name)} />
                                <TextInput style={styles.input} mode="outlined" label="Email" value={email} onChangeText={email => setEmail(email)} />
                                <TextInput style={styles.input} mode="outlined" label="Mobile no" value={mobileNo} onChangeText={mobileNo => setMobileNo(mobileNo)} />
                                <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                                <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                                <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                                <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                                <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                                <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                                {items && items.map((it, index) => (
                                    <View>
                                        <Menu
                                            visible={visible[index]}
                                            onDismiss={() => closeMenu(index)}
                                            anchor={<Button style={{ flex: 1, marginTop: '2%' }} mode="outlined" onPress={() => openMenu(index)}>{it.itemName}</Button>}>
                                            <Searchbar
                                                icon={() => <FontAwesomeIcon icon={faSearch} />}
                                                clearIcon={() => <FontAwesomeIcon icon={faTimes} />}
                                                placeholder="Search"
                                                onChangeText={onChangeSearch1}
                                                value={searchQuery1}
                                            />
                                            {item ?
                                                item.map((item) => {
                                                    if (item.item_name.toUpperCase().search(searchQuery1.toUpperCase()) != -1) {
                                                        return (
                                                            <>
                                                                <Menu.Item title={item.item_name + " (" + item.grade + ") "} onPress={() => ItemChange(index, "item", item.item_name, item._id, item.unit)} />
                                                            </>
                                                        )
                                                    }
                                                })
                                                :
                                                <Menu.Item title="No items are available" />
                                            }
                                        </Menu>
                                        <TextInput mode="outlined" label="unit of each item" value={it.itemUnit} />
                                        <TextInput keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text) => ItemChange(index, "quantity", text, '')} />
                                        <TextInput keyboardType='numeric' mode="outlined" label="FinalPrice"
                                            value={it.finalPrice = (it.itemPrice / 100) * 30 + (it.itemPrice)}
                                            onChangeText={(text) => ItemChange4(index, "finalPrice", text, '')}
                                        />
                                        <TextInput keyboardType='numeric' mode="outlined" label="Negotiate Price" value={it.itemNegotiatePrice} onChangeText={(text) => ItemChange3(index, "itemNegotiatePrice", text, '')} />
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

                                <Menu
                                    visible={visible2}
                                    onDismiss={closeMenu2}
                                    anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={openMenu2}>{sales_email}</Button>}>
                                    {sales ?
                                        sales.map((item)=>{
                                            return (
                                                <>
                                                    <Menu.Item title={item._id+" ( "+item.email+" ) "} onPress={()=>chooseSales(item._id, item.email)}/>
                                                </>
                                            )
                                        })
                                        :
                                        <Menu.Item title="No sales are available" />
                                    }
                                </Menu>
                                {sales_id && 
                                    <TextInput editable={false} style={styles.input} mode="outlined" label="New Sales Id" value={sales_id} />
                                }
                                <TextInput editable={false} style={styles.input} mode="outlined" label="Default Sales Id" value={userId} />
                                <Button mode="contained" style={styles.button} onPress={() => submitForm()} >Assign Sales</Button>
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
    },
}); 
