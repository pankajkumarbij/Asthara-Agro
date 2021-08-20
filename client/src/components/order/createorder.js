import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
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

export default function CreateOrder({ navigation }) {

    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [visible, setVisible] = useState([]);
    const [visible2, setVisible2] = useState(false);
    const [item, setItem] = useState();
    const [host, setHost] = useState("");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:''}]);
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
    const [customer, setCustomer] = useState();
    const [customerEmail, setCustomerEmail] = useState("Choose customer");
    const [category,setCategory] = useState("");
    const [role,setRole]=useState("");
    const [userId,setUserId]=useState("");
    const [flag2,setFlag2]=useState(true);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        fetch(`http://${host}:5000/retrive_all_item`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(item => setItem(item));

        fetch(`http://${host}:5000/retrive_all_customer`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(customer => setCustomer(customer));

        fetch('http://localhost:5000/retrive_user_category_type/customer', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(data =>{
            setCategory(data[0]._id);
            setRole(data[0].category_name);
        });

        if(flag2 && userId!=""){
            fetch(`http://${host}:5000/retrive_address_by_userId/${userId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(address => {
                // setAddress(address[0].address);
                // setLandmark(address[0].landmark);
                // setDistrict(address[0].district);
                // setState(address[0].state);
                // setCountry(address[0].country);
                // setPincode(address[0].postal_code);
                console.log(address);
                console.log(userId);
                setFlag2(false);
            });
        }
    }, [item,host,userId,flag2]);

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

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

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

    const CustomerChange = (id, email) => {
        setCustomerEmail(email);
        fetch(`http://${host}:5000/retrive_customer/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(customer => {
            setEmail(customer[0].email);
            setName(customer[0].full_name);
            setMobileNo(customer[0].mobile_no);
            setUserId(customer[0].userId);
        });
        closeMenu2();
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
        fetch(`http://${host}:5000/create_order`, {
            method: 'POST',
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
            console.log(data);
        }); 

        if(flag==false) {
            fetch('http://localhost:5000/create_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    category:category,
                    role:role,
                    full_name:name,
                    email:email,
                    mobile_no:mobileNo,
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                console.log(data);
            });

            fetch(`http://${host}:5000/create_address`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    address: address,
                    landmark: landmark,
                    district: district,
                    state: state,
                    country: country,
                    postal_code: pincode,
                })
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(data => {
                console.log(data);
            }); 
        }
    }

    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Create Sales Order"/>
                    <Card.Content>
                    <View style={styles.customer}>
                        <Button mode="outlined" style={styles.button} onPress={()=>setFlag(false)} >New Customer Order</Button>
                        <Button mode="outlined" style={styles.button} onPress={()=>setFlag(true)} >Existing Customer Order</Button>  
                    </View>
                    {flag &&
                        <Menu
                            visible={visible2}
                            onDismiss={closeMenu2}
                            anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={openMenu2}>{customerEmail}</Button>}>
                                <Searchbar
                                    icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                    clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                    placeholder="Search"
                                    onChangeText={onChangeSearch2}
                                    value={searchQuery2}
                                />
                                {customer ?
                                    customer.map((item)=>{
                                        if(item.email.toUpperCase().search(searchQuery2.toUpperCase())!=-1 || item.full_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                        return (
                                            <>
                                            <Menu.Item title={item.email+" ( "+item.full_name+" ) "} onPress={()=>CustomerChange(item._id, item.email)}/>
                                            </>
                                        )
                                        }
                                    })
                                    :
                                    <Menu.Item title="No Customers are available" />
                                }
                        </Menu>
                    }
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
                                            <Menu.Item title={item.item_name+" ("+item.grade+") "} onPress={()=>ItemChange(index, "item", item.item_name, item._id,item.unit_name)}/>
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
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Create Order</Button>
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
                width: '50%',
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
    customer: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                
            },
            default: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            }
        })
    }
}); 
