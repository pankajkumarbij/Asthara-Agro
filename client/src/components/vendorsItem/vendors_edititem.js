import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { all_vendor_addresses, all_vendor_items_by_itemid, vendor_address_by_id } from '../../services/vendor_api';
import { item_all_category, item_grade, item_unit } from '../../services/item_api';
import axios from 'axios';
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
//define edit item component
export default function VendorsEditItem(props,{navigation, route}) {

    var itemid = "";
    if(Platform.OS=="android"){
        itemid = route.params.itemId;
    }
    else{
        itemid = props.match.params.itemid;
    }
    //define state variables
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const openMenu4 = () => setVisible4(true);
    const closeMenu4 = () => setVisible4(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery4, setSearchQuery4] = useState('');

    const [itemId, setItemId] = useState("");
    const [itemUnit, setItemUnit] = useState();
    const [itemGrade, setItemGrade] = useState();
    const [itemCategory, setItemCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [itemName, setItemName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemQuantity, setItemQuantity] = useState("");
    const [itemDescription, setDescription,] = useState("");
    const [item_price,setItemPrice]=useState("");
    const [unit,setUnit]=useState("Select unit of each item");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('');
    const [vendorAddress, setVendorAddress] = useState();
    const [userId, setUserId] = useState('');

    let history = useHistory();

    useEffect(() => {
        
        if(itemid && flag){
            all_vendor_items_by_itemid(itemid)
            .then(result => {
                setUserId(result[0].userId),
                setGradeId(result[0].grade);
                setUnitId(result[0].unit);
                setCategoryId(result[0].category);
                setGrade(result[0].grade_name);
                setUnit(result[0].unit_name);
                setCategory(result[0].category_name);
                setItemName(result[0].item_name);
                setItemQuantity(result[0].item_quantity);
                setDescription(result[0].description);
                setItemPrice(result[0].item_price);
                setAddress(result[0].address);
                setLandmark(result[0].landmark);
                setDistrict(result[0].district);
                setState(result[0].state);
                setCountry(result[0].country);
                setPincode(result[0].postal_code);
                setFlag(false);
            });
        }

        //Retrieve all item category
        item_all_category()
        .then(result => {
            setItemCategory(result);
        })

        //Retrieve all item unit
        item_unit()
        .then(result => {
            setItemUnit(result);
        })

        //Retrieve all item grade
        item_grade()
        .then(result => {
            setItemGrade(result);
        })

        //Retrieve vendor addresses
        if(userId){
            all_vendor_addresses(userId)
            .then(result => {
                setVendorAddress(result);
            });
        }

    }, [itemid,itemGrade,itemUnit,itemCategory,flag, userId]);

    function chooseGrade(name) {
        setGrade(name);
        closeMenu2();
    }

    function chooseUnit(name) {
        setUnit(name);
        closeMenu1();
    }

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function chooseGrade(id, name) {
        setGradeId(id);
        setGrade(name);
        closeMenu2();
    }

    function chooseUnit(id, name) {
        setUnitId(id);
        setUnit(name);
        closeMenu3();
    }
    //define submit function for sending the data into database
    function submitForm() {
        axios.put(url + '/vendors_update_item/'+itemid, {
            category: categoryId,
                unit: unitId,
                grade: gradeId,
                item_name: itemName,
                category_name: category,
                unit_name: unit,
                grade_name: grade,
                item_quantity: itemQuantity,
                description: itemDescription,
                item_price:item_price,
                address: address,
                landmark: landmark,
                district: district,
                state: state,
                country: country,
                postal_code: pincode,
        })
          .then(function (response) {
            alert(response.data.message);
            history.push('/vendors_allitems');
          })
          .catch(function (error) {
            console.log(error);
          }); 
    }

    function chooseAddress(addressId) {
        vendor_address_by_id(addressId)
        .then(result => {
            setAddress(result[0].address);
            setLandmark(result[0].landmark);
            setPincode(result[0]. postal_code);
            setState(result[0].state);
            setDistrict(result[0].district);
            setCountry(result[0].country);
        });
        closeMenu4();
    }

    const StatusChange = (s) => {
        fetch(`http://${host}:5000/disabled_item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status: s,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            // console.log(data);
        });
        // closeMenu(index);
    };

    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    const onChangeSearch4 = query => setSearchQuery4(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {grade ?
                <Card style={styles.card}>
                    <Card.Title title="VENDORS EDIT ITEM"/>
                    <Card.Content>
                        <TextInput style={styles.input} mode="outlined" label="Item Name" value={itemName} onChangeText={itemName => setItemName(itemName)} />
                        <Menu key={1}
                        visible={visible1}
                        onDismiss={closeMenu1}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{category}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                            />
                            <Link to="/additemcategory"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Category</Button></Link>
                            {itemCategory ?
                                itemCategory.map((item)=>{
                                    if(item.category_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                    return (
                                        <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                    )
                                    }
                                })
                                :
                                <Menu.Item title="No item Category Available" />
                            }
                        </Menu>

                        <Menu key={2}
                        visible={visible2}
                        onDismiss={closeMenu2}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{grade}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch1}
                                value={searchQuery1}
                            />
                            <Link to="/additemgrades"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Grade</Button></Link>
                            {itemGrade ?
                                itemGrade.map((item)=>{
                                    if(item.grade_name.toUpperCase().search(searchQuery1.toUpperCase())!=-1){
                                    return (
                                        <Menu.Item title={item.grade_name} onPress={()=>chooseGrade(item._id, item.grade_name)} />
                                    )
                                    }
                                })
                                :
                                <Menu.Item title="No item Grade Available" />
                            }
                        </Menu>

                        <Menu key={3}
                        visible={visible3}
                        onDismiss={closeMenu3}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu3}>{unit}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch2}
                                value={searchQuery2}
                            />
                            <Link to="/additemunits"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Unit</Button></Link>
                            {itemUnit ?
                                itemUnit.map((item)=>{
                                    if(item.unit_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                    return (
                                        <Menu.Item title={item.unit_name} onPress={()=>chooseUnit(item._id, item.unit_name)} />
                                    )
                                    }
                                })
                                :
                                <Menu.Item title="No item Unit Available" />
                            }
                        </Menu>
                        <TextInput style={styles.input} mode="outlined" label="Item Quantity" multiline value={itemQuantity} onChangeText={itemQuantity => setItemQuantity(itemQuantity)} />
                        <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                        <TextInput style={styles.input} mode="outlined" label="Item Price" numeric value={item_price} onChangeText={item_price => setItemPrice(item_price)} />
                        <Menu key={4}
                        visible={visible4}
                        onDismiss={closeMenu4}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu4}>{pincode}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch4}
                                value={searchQuery4}
                            />
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                                :
                                <Link to="/vendors_add_address"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Vendor Address</Button></Link>
                            }
                            {vendorAddress ?
                                vendorAddress.map((item)=>{
                                    return (
                                        <Menu.Item title={item.postal_code} onPress={()=>chooseAddress(item._id, item.postal_code)} />
                                    )
                                })
                                :
                                <Menu.Item title="No Address Available" />
                            }
                        </Menu>
                        <TextInput style={styles.input} mode="outlined" label="Address" value={address}/>
                        <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark}/>
                        <TextInput style={styles.input} mode="outlined" label="District" value={district}/>
                        <TextInput style={styles.input} mode="outlined" label="State" value={state}/>
                        <TextInput style={styles.input} mode="outlined" label="country" value={country}/>
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item</Button>
                        <Button mode="contained" style={styles.button} color='red' onPress={()=>StatusChange("disabled")}>Disable Item</Button>
                    </Card.Content>
                </Card>
                :
                <ActivityIndicator size={50}/>
                }
            </View>
        </Provider>
    );
}
//define stylesheet for the component (IOS styles to be added)
const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        padding: '1%',
        ...Platform.select({
            ios: {
                //to be updated for IOS
                marginTop: '10%',
                width: '90%',
            },
            android: {
                marginTop: '10%',
                width: '90%',
            },
            default: {
                marginTop: '4%',
                width: '75%',
                border: '1px solid gray',
                boxShadow: '0 4px 8px 0 gray, 0 6px 20px 0 gray',
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
