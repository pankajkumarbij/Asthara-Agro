import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider,DataTable, DefaultTheme } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function CreateIndent({ navigation }) {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [user_id, setUserId] = useState();
    const [orderId, setOrderId] = useState("Choose Order");
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:''}]);
    const [vendor_id, setVendorId] = useState("");
    const [vendor_email, setVendorEmail] = useState("Choose Vendor");
    const [user, setUser] = useState();
    const [user2, setUser2] = useState();
    const [margin, setMargin] = useState("");
    const [order, setOrder] = useState();
    const [host, setHost] = useState("");

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch("http://localhost:5000/retrive_all_order", {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(user => setUser(user));


        fetch("http://localhost:5000/retrive_all_vendor", {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(user2 => setUser2(user2));
    }, [user,host]);
    
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

    function chooseOrder(id) {
        setOrderId(id)
        fetch(`http://localhost:5000/retrive_order/${id}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(order => setItems(order[0].items));
        console.log(items);
        closeMenu1();
    }

    function chooseVendor(id, email){
        setVendorId(id)
        setVendorEmail(email);
        fetch(`http://localhost:5000/retrive_vendor/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        closeMenu2();
    }

    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm(){
        fetch('http://localhost:5000/newindent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: orderId,
                items:items,
                user_id:user_id,
                vendor_id:vendor_id,
                margin:margin,
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            console.log(data);
            setOrderId("Choose Order");
            setVendorId("Choose Vendor");
            setItems("");
            setMargin("");
        }); 
    }

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="CREATE INDENT"/>
                    <Card.Content>
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{orderId}</Button>}>
                        {user ?
                            user.map((item)=>{
                                return (
                                    <Menu.Item title={item.name + " ("+ item._id +")"} onPress={()=>chooseOrder(item._id)} />
                                )
                            })
                            :
                            <Menu.Item title="No order Available" />
                        }
                    </Menu>

                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu2}>{vendor_email} </Button>}>
                        {user2 ?
                            user2.map((item)=>{
                                return (
                                    <Menu.Item title={item.full_name+" ("+item.email+")" } onPress={()=>chooseVendor(item._id, item.email)} />
                                )
                            })
                            :
                            <Menu.Item title="No Vendor Available" />
                        }
                    </Menu>
                    {items &&
                    items.map((it, index) => (
                        <View>
                            <TextInput mode="outlined" label="Item Name" value={it.itemName} />
                            <TextInput mode="outlined" label="Unit" value={it.itemUnit} />
                            <TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} />
                            <View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                }
                            </View>
                        </View>
                    ))}
                    <TextInput style={styles.input} value={margin} onChangeText={margin => setMargin(margin)} mode="outlined"  label="Margin" />
                    <Button mode="contained" onPress ={()=> submitForm() } style={styles.button}>Create Indent</Button>
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
    }
}); 
