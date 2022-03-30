import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { Order_by_id } from '../../services/order_api';
import { all_vendor_items } from '../../services/vendor_api';
import { useHistory } from 'react-router-dom';
import {url} from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditOrder(props,{route}) {

    let history = useHistory();

    var orderid = "";
    if(Platform.OS=="android"){
        orderid = route.params.orderId;
    }
    else{
        orderid = props.match.params.orderid;
    }

    const [searchQuery1, setSearchQuery1] = useState('');
    const [orderId, setOrderId] = useState("");
    const [visible, setVisible] = useState([]);
    const [item, setItem] = useState();
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:'',itemPrice:0}]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [flag, setFlag] = useState(true);

    useEffect(() => {

        setOrderId(orderid);
        
        all_vendor_items()
        .then(result =>{
            setItem(result);
        })
        if(flag && orderid){
            Order_by_id(orderid)
            .then(result => {
                setName(result[0].name);
                setEmail(result[0].email);
                setMobileNo(result[0].mobile_no);
                setAddress(result[0].address);
                setLandmark(result[0].landmark);
                setDistrict(result[0].landmark);
                setState(result[0].state);
                setCountry(result[0].country);
                setPincode(result[0].postal_code);
                setItems(result[0].items);
                setFlag(false);
            })
        }

    }, [item,orderid,flag]);

    const openMenu = (index) => {
        const values = [...visible];
        values[index]=true;
        setVisible(values);
    };

    const closeMenu = (index) => {
        const values = [...visible];
        values[index]=false;
        setVisible(values);
    };

    const ItemChange = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
            closeMenu(index);
        }
        else if (fieldname === "finalPrice") {
            values[index].itemPrice = fieldvalue;
        }
        else if (fieldname === "itemNegotiatePrice") {
            values[index].itemNegotiatePrice = fieldvalue;
        }
        else{
            values[index].quantity = fieldvalue;
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

    function submitForm() {
        fetch(`${url}/update_order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                mobile_no: mobileNo,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode,
                items: items,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            history.push('/pendingorders');
        });
    }

    function deleteOrder() {
        fetch(`${url}/delete_order/${orderId}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            history.push('/pendingorders');
        });
    }

    const onChangeSearch1 = query => setSearchQuery1(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="Edit Order"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Customer Name" value={name} onChangeText={name => setName(name)} />
                    <TextInput style={styles.input} mode="outlined" label="Email" value={email} onChangeText={email => setEmail(email)} />
                    <TextInput style={styles.input} mode="outlined" label="Mobile no" value={mobileNo} onChangeText={mobileNo => setMobileNo(mobileNo)} />
                    <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                    <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                    <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                    <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                    <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />
                    <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />
                    {items.map((it, index) => (
                        <View>
                            {/* <Menu
                            visible={visible[index]}
                            onDismiss={()=>closeMenu(index)}
                            anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu(index)}>{it.itemName}</Button>}>
                                <Searchbar
                                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                    placeholder="Search"
                                    onChangeText={onChangeSearch1}
                                    value={searchQuery1}
                                />
                                {item ?
                                    item.map((item)=>{
                                        if(item.item_name.toUpperCase().search(searchQuery1.toUpperCase())!=-1){
                                        return (
                                            <>
                                            <Menu.Item title={item.item_name+" ("+item.grade+") "} onPress={()=>ItemChange(index, "item", item.item_name, item._id,item.unit)}/>
                                            </>
                                        )
                                        }
                                    })
                                    :
                                    <Menu.Item title="No items are available" />
                                }
                            </Menu> */}
                             <TextInput mode="outlined" label="Item Name" value={it.itemName} />
                            <TextInput mode="outlined" label="Unit of each item" value={it.itemUnit} />
                            <TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} />
                            <TextInput  keyboardType='numeric' mode="outlined" label="Per Unit Price" value={it.itemPrice} />
                            <TextInput  keyboardType='numeric' mode="outlined" label="Negotiate Price" value={it.itemNegotiatePrice} />
                            <View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                        <FontAwesomeIcon icon={ faPlusCircle } onPress={() => handleAddFields()} color={ 'green' } size={30} />
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>
                                        <Button  onPress={() => handleAddFields()}  mode="outlined"><FontAwesomeIcon icon={ faPlusCircle } color={ 'green' } size={30} /></Button>
                                    </>
                                }
                            </View>
                        </View>
                    ))}
                    <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faEdit } />} style={styles.button} onPress={()=>submitForm()} >Update Order</Button>
                    <Button mode="contained" icon={() => <FontAwesomeIcon icon={ faTrash } />} style={styles.button} color="red" onPress={()=>deleteOrder()} >Delete Order</Button>
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
