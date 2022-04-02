import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text,Alert } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle,faMinusCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { allitem, item_grade, item_unit } from '../../services/item_api';
import { Link, useHistory } from "react-router-dom";
import {url} from '../../utils/url';
import axios from 'axios';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Crawler({ navigation }) {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    
    const [allItems, setAllItems] = useState();
    const [itemUnit, setItemUnit] = useState();
    const [itemGrade, setItemGrade] = useState();

    const [item, setItem] = useState("Choose item");
    const [grade, setGrade] = useState("Choose Grade");
    const [unit,setUnit]=useState("Select unit of each item");
    const [price,setPrice]=useState("");
    const [date,setDate]=useState("");
    const [items1, setItems1] = useState(['']);
    const [pincodeError, setPincodeError] = useState(['']);

    let history = useHistory();

    useEffect(() => {

        //Retrieve all items
        allitem()
        .then(result => {
            setAllItems(result);
        })

        //Retrieve all item grade
        item_grade()
        .then(result => {
            setItemGrade(result);
        })

        //Retrieve all item unit
        item_unit()
        .then(result => {
            setItemUnit(result);
        })

    }, []);

    function chooseItem(id, name) {
        setItem(name);
        closeMenu1();
    }

    function chooseGrade(id, name) {
        setGrade(name);
        closeMenu2();
    }
    
    function chooseUnit(id, name) {
        setUnit(name);
        closeMenu3();
    }
    const handleAddFields = () => {
        const values = [...items1];
        values.push('');
        setItems1(values);
        const error = [...pincodeError];
        error.push('');
        setPincodeError(error);
    };
    
    const handleRemoveFields = index => {
        const values = [...items1];
        values.splice(index, 1);
        setItems1(values);
    };
    const ItemChange = (index, fieldvalue) => {
        const error = [...pincodeError];
        const values = [...items1];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{6,}/;
        if(!numberRegex.test(fieldvalue)){
            error[index] = "Pin Code Only Should be Numeric";
            setPincodeError(error);
        }
        else if(!minLengthRegex.test(fieldvalue)){
            error[index] = "Pin Code Length should be 6";
            setPincodeError(error);
        }
        else{
            error[index] = '';
            setPincodeError(error);
        }
        values[index] = fieldvalue.replace(/[^0-9]/g, '');
        setItems1(values);
    };


    function submitForm() {
        console.log(item+unit);
        axios.post(url + '/create_crawler', {
                item_name: item,
                item_grade: grade,
                item_unit : unit,
                price :price,
                date :date,
                postal_code : items1 ,
          })
          .then(function (response) {
              console.log(response);
            alert(response.data.message);
            if(response.data)
            {
                if(Platform.OS=="android"){
                    navigation.navigate('Allcrawlers');

                }
                else{
                    history.push('/allcrawlers');
                }
            }
            }) 
    }

    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title titleStyle={styles.title} title="Add crawler"/>
                    <Card.Content>
                    <Menu key={1}
                        visible={visible1}
                        onDismiss={closeMenu1}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{item}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch}
                                value={searchQuery}
                            />
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItem')}}>Add Item</Button>
                                :
                                <Link to="/additem"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Item</Button></Link>
                            }
                            {allItems ?
                                allItems.map((item)=>{
                                    if(item.item_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                        return (
                                            <Menu.Item title={item.item_name} onPress={()=>chooseItem(item._id, item.item_name)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No item Available" />
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
                        {items1.map((it, index) => (
                        <View>
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={it} maxLength={6} onChangeText={(text)=>ItemChange(index, text)} />
                            {pincodeError[index] ?
                                <Text style={{color: "red"}}>{pincodeError[index]}</Text> 
                            :
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
                            }
                        </View> 
                    ))}
                        <TextInput style={styles.input} mode="outlined" label="Price" value={price} onChangeText={price => setPrice(price)} />            
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()} >Add Crawler</Button>
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
    title: {
        ...Platform.select({
            ios: {
                
            },
            android: {
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