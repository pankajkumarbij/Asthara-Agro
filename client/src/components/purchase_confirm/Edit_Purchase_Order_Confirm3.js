import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme,DataTable, Searchbar } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { all_confirm_purchase_order_by_id } from '../../services/order_api';
import  {all_users_by_role} from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Purchase_Order_Confirm3(props, {route}) {
    
    var purchaseconfirmid = ""; 
    if(Platform.OS=="android"){
        purchaseconfirmid = route.params.purchaseConfirmId;
    }
    else{
        purchaseconfirmid = props.match.params.purchaseconfirmid;
    }

    const [visible3, setVisible3] = useState(false)
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const [purchaseId, setPurchaseId] = useState("");
    const [order_id, setOrder_Id] = useState("");
    const [vendor_id,setVendorId] = useState("Choose Vendor");
    const [status,setStatus] = useState("");
    const [items, setItems] = useState();
    const [buyer, setBuyer] = useState();
    const [host, setHost] = useState("");
    const [buyer_id, setBuyerId] = useState("");
    const [buyer_email, setBuyerEmail] = useState("Choose Buyer");
    const [orderId, setOrderId] = useState("");
    const [custom_orderId, setCustomId] = useState("");
    const [custom_vendorId, setCustomVendorId] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [vendorPoolId, setVendorPoolId] = useState("");
    const [customerPoolId, setCustomerPoolId] = useState("");
    const [managerPoolId, setManagerPoolId] = useState('');
    const [sales_id, setSalesId] = useState("");
    
    let history = useHistory();

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        // fetch all Buyer
        all_users_by_role("buyer")
        .then(result => {
            setBuyer(result);
        })
      
        if(purchaseconfirmid){
            all_confirm_purchase_order_by_id(purchaseconfirmid)
            .then(result=>{
                setOrder_Id(result[0].order_id);
                setPurchaseId(result[0].purchaseId);
                setItems(result[0].items);
                setVendorId(result[0].vendor_id);
                setStatus(result[0].status);
                setOrderId(result[0].orderId);
                setCustomId(result[0].custom_orderId);
                setCustomVendorId(result[0].custom_vendorId);
                setVendorPoolId(result[0].vendorPoolId);
                setCustomerPoolId(result[0].customerPoolId);
                setManagerPoolId(result[0].managerPoolId);
                setSalesId(result[0].sales_id);
            })
        }

    }, [host, purchaseconfirmid, vendorPoolId]);
  
    //chooseBuyer() function for select the Buyer   
    function chooseBuyer(id, email){
        setBuyerId(id)
        setBuyerEmail(email);
        closeMenu3();
    }
    
    // for asign buyer 
    function submitForm() {
        fetch(`http://${host}:5000/create_pickup_assign`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                purchaseId:purchaseId,
                order_id:order_id,
                orderId:orderId,
                custom_orderId:custom_orderId,
                custom_vendorId:custom_vendorId,
                items:items,   
                vendor_id:vendor_id,
                sales_id: sales_id,
                buyer_id:buyer_id, 
                status:status,
                vendorPoolId: vendorPoolId,
                customerPoolId: customerPoolId,
                managerPoolId: managerPoolId,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            history.push('/All_Pending_Purchase_Order_Confirm');
        });

        //for change the status
        fetch(`http://${host}:5000/update_purchase_confirm_status/${purchaseconfirmid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: "Buyer Assigned",
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            // alert(data.message);
        });  

        fetch(`http://${host}:5000/update_order_item_status/${custom_orderId}/${items.itemName}/${items.Grade}/${items.quantity}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status:"Buyer Assigned",
            })
        }).then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            //  alert(data.message);
        });
    }

    const PriceChange = (value) => {
        const values = items;
        setItems({Grade:values.Grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:values.quantity, itemPrice:value});
    };

    const QuantityChange = (value) => {
        const values = items;
        setItems({Grade:values.Grade, finalPrice:values.finalPrice, itemId:values.itemId, itemName:values.itemName, itemNegotiatePrice:values.itemNegotiatePrice, itemUnit:values.itemUnit, quantity:value, itemPrice:values.finalPrice});
    };

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="Edit Confirm Purchase Order(Assign Buyer to pickup)"/>
                    <Card.Content>
                        <Menu
                        visible={visible3}
                        onDismiss={closeMenu3}
                        anchor={<Button style={styles.input} mode="outlined"  onPress={openMenu3}>{buyer_email} </Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                                style={{marginBottom: '20px'}}
                            />
                            {buyer ?
                                buyer.map((item)=>{
                                    if(item.pool_id==vendorPoolId)
                                    if(item.nick_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                        return (
                                            <Menu.Item title={item.nick_name} onPress={()=>chooseBuyer(item._id, item.email)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No Buyer Available" />
                            }
                        </Menu>

                        {items &&
                            <DataTable style={{marginTop: '20px'}}>
                                <DataTable.Row>
                                    <DataTable.Cell><TextInput mode="outlined" label="Item" value={items.itemName+" ("+items.Grade+")"} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput mode="outlined" label="Unit" value={items.itemUnit} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Quantity" value={items.quantity} onChangeText={(text)=>QuantityChange(text)} /></DataTable.Cell>
                                    <DataTable.Cell><TextInput  keyboardType='numeric' mode="outlined" label="Price" value={items.itemPrice} onChangeText={(text)=>PriceChange(text)} /></DataTable.Cell>
                                </DataTable.Row>
                            </DataTable>
                        }
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Assign Buyer</Button>
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
    },
}); 