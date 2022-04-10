import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme,Menu } from 'react-native-paper';
import {url}  from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define edit bank details component
export default function EditBankDetails(props, {route}) {

    var bankid = '';
    var id = '';
    if (Platform.OS === 'android'){
        id = route.params.bankId;
    }
    else {
       bankid = props.match.params.bankid;
    }
    //initialize all required state variables
    const [bankId,setBankId] = useState('');
    const [userId, setUserId] = useState('');
    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [ifsccode, setIfsccode] = useState('');
    const [account_type,setAccount_type] = useState('Choose Account Type');
    const [visible1, setVisible1] = useState(false);
    //fetch corresponding the bank details data for edit
    useEffect(() => {
        if (Platform.OS === 'android'){
            setBankId(id);
        }
        else {
            setBankId(bankid);
        }

        if (bankId){
            fetch(`${url}}/retrive_bank/${bankId}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setUserId(item[0].userId);
                setBankName(item[0].bank_name);
                setBranchName(item[0].branch_name);
                setAccountNumber(item[0].account_number);
                setAccountHolderName(item[0].account_holder_name);
                setIfsccode(item[0].ifsc_code);
                setAccount_type(item[0].account_type);
            });
        }
        
    }, [id,bankId,bankid]);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`${url}/update_bank/${bankId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                bank_name: bankName,
                branch_name: branchName,
                account_number: accountNumber,
                account_holder_name: accountHolderName,
                ifsc_code: ifsccode,
                account_type:account_type
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            //console.log(data);
            setBankName('');
            setBranchName('');
            setAccountNumber('');
            setAccountHolderName('');
            setIfsccode('');
            setAccount_type('Choose Account Type');
        }); 
    }
    function chooseAccountType(accountType){
        setAccount_type(accountType);
        closeMenu1();
    }
    //define all the required input fields
    return (
        <Provider theme={theme}>
            <View style={styles.view}>
                <Card style={styles.card}>
                    <Card.Title title="Update Bank Details"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Ifsc Code" value={ifsccode} onChangeText={ifsccode => setIfsccode(ifsccode)} />
                    <TextInput style={styles.input} mode="outlined" label="Bank Name" value={bankName} multiline onChangeText={bankName => setBankName(bankName)} />
                    <TextInput style={styles.input} mode="outlined" label="Branch Name" value={branchName} onChangeText={branchName => setBranchName(branchName)} />
                    <TextInput style={styles.input} mode="outlined" label="Account Number" value={accountNumber} onChangeText={accountNumber => setAccountNumber(accountNumber)} />
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{account_type}</Button>}>
                        <Menu.Item title="Current account" onPress={()=>chooseAccountType("Current account")} />
                        <Menu.Item title="Savings account" onPress={()=>chooseAccountType("Savings account")} />
                        <Menu.Item title="Salary account" onPress={()=>chooseAccountType("Salary account")} />
                        <Menu.Item title="Fixed deposit account" onPress={()=>chooseAccountType("Fixed deposit account")} />
                        <Menu.Item title="Recurring deposit account" onPress={()=>chooseAccountType('Recurring deposit account')} />
                        <Menu.Item title="NRI accounts" onPress={()=>chooseAccountType("NRI accounts")} />
                    </Menu>
                    <TextInput style={styles.input} mode="outlined" label="Account Holder Name" value={accountHolderName} onChangeText={accountHolderN=> setAccountHolderName(accountHolderN)} />
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Update Bank details</Button>
                    </Card.Content>
                </Card>
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
    view : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center' 
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
