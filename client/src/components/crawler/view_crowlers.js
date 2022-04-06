import React, {useState,useEffect} from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import { retrieve_crawler_by_id } from '../../services/crawler';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function ViewCrawler(props, { navigation, route }) {

    var itemid = "";
    if(Platform.OS=="android"){
        itemid = route.params.id;
    }
    else{
        itemid = props.match.params.id;
    }

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);

    const [item, setItem] = useState("Choose item");
    const [grade, setGrade] = useState("Choose Grade");
    const [unit,setUnit]=useState("Select unit of each item");
    const [price,setPrice]=useState("");
    const [items1, setItems1] = useState(['']);

    useEffect(() => {

        if(itemid){
            //Retrieve crowler by Id
            retrieve_crawler_by_id(itemid)
            .then(result=> {
                console.log(result);
                setItem(result[0].item_name);
                setGrade(result[0].item_grade);
                setUnit(result[0].item_unit);
                setPrice(result[0].price);
                setItems1(result[0].postal_code);
            })
        }

    }, [itemid]);

    return (
        <Provider theme={theme}>
            <SafeAreaView>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title titleStyle={styles.title} title="View crawler"/>
                    <Card.Content>
                    <Menu key={1}
                        visible={visible1}
                        onDismiss={closeMenu1}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{item}</Button>}>
                    </Menu>
                    <Menu key={2}
                        visible={visible2}
                        onDismiss={closeMenu2}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{grade}</Button>}>
                    </Menu>
                    <Menu key={3}
                        visible={visible3}
                        onDismiss={closeMenu3}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu3}>{unit}</Button>}>
                    </Menu>
                        {items1.map((it, index) => (
                        <View>
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={it} maxLength={6} />
                        </View> 
                    ))}
                    <TextInput style={styles.input} mode="outlined" label="Price" value={price}/>            
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