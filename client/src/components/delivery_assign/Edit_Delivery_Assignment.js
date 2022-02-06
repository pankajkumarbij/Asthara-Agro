import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes, } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Delivery_Assignment(props,{route}) {

    var deliveryid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.deliveryId;
    }
    else{
        deliveryid = props.match.params.deliveryid;
    }

    const [visible3, setVisible3] = useState(false);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [deliveryId, setDeliveryId] = useState("");
    const [visible, setVisible] = useState([]);
    const [item, setItem] = useState();
    const [host, setHost] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:'',itemPrice:''}]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [sales_id,setSalesId] = useState("Choose Sales");
    const [flag, setFlag] = useState(true);

    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    
    function chooseSales(salesId) {
        setSalesId(salesId);
        closeMenu3();
    }

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setDeliveryId(id);
        }
        else{
            setHost("localhost");
            setDeliveryId(deliveryid);
        }

        fetch(`http://${host}:5000/vendors_retrive_all_item`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(item => setItem(item));

        if(flag && deliveryId){
            fetch(`http://${host}:5000/retrive_delivery_assign/${deliveryId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(delivery => {
                setName(delivery[0].name);
                setEmail(delivery[0].email);
                setMobileNo(delivery[0].mobile_no);
                setAddress(delivery[0].address);
                setLandmark(delivery[0].landmark);
                setDistrict(delivery[0].landmark);
                setState(delivery[0].state);
                setCountry(delivery[0].country);
                setPincode(delivery[0].postal_code);
                setItems(delivery[0].items);
                setSalesId(delivery[0].sales_id);
                setFlag(false);
            });
        }

    }, [item,host,deliveryId,id,deliveryid,flag]);

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
        else{
            values[index].quantity = fieldvalue;
        }
        setItems(values);
    };

    const ItemChange3 = (index, fieldname, fieldvalue, itemId,unit) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
        }
        else{
            values[index].itemNegotiatePrice = fieldvalue;
        }
        setItems(values);
    };

    const ItemChange4 = (index, fieldname, fieldvalue, itemId,unit,price) => {
        const values = [...items];
        if (fieldname === "item") {
            values[index].itemId = itemId;
            values[index].itemName = fieldvalue;
            values[index].itemUnit=unit;
            values[index].itemPrice=price;
        }
        else{
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

    const onChangeSearch1 = query => setSearchQuery1(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
                <View>
                    <Card style={styles.card}>
                        <Card.Title title="Edit Delivery Assignment"/>
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
                            {items.map((it, index) => (
                                <View>
                                    <Menu
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
                                    </Menu>
                                    <TextInput mode="outlined" label="unit of each item" value={it.itemUnit} />
                                    <TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} />
                                    <TextInput  keyboardType='numeric' mode="outlined" label="FinalPrice" value={it.finalPrice=(it.itemPrice / 100) * 30 +(it.itemPrice)} onChangeText={(text)=>ItemChange4(index, "finalPrice", text, '')} />
                                    <TextInput  keyboardType='numeric' mode="outlined" label="Negotiate Price" value={it.itemNegotiatePrice} onChangeText={(text)=>ItemChange3(index, "itemNegotiatePrice", text, '')} />
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

                            {sales_id &&
                                <Menu 
                                visible={visible3}
                                onDismiss={closeMenu3}
                                anchor={<Button style={styles.input} mode="outlined" onPress={openMenu3}>{sales_id}</Button>}>
                                    <Menu.Item title="${pId}" onPress={()=>chooseSales(sales_id)} />
                                </Menu>
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
    button: {
        marginTop: '2%',
    },
}); 
