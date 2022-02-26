import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView} from 'react-native';
import { Avatar, Button, Menu, Provider, DefaultTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Stacks from './stacks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

    const [visible6, setVisible6] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [visible3, setVisible3] = useState(false);
    const [visible4, setVisible4] = useState(false);
    const [visible5, setVisible5] = useState(false);
    const [visible7, setVisible7] = useState(false);
    const [visible8, setVisible8] = useState(false);
    const [visible9, setVisible9] = useState(false);
    const [visible10, setVisible10] = useState(false);
    const [visible11, setVisible11] = useState(false);
    const [visible12, setVisible12] = useState(false);
    const [visible13, setVisible13] = useState(false);
    const [visible14, setVisible14] = useState(false);
    const [visible15, setVisible15] = useState(false);
    const [visible16, setVisible16] = useState(false);
    const [visible17, setVisible17] = useState(false);
    const [visible18, setVisible18] = useState(false);
    const [visible19, setVisible19] = useState(false);
    const [visible20, setVisible20] = useState(false);
    const [visible21, setVisible21] = useState(false);
    const [visible22, setVisible22] = useState(false);
    const [visible23, setVisible23] = useState(false);
    const [visible24, setVisible24] = useState(false);
    const [visible25, setVisible25] = useState(false);
    const [visible26, setVisible26] = useState(false);
    const [visible27, setVisible27] = useState(false);
    const [visible28, setVisible28] = useState(false);
    const [visible29, setVisible29] = useState(false);
    const [visible30, setVisible30] = useState(false);
    const [visible31, setVisible31] = useState(false);
    const [visible32, setVisible32] = useState(false);
    const [visible33, setVisible33] = useState(false);
    const [visible34, setVisible34] = useState(false);
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
    }, [flag]);

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

    const openMenu6 = () => setVisible6(true);
    const closeMenu6 = () => setVisible6(false);
    const openMenu2 = () => setVisible2(true);
    const closeMenu2 = () => setVisible2(false);
    const openMenu3 = () => setVisible3(true);
    const closeMenu3 = () => setVisible3(false);
    const openMenu4 = () => setVisible4(true);
    const closeMenu4 = () => setVisible4(false);
    const openMenu5 = () => setVisible5(true);
    const closeMenu5 = () => setVisible5(false);
    const openMenu7 = () => setVisible7(true);
    const closeMenu7 = () => setVisible7(false);
    const openMenu8 = () => setVisible8(true);
    const closeMenu8 = () => setVisible8(false);
    const openMenu9 = () => setVisible9(true);
    const closeMenu9 = () => setVisible9(false);
    const openMenu10 = () => setVisible10(true);
    const closeMenu10 = () => setVisible10(false);
    const openMenu11 = () => setVisible11(true);
    const closeMenu11 = () => setVisible11(false);
    const openMenu12 = () => setVisible12(true);
    const closeMenu12 = () => setVisible12(false);
    const openMenu13 = () => setVisible13(true);
    const closeMenu13 = () => setVisible13(false);
    const openMenu14 = () => setVisible14(true);
    const closeMenu14 = () => setVisible14(false);
    const openMenu15 = () => setVisible15(true);
    const closeMenu15 = () => setVisible15(false);
    const openMenu16 = () => setVisible16(true);
    const closeMenu16 = () => setVisible16(false);
    const openMenu17 = () => setVisible17(true);
    const closeMenu17 = () => setVisible17(false);
    const openMenu18 = () => setVisible18(true);
    const closeMenu18 = () => setVisible18(false);
    const openMenu19 = () => setVisible19(true);
    const closeMenu19 = () => setVisible19(false);
    const openMenu20 = () => setVisible20(true);
    const closeMenu20 = () => setVisible20(false);
    const openMenu21 = () => setVisible21(true);
    const closeMenu21 = () => setVisible21(false);
    const openMenu22 = () => setVisible22(true);
    const closeMenu22 = () => setVisible22(false);
    const openMenu23 = () => setVisible23(true);
    const closeMenu23 = () => setVisible23(false);
    const openMenu24 = () => setVisible24(true);
    const closeMenu24 = () => setVisible24(false);
    const openMenu25 = () => setVisible25(true);
    const closeMenu25 = () => setVisible25(false);
    const openMenu26 = () => setVisible26(true);
    const closeMenu26 = () => setVisible26(false);
    const openMenu27 = () => setVisible27(true);
    const closeMenu27 = () => setVisible27(false);
    const openMenu28 = () => setVisible28(true);
    const closeMenu28 = () => setVisible28(false);
    const openMenu29 = () => setVisible29(true);
    const closeMenu29 = () => setVisible29(false);
    const openMenu30 = () => setVisible30(true);
    const closeMenu30 = () => setVisible30(false);
    const openMenu31 = () => setVisible31(true);
    const closeMenu31 = () => setVisible31(false);
    const openMenu32 = () => setVisible32(true);
    const closeMenu32 = () => setVisible32(false);
    const openMenu33 = () => setVisible33(true);
    const closeMenu33 = () => setVisible33(false);
    const openMenu34 = () => setVisible34(true);
    const closeMenu34 = () => setVisible34(false);
    // console.log(role);
    
    return (
        <Provider theme={theme}> 
        <ScrollView>
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
            
            {role === "manager" ?
            <>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Dashboard </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> *Pool Management </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible15}
            onDismiss={closeMenu15}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu15}>Customer Pool</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddCustomerPool')}}>Add Pool</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllCustomerPools')}}>View Pools</Button>
            </Menu>
            <Menu
            visible={visible16}
            onDismiss={closeMenu16}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu16}>Vendor Pool</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddVendorPool')}}>Add Pool</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllVendorPools')}}>View Pools</Button>
            </Menu>
            <Menu
            visible={visible17}
            onDismiss={closeMenu17}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu17}>Manager Pool</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddManagerPool')}}>Add Pool</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllManagerPools')}}>View Pools</Button>
            </Menu>
            <Menu
            visible={visible18}
            onDismiss={closeMenu18}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu18}>Customer Vendor Cross Pool</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddCustomerVendorPool')}}>Add Cross Pool</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllCustomerVendorPools')}}>View Vendor Pools</Button>
            </Menu>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> *Inventory Management </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible2}
            onDismiss={closeMenu2}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu2}>Item</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddItem')}}>Add Item</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllItems')}}>View Items</Button>
            </Menu>
            <Menu
            visible={visible3}
            onDismiss={closeMenu3}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu3}>Item Category</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddItemCategory')}}>Add Item Category</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllItemCategories')}}>view Category</Button>
            </Menu>
            <Menu
            visible={visible4}
            onDismiss={closeMenu4}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu4}>Item Unit</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddItemUnit')}}>Add Item Unit</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllItemUnits')}}>View Item Units</Button>
            </Menu>
            <Menu
            visible={visible5}
            onDismiss={closeMenu5}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu5}>Item Grade</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddItemGrade')}}>Add Item Grade</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllItemGrades')}}>View Item Grades</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> *Order Management </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible7}
            onDismiss={closeMenu7}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu7}>Order</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllOrders')}}>View All Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('ApprovedOrders')}}>View Approved Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('PendingOrders')}}>View pending Orders</Button>
            </Menu>
            <Menu
            visible={visible8}
            onDismiss={closeMenu8}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu8}>Purchase Order</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Purchase_Orders')}}>View Purchase Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Purchase_Orders')}}>View Pending Purchase Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Purchase_Orders')}}>View Accepted Purchase Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Purchase_Order_Confirm')}}>View Purchase Order Confirm</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Purchase_Order_Confirm')}}>View Pending Purchase Confirm</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Purchase_Order_Confirm')}}>View Accepted Purchase Confirm</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> User Management </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible9}
            onDismiss={closeMenu9}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu9}>User</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Register')}}>Add User</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('ViewUser')}}>View Users</Button>
            </Menu>
            <Menu
            visible={visible10}
            onDismiss={closeMenu10}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu10}>User Category</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddUserCategory')}}>Add User Category</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllUserCategories')}}>View User Categories</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> Reports </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible11}
            onDismiss={closeMenu11}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu11}>Disabled</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Disabled_All_Items')}}>Disabled Items</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('DisabledAllItemCategories')}}>Disabled Item Category</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('DisabledAllItemUnit')}}>Disabled Item Unit</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('DisabledAllItemGrade')}}>Disabled Item Grade</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('DisabledAllUsers')}}>Disabled Users</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('DisabledAllUserCategories')}}>Disabled User Category</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Disabled_Customer_details')}}>Disabled Customers</Button>
            </Menu>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('OrderItemsSummary')}}>Order Items Summary</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllCompletedOrders')}}>View Completed Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Completed_Purchase_Orders')}}>All Completed Purchase Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Customer_Account_Delete_Requests')}}>Delete Account Requests</Button>
            
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> Assignment </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible12}
            onDismiss={closeMenu12}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu12}>Pickup Assignment</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pickup_Assignment')}}>View Pickup Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Pickup_Assignment')}}>View Pending Pickup Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Pickup_Assignment')}}>View Accepted Pickup Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pickup_Assignment_Confirm_Buyer')}}>View Pickup Confirmed by Buyer</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pickup_Assignment_Confirm')}}>All Pickup Confirmed</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Pickup_Assignment_Confirm_Vendor')}}>All Pending Pickup Assignment Confirm Vendor</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Pickup_Assignment_Confirm_Vendor')}}>All Accepted Pickup Assignment Confirm Vendor</Button>
            </Menu>
            <Menu
            visible={visible13}
            onDismiss={closeMenu13}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu13}>Delivery Assignment</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery_Assignment')}}>View Delivery Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Delivery_Assignment')}}>View Pending Delivery Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Delivery_Assignment')}}>View Accepted Delivery Assignment</Button>
            </Menu>
            <Menu
            visible={visible14}
            onDismiss={closeMenu14}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu14}>Delivery</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery')}}>All Delivery</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Delivery')}}>All Confirm Delivery</Button>
            </Menu>
            </> :
            <></>
        }
            {role === "sales" ? 
            <>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Dashboard </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> *Order Management </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible19}
            onDismiss={closeMenu19}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu19}>Order</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('CreateOrder')}}>Create Order</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllOrders')}}>View Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('ApprovedOrders')}}>View Approved Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('PendingOrders')}}>View Pending Orders</Button>
            </Menu>
            <Menu
            visible={visible20}
            onDismiss={closeMenu20}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu20}>Customer Address</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Add_customer_Address')}}>Add new customer address</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_addresses')}}>All Customer Addresses</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> User Management </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible21}
            onDismiss={closeMenu21}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu21}>Customer</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Register')}}>Add Customer</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Customer_details')}}>View Customers</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> Assignments </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible22}
            onDismiss={closeMenu22}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu22}>Delivery Assignment</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery_Assignment')}}>View Delivery Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Delivery_Assignment')}}>View Pending Delivery Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Delivery_Assignment')}}>View Accepted Delivery Assignment</Button>
            </Menu>
            <Menu
            visible={visible23}
            onDismiss={closeMenu23}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu23}>Delivery</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery')}}>All Delivery</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Delivery')}}>All Confirm Delivery</Button>
            </Menu>
            </>
            : <></>
            }
            {role === "vendor" ?
            <>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Dashboard </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> *Inventory Management </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible24}
            onDismiss={closeMenu24}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu24}>Add Item</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('VendorAddItem')}}>Add Item</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllOrders')}}>View Items</Button>
            </Menu>
            <Menu
            visible={visible25}
            onDismiss={closeMenu25}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu25}>Add Address</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Add_vendor_Address')}}>Add new pickup address</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_addressesVendor')}}>All addresses</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> *Order Management </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible26}
            onDismiss={closeMenu26}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu26}>Purchase Order</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Purchase_Orders')}}>View Purchase Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Purchase_Orders')}}>View Pending Orders</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Purchase_Orders')}}>View Accepted Orders</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Assignment </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible27}
            onDismiss={closeMenu27}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu27}>Pickup Assignment</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pickup_Assignment_Confirm')}}>All Pickup Assignment Confirm</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Pickup_Assignment_Confirm_Vendor')}}>All Pending Pickup Assignment Confirm Vendor</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Pickup_Assignment_Confirm_Vendor')}}>All Accepted Pickup Assignment Confirm Vendor</Button>
            </Menu>
            </> :
            <></>
        }
        {role === "buyer" ?
            <>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Dashboard </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Transport Labour </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible28}
            onDismiss={closeMenu28}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu28}>Transport Labour from Vendor</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddTransportLabourFromVendor')}}>Add Transport Labour</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllTransportLabourFromVendor')}}>View Transport Labour</Button>
            </Menu>
            <Menu
            visible={visible29}
            onDismiss={closeMenu29}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu29}>Transport Labour for Sales</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AddTransportLabour')}}>Add Transport Labour</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllTransportLabourForSales')}}>View Transport Labour</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> User Management </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible30}
            onDismiss={closeMenu30}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu30}>Vendor</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Register')}}>Add Vendor</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Vendor_details')}}>View Vendor</Button>
            </Menu>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                <View>
                    <Text style={{textAlign: 'center'}}> Reports </Text>
                </View>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Completed_Purchase_Orders')}}>All Completed Purchase Orders</Button>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Assignment </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible31}
            onDismiss={closeMenu31}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu31}>Pickup Assignment</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pickup_Assignment')}}>View Pickup Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Pickup_Assignment')}}>View Pending Pickup Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Pickup_Assignment')}}>View Accepted Pickup Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pickup_Assignment_Confirm_Buyer')}}>View Pickup Confirmed by Buyer</Button>
            </Menu>
            </> :
            <></>
    }
    {role === "customer" ?
        <>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Assignment </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible32}
            onDismiss={closeMenu32}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu32}>Delivery</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery')}}>All Delivery</Button>
            </Menu>
            </> :
            <></>
    }
    {role === "accountant" ?
        <>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Reports </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('AllCompletedOrders')}}>View Completed Orders</Button>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center', width: '80%', marginTop: '5%'}}>
            <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
                    <View>
                        <Text style={{textAlign: 'center'}}> Assignment </Text>
                    </View>
                <View style={{flex: 1, height: 2, backgroundColor: 'blue'}} />
            </View>
            <Menu
            visible={visible33}
            onDismiss={closeMenu33}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu33}>Delivery Assignment</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery_Assignment')}}>View Delivery Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Pending_Delivery_Assignment')}}>View Pending Delivery Assignment</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Delivery_Assignment')}}>View Accepted Delivery Assignment</Button>
            </Menu>
            <Menu
            visible={visible34}
            onDismiss={closeMenu34}
            anchor={<Button style={styles.drawerbutton} mode="outlined" onPress={openMenu34}>Delivery</Button>}>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Delivery')}}>All Delivery</Button>
                <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('All_Accepted_Delivery')}}>All Confirm Delivery</Button>
            </Menu>
            </> :
            <></>
    }
        </ScrollView>
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
