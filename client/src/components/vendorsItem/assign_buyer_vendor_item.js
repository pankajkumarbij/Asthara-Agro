import { faEdit, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform, ActivityIndicator, Image, Text} from 'react-native';
import { TextInput, Card, Provider, DefaultTheme, Button, Menu, Searchbar } from 'react-native-paper';
import { Link } from 'react-router-dom';
import { all_vendor_items_by_itemid } from '../../services/vendor_api';
import { all_users_by_role } from '../../services/user_api';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define all item components
export default function Buyer_assignmnet(props, {route,navigation }) {

    var itemid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.itemId;
    }
    else{
        itemid = props.match.params.itemid;
    }

    const [itemId, setItemId] = useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [host, setHost] = useState("");
    const [item, setItem] = useState();
    const [buyer, setBuyer] = useState();
    const [buyer_email, setBuyerEmail] = useState("Choose Buyer");
    const [buyer_id, setBuyerId] = useState("");
    const [visible3, setVisible3] = useState(false)
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);

    useEffect(() => {

        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setItemId(id);
        }
        else{
            setHost("localhost");
            setItemId(itemid);
        }

        if(itemId){
            all_vendor_items_by_itemid(itemId)
            .then(result => {
                setItem(result[0]);
            });
        }

        all_users_by_role("buyer")
        .then(result => {
            setBuyer(result);
        })

    }, [host,itemId,id,itemid])

    function chooseBuyer(id, email){
        setBuyerId(id)
        setBuyerEmail(email);
        closeMenu3();
    }

    const onChangeSearch = query => setSearchQuery(query);
    
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {item ?
                <Card style={styles.card}>
                    <View style={{ flexDirection: 'row' }}>
                        <Card.Title style={{ flex: 2,}} title="Buyer Assignment for Vendor Item:-"/>
                        <Button>
                            <Link to={"/vendors_edititem/"+item._id}>
                                <FontAwesomeIcon icon={ faEdit } color="blue" size={25} />
                            </Link>
                        </Button>
                    </View>
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
                            buyer.map((it)=>{
                                if(it.pool_id==item.vendor_pool)
                                if(it.nick_name.toUpperCase().search(searchQuery.toUpperCase())!=-1){
                                    return (
                                        <Menu.Item title={it.nick_name} onPress={()=>chooseBuyer(it._id, it.email)} />
                                    )
                                }
                            })
                            :
                            <Menu.Item title="No Buyer" />
                        }
                    </Menu>
                    <Card.Content>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex:1, marginTop: '2%', }}>
                                {item.image ?
                                        <Image
                                            style={{width: 200, height: 210, border: '1px solid black'}}
                                            source={item.image}
                                        />
                                    :
                                        <Text>No Image</Text>
                                }
                            </View>
                            <View style={{ flex:3, }}>
                                <TextInput style={styles.input} mode="outlined" label="Item Name" value={item.item_name}/>
                                <TextInput style={styles.input} mode="outlined" label="Item Category" value={item.category_name}/>
                                <TextInput style={styles.input} mode="outlined" label="Item Grade" value={item.grade_name}/>
                            </View>
                        </View>
                        <TextInput style={styles.input} mode="outlined" label="Item Unit" value={item.unit_name}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Price" value={item.item_price}/>
                        <TextInput style={styles.input} mode="outlined" label="Item Description" multiline value={item.description}/>
                        <TextInput style={styles.input} mode="outlined" label="Address" value={item.address}/>
                        <TextInput style={styles.input} mode="outlined" label="Landmark" value={item.landmark}/>
                        <TextInput style={styles.input} mode="outlined" label="District" value={item.district}/>
                        <TextInput style={styles.input} mode="outlined" label="State" value={item.state}/>
                        <TextInput style={styles.input} mode="outlined" label="country" value={item.country}/>
                        <TextInput style={styles.input} mode="outlined" label="Pin Code" value={item.postal_code}/>
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