import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, CheckBox } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Purchase_Order(props, {route}) {

    
    var id="";
    var purchaseid = ""; 
    if(Platform.OS=="android"){
        id = route.params.purchaseId;
    }
    else{
        purchaseid = props.match.params.purchaseid;
    }


    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [isSelected, setSelection] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrderId] = useState("");
    const [indent_id, setIndentId] = useState("Choose Indent");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    
    const [items, setItems] = useState("");
    
    const [host, setHost] = useState("");

    function chooseIndent(i_id) {
        setIndentId(i_id);
        closeMenu1();
    }
    function chooseVendor(vendorId) {
        setVendorId(vendorId);
        closeMenu2();
    }
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setPurchaseId(id);
        }
        else{
            setHost("localhost");
            setPurchaseId(purchaseid);
        }
        if(purchaseId){
       
            fetch(`http://${host}:5000/retrive_purchase_order/${purchaseid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setIndentId(item[0].indent_id);
                setOrderId(item[0].order_id)
                setItems(item[0].items);
                setVendorId(item[0].vendor_id);
                setStatus(item[0].status);
            });

       }

    }, [host,purchaseId,purchaseid,id]);

    function submitForm() {
        fetch(`http://${host}:5000/update_purchase_order/${purchaseid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                indent_id:indent_id,
                order_id:order_id,
                items:items,   
                vendor_id:vendor_id, 
                status:status,          
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }

    const handleCheckbox=(event)=>{
        const {itemName,checked} = event.target;
        let tempItems = items.map((item) => 
            items.itemName === itemName ? {...item, isChecked : checked} : item);
        setItems(tempItems);
     }; 
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Edit Purchase Order"/>
                    <Card.Content>
                    
                    {vendor_id &&
                    <Menu 
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{vendor_id}</Button>}>
                        <Menu.Item title="${pId}" onPress={()=>chooseVendor(vendor_id)} />
                    </Menu>
                    }

                    {indent_id &&
                    <Menu 
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{indent_id}</Button>}>
                        <Menu.Item title="${indentId}" onPress={()=>chooseIndent(indent_id)} />
                    </Menu>
                    }
                    {indent_id && 
                    <DataTable>
                        <DataTable.Header style={styles.tableheader} >
                        <DataTable.Title >Item Name </DataTable.Title>
                        <DataTable.Title >Unit</DataTable.Title>
                        <DataTable.Title >Quantity</DataTable.Title>

                        </DataTable.Header>
                        {items && 
                            items.map((item)=>{
                                return (
                                    <DataTable.Row key={item.itemName}> 
                                        <DataTable.Cell>{item.itemName} </DataTable.Cell>
                                        <DataTable.Cell>{item.itemUnit} </DataTable.Cell>
                                        <DataTable.Cell>{item.quantity} </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    </DataTable>
                    }                   
                    
                    {/* {indent_id && 
                    <DataTable>
                        <DataTable.Header style={styles.tableheader} >
                        <DataTable.Title >Item Name </DataTable.Title>
                        <DataTable.Title >Quantity</DataTable.Title>
                        <DataTable.Title >Unit</DataTable.Title>
                        </DataTable.Header>
                        {items && 
                            items.map((item)=>{
                                return (
                                    <DataTable.Row key={item.itemName}> 
                                        <DataTable.Cell>{item.itemName} </DataTable.Cell>
                                        <DataTable.Cell>{item.quantity} </DataTable.Cell>
                                        <DataTable.Cell>{item.unit} </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    </DataTable>
                    }                   */}
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
                width: '90%',
            },
            default: {
                width: '60%',
                marginTop: '2%',
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