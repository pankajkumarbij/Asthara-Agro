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

    const [visible6, setVisible6] = useState(false);

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
                <Menu.Item title="Add Item" onPress={() => {navigation.navigate('AddItem')}} />
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
