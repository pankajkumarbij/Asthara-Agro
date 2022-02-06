import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Stacks from './stacks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent({navigation}) {

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [roleas, setRoleas] = useState("");
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        async function fetchData() {
            await AsyncStorage.getItem('loginemail')
            .then((loginemail) => {
                setEmail(loginemail);
            })
            if(flag==false) {
                await AsyncStorage.getItem('role')
                .then((role) => {
                    setRole(role);
                    setRoleas(role);
                    setFlag(true);
                })
            }
        }
        fetchData();
    }, [email, role, flag]);

    function changeRole(r){
        setRoleas(r);
    }

    const Logout = async (value) => {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('loginemail');
        await AsyncStorage.removeItem('role');
        await AsyncStorage.removeItem('loginuserid');
        setEmail("");
        console.log("Logout Success");
    }

    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [visible6, setVisible6] = useState(false);

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
    const openMenu6 = () => setVisible6(true);
    const closeMenu6 = () => setVisible6(false);

    return (
        <Provider theme={theme}> 
            {email!=null && email!="" ?
            <>
                <Avatar.Text size={70} label="A" style={{alignSelf:'center',marginTop:'15%'}} />
                <Button style={{width:280}} color="green" style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Profile')}}>{email}</Button>
                {role!=null && role=="manager" ?
                    <Menu
                    visible={visible6}
                    onDismiss={closeMenu6}
                    anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu6}>{roleas}</Button>}>
                        <Menu.Item title="manager" onPress={()=>changeRole("manager")} />
                        <Menu.Item title="sales" onPress={()=>changeRole("sales")} />
                        <Menu.Item title="buyer" onPress={()=>changeRole("buyer")} />
                        <Menu.Item title="accountant" onPress={()=>changeRole("accountant")} />
                        <Menu.Item title="customer" onPress={()=>changeRole("customer")} />
                        <Menu.Item title="vendor" onPress={()=>changeRole("vendor")} />
                    </Menu>
                    :
                    <Button style={styles.drawerbutton} mode="outlined">{role}</Button>
                }
                <Button style={styles.drawerbutton} mode="outlined" onPress={()=>Logout()}>Logout</Button>
            </>
            :
            <>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Register')}}>Register</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Login')}}>Login</Button>
            </>
            }
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Services </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Home')}}>Home</Button>
            <Menu
            visible={visible2}
            onDismiss={closeMenu2}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu2}>Dashboard</Button>}>
            {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                <Menu.Item title="Add Item" onPress={() => {navigation.navigate('AddItem')}} />
            }
                <Menu.Item title="All Items" onPress={() => {navigation.navigate('AllItems')}} />
            {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                <Menu.Item title="Add Item Category" onPress={() => {navigation.navigate('AddItemCategory')}} />
            }
            <Menu.Item title="All Item Category" onPress={() => {navigation.navigate('AllItemCategories')}} />
            {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                <Menu.Item title="Add Item Unit" onPress={() => {navigation.navigate('AddItemUnit')}} />
            }
            <Menu.Item title="All Item Unit" onPress={() => {navigation.navigate('AllItemUnits')}} />
            {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
                <Menu.Item title="Add Item Grade" onPress={() => {navigation.navigate('AddItemGrade')}} />
            }
            <Menu.Item title="All Item Grade" onPress={() => {navigation.navigate('AllItemGrades')}} />
            {(roleas=="sales" || roleas=="manager") &&
                <Menu.Item title="Create Order" onPress={() => {navigation.navigate('CreateOrder')}} />
            }
            {(roleas=="sales" || roleas=="buyer" || roleas=="manager" || roleas=="accountant") &&
                <Menu.Item title="All Orders" onPress={() => {navigation.navigate('AllOrders')}} />
            }
            {(roleas=="buyer" || roleas=="manager") &&
            <>
                <Menu.Item title="Create Indent" onPress={() => {navigation.navigate('Create_Indent')}} />
                <Menu.Item title="All Indents" onPress={() => {navigation.navigate('All_Indents')}} />
                <Menu.Item title="Create Purchase Order" onPress={() => {navigation.navigate('Create_Purchase_Order')}} />
                {/* <Menu.Item title="All Purchase Orders" onPress={() => {navigation.navigate('All_Purchase_Orders')}} /> */}
            </>
            }
            {(roleas=="vendor" || roleas=="buyer" || roleas=="manager" || roleas=="accountant") &&
                <Menu.Item title="All Purchase Orders" onPress={() => {navigation.navigate('All_Purchase_Orders')}} />
            }
            </Menu>
            <Menu
            visible={visible1}
            onDismiss={closeMenu1}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu1}>User Management</Button>}>
            {roleas=="manager" &&
            <>
                <Menu.Item title="Add User" onPress={() => {navigation.navigate('Register')}} />
                <Menu.Item title="All Users" onPress={() => {navigation.navigate('AllUsers')}} />
                <Menu.Item title="Add User Category" onPress={() => {navigation.navigate('AddUserCategory')}} />
                <Menu.Item title="All User Category" onPress={() => {navigation.navigate('AllUserCategories')}} />
            </>
            }
            {(roleas=="sales" || roleas=="buyer" || roleas=="manager") &&
            <>
                <Menu.Item title="Add Vendor" onPress={() => {navigation.navigate('AddVendor')}} />
                <Menu.Item title="All Vendors" onPress={() => {navigation.navigate('AllVendors')}} />
            </>
            }
            {(roleas=="sales" || roleas=="manager") &&
            <>
                <Menu.Item title="Add Customer" onPress={() => {navigation.navigate('AddCustomer')}} />
                <Menu.Item title="All Customers" onPress={() => {navigation.navigate('AllCustomers')}} />
            </>
            }
            </Menu>
            <Menu
            visible={visible5}
            onDismiss={closeMenu5}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu5}>Reports</Button>}>
                <Menu.Item title="Items" onPress={() => {navigation.navigate('AddItem')}} />
                <Menu.Item title="Sales Order" onPress={() => {navigation.navigate('AllItems')}} />
            </Menu>
            <Menu
            visible={visible4}
            onDismiss={closeMenu4}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu4}>Inventory</Button>}>
                <Menu.Item title="Show Inventory" onPress={() => {navigation.navigate('AddItem')}} />
                <Menu.Item title="All Inventories" onPress={() => {navigation.navigate('Home')}} />
            </Menu>
            <Menu
            visible={visible3}
            onDismiss={closeMenu3}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu3}>Assignments</Button>}>
                <Menu.Item title="Delivery" onPress={() => {navigation.navigate('AddItem')}} />
                <Menu.Item title="Show All Delivery" onPress={() => {navigation.navigate('Home')}} />
            </Menu>
        </Provider> 
    );
}

export default function Drawers() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="stack" component={Stacks} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    drawerbutton: {
        width: '80%',
        alignSelf:'center',
        marginTop:'5%',
        borderColor: 'green',
    }
});
