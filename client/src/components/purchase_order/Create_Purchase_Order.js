import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';
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

export default function Create_Purchase_Order({ navigation }) {
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [indent_id, setIndentId] = useState("Choose Indent");
    const [order_id, setOrderId] = useState();
    const [user_id, setUserId] = useState();
    const [user, setUser] = useState();
    const [user2, setUser2] = useState();
    const [items, setItems] = useState([{ itemId: '', itemName: 'Choose Item', quantity: 0 ,itemUnit:''}]);
    const [purchase, setPurchase] = useState();
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        fetch(`http://${host}:5000/displayindent`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(user => setUser(user));
    
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

    function chooseIndent(id) {
        setIndentId(id)
        fetch(`http://${host}:5000/displayindent/${id}`, {
            method: 'GET'
        })        
        .then(res => res.json())
        .catch(error => console.log(error))
        // .then(order => setItems(order[0].items));
        .then(order => {
            setItems(order[0].items);
            setFlag(true);
        });
        console.log(items);  
        closeMenu1();
    }


    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function checkBoxTest(){
        alert("Hello ...")
    }
    function submitForm(){
        fetch(`http://${host}:5000/create_purchase_order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                
                order_id:order_id,
                items:items,
                user_id:user_id,
                indent_id:indent_id,

            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
             alert(data.message);
            console.log(data);
            setIndentId("Choose Indent");
            setItems("");
            // setVendorId("Choose Vendor");
        }); 
    }
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="CREATE PURCHASE ORDER"/>
                    <Card.Content>
                    
            
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{indent_id} </Button>}>
                        {user ?
                            user.map((item)=>{
                                return (
                                  
                                    <Menu.Item title={ item._id } onPress={()=>chooseIndent(item._id)} />
                                )
                            })
                            :
                            <Menu.Item title="No Indent Available" />
                        }
                    </Menu>
                    {items && flag &&
                    <DataTable style={styles.datatable}>
                    {items.map((it, index) => (
                        <DataTable.Row>
                            <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={it.itemName} /></DataTable.Cell>
                            <DataTable.Cell><TextInput mode="outlined" label="Unit" value={it.itemUnit} /></DataTable.Cell>
                            <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} /></DataTable.Cell>
                            <DataTable.Cell><View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                }
                            </View></DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    </DataTable>
                    }
                    {/* {items[0].name!=='Choose Item' &&
                    <DataTable style={styles.datatable}>
                    {items.map((it, index) => (
                        <DataTable.Row>
                            <DataTable.Cell><TextInput mode="outlined" label="Item Name" value={it.itemName} /></DataTable.Cell>
                            <DataTable.Cell><TextInput mode="outlined" label="Unit" value={it.itemUnit} /></DataTable.Cell>
                            <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={it.quantity} onChangeText={(text)=>ItemChange(index, "quantity", text, '')} /></DataTable.Cell>
                            <DataTable.Cell><View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>                                    </>
                                }
                            </View></DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    </DataTable>
                    } */}
                    {/* {items && 
                        <DataTable>
                            <DataTable.Header style={styles.tableheader} >
                            <DataTable.Title >Select Box</DataTable.Title>
                            <DataTable.Title >Item Name </DataTable.Title>
                            <DataTable.Title >Quantity</DataTable.Title>
                            </DataTable.Header>

                                { items.map((item)=>{
                            return (
                                <DataTable.Row key={item.itemName}> 
                                    <DataTable.Cell  onChangeText={items => setItems(item.itemName)}  >checkbox </DataTable.Cell>
                                    <DataTable.Cell  onChangeText={items => setItems(item.itemName)}  >{item.itemName} </DataTable.Cell>
                                    <DataTable.Cell  onChangeText={items => setItems(item.quantity)} >{item.quantity} </DataTable.Cell>
                                </DataTable.Row>
                            )}

                        )}
                        </DataTable>
                    } */}

                



                    <Button mode="contained" onPress ={()=> submitForm() } style={{padding: '2%', marginTop: '2%'}}>Create Purchase Order</Button>
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
}); 

