import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {all_vendor_addresses, vendor_address_by_id} from '../../services/vendor_api';
import { allitem, item_all_category, item_grade, item_unit } from '../../services/item_api';
import axios from 'axios';
import {url} from '../../utils/url';
import { uploadImage } from '../../services/image';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define add items component
export default function AddItem({ navigation }) {
    //initialize all required state variables
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const openMenu4 = () => setVisible4(true);
    const closeMenu4 = () => setVisible4(false);
    const openMenu5 = () => setVisible5(true);
    const closeMenu5 = () => setVisible5(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [searchQuery3, setSearchQuery3] = useState('');
    const [searchQuery4, setSearchQuery4] = useState('');

    const [userId, setUserId] = useState('');
    const [itemUnit, setItemUnit] = useState();
    const [itemGrade, setItemGrade] = useState();
    const [itemCategory, setItemCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemDescription, setDescription,] = useState("");
    const [itemPrice,setItemPrice]=useState("");
    const [itemQuantity,setItemQuantity]=useState("");
    const [unit,setUnit]=useState("Select unit of each item");
    const [host, setHost] = useState("");
    const [nick_name, setNickName] = useState("");
    const [address, setAddress] = useState('');
    const [landmark, setLandmark] = useState('');
    const [district, setDistrict] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [pincode, setPincode] = useState('Choose Address');
    const [vendorAddress, setVendorAddress] = useState();
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [allItems, setAllItems] = useState();
    const [item, setItem] = useState("Choose Item");

    let history = useHistory();

    useEffect(() => {

        async function fetchData() {
            await AsyncStorage.getItem('loginuserid')
            .then((userid) => {
                setUserId(userid);
            })
            await AsyncStorage.getItem('nick_name')
            .then((nick_name) => {
                setNickName(nick_name);
            })
        }
        fetchData();    

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }

        //Retrieve all items
        allitem()
        .then(result => {
            setAllItems(result);
        })

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

    }, [userId, itemCategory, host, itemUnit, itemGrade,nick_name]);

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

    function chooseItem(id, name) {
        setItem(name);
        closeMenu5();
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
    //define a function for sending the data in corresponding database
    function submitForm() {
        axios.post(url + '/vendors_create_item', {
                userId: userId,
                category: categoryId,
                unit: unitId,
                grade: gradeId,
                image: img,
                item_name: item,
                category_name: category,
                unit_name: unit,
                grade_name: grade,
                item_price:itemPrice,
                item_quantity:itemQuantity,
                description: itemDescription,
                nick_name:nick_name,
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

    function getFiles(event){
        setFile(event.target.files[0]);
    }

    function ImageSubmitForm(){

        uploadImage(file)
        .then(result => {
            setImg(result);
            alert("Image Uploaded successfully");
        });
        
    }

    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    const onChangeSearch3 = query => setSearchQuery3(query);
    const onChangeSearch4 = query => setSearchQuery4(query);

    return (
        <Provider theme={theme}>
            <View>
                <Card style={styles.card}>
                    <Card.Title title="VENDORS ADD ITEM"/>
                    <Card.Content>
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
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemCategory')}}>Add Category</Button>
                                :
                                <Link to="/additemcategory"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Category</Button></Link>
                            }
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
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                                :
                                <Link to="/additemgrades"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Grade</Button></Link>
                            }
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
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemUnit')}}>Add Unit</Button>
                                :
                                <Link to="/additemunits"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Unit</Button></Link>
                            }
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
                        <View style={{flexDirection: 'row'}}>
                            <input type="file" name="file" placeholder="Image"
                            style={{flex: 3, border: '1px solid gray', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                            onChange={getFiles}
                            />
                            <Button mode="contained" style={styles.button, { flex: 1, marginTop: '2%',}} onPress={()=>ImageSubmitForm()}>Upload Image</Button>
                        </View>
                        <Menu key={5}
                        visible={visible5}
                        onDismiss={closeMenu5}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu5}>{item}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch3}
                                value={searchQuery3}
                            />
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemUnit')}}>Add Item</Button>
                                :
                                <Link to="/additem"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Item</Button></Link>
                            }
                            {allItems ?
                                allItems.map((item)=>{
                                    if(item.item_name.toUpperCase().search(searchQuery2.toUpperCase())!=-1){
                                        return (
                                            <Menu.Item title={item.item_name} onPress={()=>chooseItem(item._id, item.item_name)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No items Available" />
                            }
                        </Menu>
                        <TextInput style={styles.input} mode="outlined" label="Item Quantity" numeric value={itemQuantity} onChangeText={itemQuantity => setItemQuantity(itemQuantity.replace(/[^0-9]/g, ''))} />
                        <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                        <TextInput style={styles.input} mode="outlined" label="Unit Item Price" numeric value={itemPrice} onChangeText={itemPrice => setItemPrice(itemPrice.replace(/[^0-9]/g, ''))} />
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
                                        <Menu.Item style={{marginTop: '5%', padding: '1%',}} title={"Address: "+item.address+", Landmark: "+item.landmark+", \n District: "+item.district+", State: "+item.state+", \n Country: "+item.country+", Pin Code: "+item.postal_code} onPress={()=>chooseAddress(item._id, item.postal_code)} />
                                    )
                                })
                                :
                                <Menu.Item title="No Address Available" />
                            }
                        </Menu>
                            <TextInput style={styles.input} mode="outlined" label="Address" value={address} multiline onChangeText={address => setAddress(address)} />
                            <TextInput style={styles.input} mode="outlined" label="Landmark" value={landmark} onChangeText={landmark => setLandmark(landmark)} />
                            <TextInput style={styles.input} mode="outlined" label="District" value={district} onChangeText={district => setDistrict(district)} />
                            <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                            <TextInput style={styles.input} mode="outlined" label="Country" value={country} onChangeText={country => setCountry(country)} />            
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={pincode} onChangeText={pincode => setPincode(pincode)} />            
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Item</Button>
                    </Card.Content>
                </Card>
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
    }
}); 
