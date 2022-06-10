import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView,KeyboardAvoidingView} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar} from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { user_category } from '../../services/user_api';
import { uploadImage } from '../../services/image';
import emailjs from 'emailjs-com';
import { all_customer_pools, all_manager_pools, all_vendor_pools } from '../../services/pool';
import { url } from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Register({ navigation},props) {

    let history = useHistory();

    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [searchQuery3, setSearchQuery3] = useState('');
    const [searchQuery4, setSearchQuery4] = useState('');
    const [searchQuery5, setSearchQuery5] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [userCategory, setUserCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [roleas, setRoleas] = useState("");
    const [host, setHost] = useState("");
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [idType, setIdType] = useState("Choose ID Type");
    const [customers, setCustomers] = useState();
    const [vendors, setVendors] = useState();
    const [managers, setManagers] = useState();
    const [pool_name, setPoolName] = useState("Choose Pool");
    const [pool_id, setPoolId] = useState("");

    const[values,setValues]=useState({
        full_name:'',
        nickname:'',
        email:'',
        mobileNo:'',
        password:'',
        confirmPassword:'',
        gstNo:'',
        idNumber:'',
    });

    useEffect(() => {
        setHost(props.host);
        setRoleas(props.roleas);
        //retrieve all user category
        user_category()
        .then(function(result) {
            setUserCategory(result);
        });

        //Retrieve all customer list
        all_customer_pools()
        .then(result => {
            setCustomers(result);
        })

        //Retrieve all vendor list
        all_vendor_pools()
        .then(result => {
            setVendors(result);
        })

        //Retrieve all manager list
        all_manager_pools()
        .then(result => {
            setManagers(result);
        })

    }, [userCategory, host, props.host, props.roleas]);

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

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function submitForm() {
        fetch(url+'/create_user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categoryId,
                role: category,
                idType: idType,
                image: img,
                full_name: values.full_name,
                nick_name: values.nickName,
                email: values.email,
                mobile_no: values.mobileNo,
                contactPersonName: values.contactPersonName,
                idNumber: values.idNumber,
                gst_no:values.gstNo,
                pool_name: pool_name,
                pool_id: pool_id,
                password: values.password,
                confirm_password: values.confirmPassword,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            if(data.data){
                emailjs.send('gmail', 'template_r2kqjja',values, 'user_tzfygekUd6AAYz72qWJrG')
                .then((result) => {
                    console.log(result); 
                }, (error) => {
                    console.log(error.text);
                });
                if(Platform.OS=='android')
                {
                    navigation.navigate('AddAddress',{userid:data.data._id});
                }
                else
                {
                    history.push("/addaddress/"+data.data._id);
                }
            }
        })
        .catch(err=>{
            alert(err.message);
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

    function chooseIdType(idType){
        setIdType(idType);
        closeMenu2();
    }

    const handleChange = (mytextname) => {
        return (val) => {
            setValues({ ...values, [mytextname]: val })
        }
    }

    function ChooseCustomer(id, poolName){
        setPoolId(id);
        setPoolName(poolName);
        closeMenu3();
    }

    function ChooseVendor(id, poolName){
        setPoolId(id);
        setPoolName(poolName);
        closeMenu4();
    }

    function ChooseManager(id, poolName){
        setPoolId(id);
        setPoolName(poolName);
        closeMenu5();
    }

    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch3 = query => setSearchQuery3(query);
    const onChangeSearch4 = query => setSearchQuery4(query);
    const onChangeSearch5 = query => setSearchQuery5(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                <KeyboardAvoidingView>
                <ScrollView>
                    <Card.Title titleStyle={styles.title} title="Register User"/>
                    <Card.Content>
                    <Menu
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
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddUserCategory')}}>Add Category</Button>
                            :
                            <Link to="/addusercategory"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Category</Button></Link>
                        }
                        {userCategory ?
                            userCategory.map((item)=>{
                                if(item.category_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                    if(roleas=='sales'){
                                        if(item.category_name == 'customer')
                                        return (
                                            <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                        )
                                    }
                                    else if(roleas=='buyer'){
                                        if( item.category_name == 'vendor')
                                        return (
                                            <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                        )
                                    }
                                    else {
                                        return (
                                            <Menu.Item title={item.category_name} onPress={()=>chooseCategory(item._id, item.category_name)} />
                                        )
                                    }
                                }
                            })
                            :
                            <Menu.Item title="No User Category Available" />
                        }
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Full Name" value={values.full_name} onChangeText={handleChange('full_name')} />
                    <TextInput style={styles.input} mode="outlined" label="Nick Name" value={values.nickName} onChangeText={handleChange('nickName')} />
                    {(category=="vendor" || category=="customer") &&
                        <TextInput style={styles.input} mode="outlined" label="Contact Person Name" value={values.contactPersonName} onChangeText={handleChange('contactPersonName')} />
                    }
                    <TextInput style={styles.input} mode="outlined" label="Email" value={values.email} onChangeText={handleChange('email')} />
                    <TextInput style={styles.input} mode="outlined" label="Mobile No" value={values.mobileNo} onChangeText={handleChange('mobileNo')} />
                    <Menu
                    visible={visible2}
                    onDismiss={closeMenu2}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{idType}</Button>}>
                        <Menu.Item title="Aadhar Card" onPress={()=>chooseIdType("Aadhar Card")} />
                        <Menu.Item title="Pan Card" onPress={()=>chooseIdType("Pan Card")} />
                        <Menu.Item title="Voter Id" onPress={()=>chooseIdType("Voter Id")} />
                        <Menu.Item title="Driving License" onPress={()=>chooseIdType("Driving License")} />
                        <Menu.Item title="Passport" onPress={()=>chooseIdType("Passport")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Govt ID Number" value={values.idNumber} onChangeText={handleChange('idNumber')}/>
                    {/* <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 3, border: '1px solid gray', marginLeft: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles}
                        />
                        <Button mode="contained" style={styles.button, { flex: 1,}} onPress={()=>ImageSubmitForm()}>Upload Image</Button>
                    </View> */}
                    {(category=="vendor" || category=="customer") &&
                        <TextInput style={styles.input} mode="outlined" label="GST No" value={values.gstNo} onChangeText={handleChange('gstNo')} />
                    }
                    {category=="sales" &&
                    <Menu
                    visible={visible3}
                    onDismiss={closeMenu3}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu3}>{pool_name}</Button>}>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch3}
                            value={searchQuery3}
                        />
                        {Platform.OS=='android' ?
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                            :
                            <Link to="/addcustomerpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Customer Pool</Button></Link>
                        }
                        {customers ?
                            customers.map((item)=>{
                                return (
                                    <Menu.Item title={item.pool_name} onPress={()=>ChooseCustomer(item._id, item.pool_name)} />
                                )
                            })
                            :
                            <Menu.Item title="No Customer Pool Available" />
                        }
                    </Menu>
                    }
                    {category=="buyer" &&
                    <Menu
                    visible={visible4}
                    onDismiss={closeMenu4}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu4}>{pool_name}</Button>}>
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
                            <Link to="/addvendorpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Vendor Pool</Button></Link>
                        }
                        {vendors ?
                            vendors.map((item)=>{
                                return (
                                    <Menu.Item title={item.pool_name} onPress={()=>ChooseVendor(item._id, item.pool_name)} />
                                )
                            })
                            :
                            <Menu.Item title="No Vendor Pool Available" />
                        }
                    </Menu>
                    }
                    {category=="manager" &&
                    <Menu
                    visible={visible5}
                    onDismiss={closeMenu5}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu5}>{pool_name}</Button>}>
                        <Searchbar
                            icon={() => <FontAwesomeIcon icon={ faSearch } />}
                            clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                            placeholder="Search"
                            onChangeText={onChangeSearch5}
                            value={searchQuery5}
                        />
                        {Platform.OS=='android' ?
                            <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                            :
                            <Link to="/addmanagerpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Manager Pool</Button></Link>
                        }
                        {managers ?
                            managers.map((item)=>{
                                return (
                                    <Menu.Item title={item.pool_name} onPress={()=>ChooseManager(item._id, item.pool_name)} />
                                )
                            })
                            :
                            <Menu.Item title="No Manager Pool Available" />
                        }
                    </Menu>
                    }
                    <TextInput style={styles.input} mode="outlined" label="Password" value={values.password} onChangeText={handleChange('password')} secureTextEntry={true}/>
                    <TextInput style={styles.input} mode="outlined" label="Confirm Password" alue={values.confirmPassword} onChangeText={handleChange('confirmPassword')} secureTextEntry={true}/>
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Save & Add Address</Button>
                    </Card.Content>
                </ScrollView>
                </KeyboardAvoidingView>
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
                marginTop: '2%',
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
        marginBottom: '2%',
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
    title: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                marginTop: '1%',
                textAlign: 'center',
                color: 'green',
                fontFamily: 'Roboto'
            },
            default: {
                textAlign: 'center',
                color: 'green',
                fontSize: 28,
                fontFamily: 'Roboto'
            }
        })
    },
    button: {
        marginTop: '2%',
    }
}); 
