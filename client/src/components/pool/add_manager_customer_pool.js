import { faPlusCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Card, Button, Menu, Searchbar } from 'react-native-paper';
import { Link, useHistory } from 'react-router-dom';
import { all_customer_pools, all_manager_pools } from '../../services/pool';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function AddCustomerManagerPool(props,{ navigation }) {

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [searchQuery1, setSearchQuery1] = useState('');
    const [searchQuery2, setSearchQuery2] = useState('');
    const [customers, setCustomers] = useState();
    const [managers, setManagers] = useState();
    const [customer, setCustomer] = useState("Choose Customer Pool");
    const [manager, setManager] = useState("Choose Manager Pool");
    const [customerId, setCustomerId] = useState("");
    const [managerId, setManagerId] = useState("");

    useEffect(() => {
        //Retrieve all customer list
        all_customer_pools()
        .then(result => {
            setCustomers(result);
        })

        //Retrieve all vendor list
        all_manager_pools()
        .then(result => {
            setManagers(result);
        })

    }, [customers, managers]);

    let history = useHistory();

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);

    function ChooseCustomer(id, poolName){
        setCustomerId(id);
        setCustomer(poolName);
        closeMenu1();
    }

    function ChooseManager(id, poolName){
        setManagerId(id);
        setManager(poolName);
        closeMenu2();
    }

    function submitForm() {
        fetch(`http://localhost:5000/create_manager_customer_cross_pool`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                customer_pool_name: customer,
                customer_pool_Id: customerId,
                manager_pool_name: manager,
                manager_pool_Id: managerId
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            if(Platform.OS=='android'){
                navigation.navigate('AllManagerPools');
            }
            else{
                history.push('/allcustomermanagerpools');
            }
            
        });
        fetch(`http://localhost:5000/updateflag2_customer_pool/${customerId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               flag_value:1
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            //alert(data.message);
        });       
    }

    const onChangeSearch1 = query => setSearchQuery1(query);
    const onChangeSearch2 = query => setSearchQuery2(query);
    
    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="New Customer Manager Cross Pool"/>
                    <Card.Content>
                        <Menu
                        visible={visible1}
                        onDismiss={closeMenu1}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{customer}</Button>}>
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
                                <Link to="/addcustomerpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Customer Pool</Button></Link>
                            }
                            {customers ?
                                customers.map((item)=>{
                                    if(item.flag2_value === 0){
                                        return (
                                            <Menu.Item title={item.pool_name} onPress={()=>ChooseCustomer(item._id, item.pool_name)} />
                                        )
                                    }
                                })
                                :
                                <Menu.Item title="No Customer Pool Available" />
                            }
                        </Menu>
                        <Menu
                        visible={visible2}
                        onDismiss={closeMenu2}
                        anchor={<Button style={styles.input} mode="outlined" onPress={openMenu2}>{manager}</Button>}>
                            <Searchbar
                                icon={() => <FontAwesomeIcon icon={ faSearch } />}
                                clearIcon={() => <FontAwesomeIcon icon={ faTimes } />}
                                placeholder="Search"
                                onChangeText={onChangeSearch2}
                                value={searchQuery2}
                            />
                            {Platform.OS=='android' ?
                                <Button icon={() => <FontAwesomeIcon icon={ faPlusCircle } />} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Grade</Button>
                                :
                                <Link to="/addvendorpool"><Button mode="outlined" icon={() => <FontAwesomeIcon icon={ faPlusCircle } />}>Add Vendor Pool</Button></Link>
                            }
                            {managers ?
                                managers.map((item)=>{
                                    return (
                                        <Menu.Item title={item.pool_name} onPress={()=>ChooseManager(item._id, item.pool_name)} />
                                    )
                                })
                                :
                                <Menu.Item title="No Vendor Pool Available" />
                            }
                        </Menu>
                        <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Submit</Button>
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
    button: {
        marginTop: '2%',
    }
}); 