import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, ScrollView, SafeAreaView} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

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
export default function EditItem(props,{route}) {

    var itemid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemId;
    }
    else{
        itemid = props.match.params.itemid;
    }
    //define state variables
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);

    const [itemId, setItemId] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [itemUnit, setItemUnit] = useState();
    const [itemGrade, setItemGrade] = useState();
    const [itemCategory, setItemCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [unitId, setUnitId] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [itemName, setItemName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemDescription, setDescription,] = useState("");
    const [unit,setUnit]=useState("Select unit of each item");
    const [host, setHost] = useState("");
    const [flag, setFlag] = useState(true);
    const [flag2, setFlag2] = useState(true);

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemId(id);
        }
        else{
            setHost("localhost");
            setItemId(itemid);
        }
        if(itemId && flag){
            fetch(`http://${host}:5000/retrive_item/${itemId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setGradeId(item[0].grade);
                setUnitId(item[0].unit);
                setCategoryId(item[0].category);
                setGrade(item[0].grade_name);
                setUnit(item[0].unit_name);
                setCategory(item[0].category_name);
                setItemName(item[0].item_name);
                setDescription(item[0].description);
            });
            setFlag(false);
        }

            fetch(`http://${host}:5000/retrive_all_item_category`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(itemCategory => setItemCategory(itemCategory));

            fetch(`http://${host}:5000/retrive_all_item_unit`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(itemUnit => setItemUnit(itemUnit));

            fetch(`http://${host}:5000/retrive_all_item_grade`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(itemGrade => setItemGrade(itemGrade));

    }, [host,itemId,id,itemid,itemGrade,itemUnit,itemCategory,flag]);

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
        fetch(`http://${host}:5000/update_item/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categoryId,
                unit: unitId,
                grade: gradeId,
                item_name: itemName,
                category_name: category,
                unit_name: unit,
                grade_name: grade,
                description: itemDescription,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }

    const onChangeSearch = query => setSearchQuery(query);
    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {grade ?
                <Card style={styles.card}>
                    <Card.Title title="EDIT ITEM"/>
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
                    <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Item</Button>
                    <Button mode="contained" style={styles.button} color='red'>Disable Item</Button>
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
                width: '50%',
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
