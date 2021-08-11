import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme, Searchbar } from 'react-native-paper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddItem({ navigation }) {

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
    const [itemCategory, setItemCategory] = useState();
    const [category, setCategory] = useState("Choose Category");
    const [categoryId, setCategoryId] = useState("");
    const [itemName, setItemName] = useState("");
    const [grade, setGrade] = useState("Choose Grade");
    const [itemDescription, setDescription,] = useState("");
    const [unit,setUnit]=useState("Select unit of each item");
    const [host, setHost] = useState("");

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
        }
        else{
            setHost("localhost");
        }
        fetch(`http://${host}:5000/retrive_all_item_category`, {
            method: 'GET'
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(itemCategory => setItemCategory(itemCategory));
    }, [itemCategory,host]);

    function chooseCategory(id, name) {
        setCategoryId(id);
        setCategory(name);
        closeMenu1();
    }

    function chooseGrade(name) {
        setGrade(name);
        closeMenu2();
    }
    function chooseUnit(name) {
        setUnit(name);
        closeMenu3();
    }
    
    function submitForm() {
        fetch(`http://${host}:5000/create_item`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                category: categoryId,
                item_name: itemName,
                grade: grade,
                description: itemDescription,
                unit : unit,
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
            setCategory("Choose Category");
            setGrade("Choose Grade");
            setCategoryId("");
            setItemName("");
            setDescription("");
            setUnit("select unit of each");
        }); 
    }

    const onChangeSearch = query => setSearchQuery(query);

    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="ADD ITEM"/>
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
                        <Menu.Item title="A Grade" onPress={()=>chooseGrade("A")} />
                        <Menu.Item title="B Grade" onPress={()=>chooseGrade("B")} />
                        <Menu.Item title="C Grade" onPress={()=>chooseGrade("C")} />
                        <Menu.Item title="D Grade" onPress={()=>chooseGrade("D")} />
                    </Menu>
                    <Menu key={3}
                    visible={visible3}
                    onDismiss={closeMenu3}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu3}>{unit}</Button>}>
                        <Menu.Item title="100g" onPress={()=>chooseUnit("100g")} />
                        <Menu.Item title="250g" onPress={()=>chooseUnit("250g")} />
                        <Menu.Item title="500g" onPress={()=>chooseUnit("500g")} />
                        <Menu.Item title="1kg" onPress={()=>chooseUnit("1kg")} />
                        <Menu.Item title="5kg" onPress={()=>chooseUnit("5kg")} />
                        <Menu.Item title="10kg" onPress={()=>chooseUnit("10kg")} />
                        <Menu.Item title="1packet = 20kg" onPress={()=>chooseUnit("1packet = 20kg")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={itemDescription} onChangeText={itemDescription => setDescription(itemDescription)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Item</Button>
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
