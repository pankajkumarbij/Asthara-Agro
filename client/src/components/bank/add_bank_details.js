import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme , Menu} from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import {bank_url} from '../../utils/bank';
import axios from 'axios';
import { url } from '../../utils/url';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};
//define add bank details component
export default function AddBankDetails(props, {route}) {

    var userid = '';
    if (Platform.OS === 'android'){
        userid = route.params.userid;
    }
    else {
        userid = props.match.params.userid;
    }

    let history = useHistory();

    //initialize all required state variables
    const [userId, setUserId] = useState('');
    const [bankName, setBankName] = useState('');
    const [branchName, setBranchName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirm_AccountNumber, setConfirm_AccountNumber] = useState('');
    const [accountHolderName, setAccountHolderName] = useState('');
    const [ifsccode, setIfsccode] = useState('');
    const [flag,setFlag] = useState(false);
    const [error,setError] = useState('');
    const [account_error,setAccount_error] = useState(false);
    const [account_type,setAccount_type] = useState('Choose Account Type');
    const [visible1, setVisible1] = useState(false);
    //fetch login user information for store corresponding the bank details data
    useEffect(() => {

        if (userid){
            setUserId(userid);
        }
        if (ifsccode.length === 11 && ifsccode)
        {
            axios.get(bank_url+ifsccode)
            .then(result =>{
                //console.log(result.data);
                setBankName(result.data.BANK);
                setBranchName(result.data.BRANCH);
                setFlag(true);
                setError('');
            })
            .catch(err => {
                console.log(err)
                setError('Invalid IFSC Code');
                
            });
        }
        else {
                setFlag(false);
                setBankName('');
                setBranchName('');
        }

    }, [ userid,ifsccode,accountNumber,confirm_AccountNumber]);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`${url}/create_bank`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                bank_name: bankName,
                branch_name: branchName,
                account_number: accountNumber,
                account_holder_name: accountHolderName,
                confirm_AccountNumber:confirm_AccountNumber,
                ifsc_code: ifsccode,
                account_type: account_type
            })
        })
        .then(res => res.json())
        .catch(er => console.log(er))
        .then(data => {
            console.log(data);
            if (data.bank !== '')
            {
                history.push('/viewuser/' + userId);
            }
            alert(data.message);
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
                    <Card.Title title="Add Bank Details"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Ifsc Code" value={ifsccode} onChangeText={e => setIfsccode(e)} />
                    { error && 
                        <p id={1} style={styles.p}>{error}</p>
                    }
                    { flag &&
                        <>
                            <TextInput style={styles.input} mode="outlined" label="Bank Name" value={bankName} />
                            <TextInput style={styles.input} mode="outlined" label="Branch Name" value={branchName}  />
                        </>
                    }
                    <TextInput style={styles.input} mode="outlined" label="Account Number" value={confirm_AccountNumber} onChangeText={e => setConfirm_AccountNumber(e)} secureTextEntry={true}/>
                    <TextInput style={styles.input} mode="outlined" label="Confirm Account Number" value={accountNumber} onChangeText={accountN => setAccountNumber(accountN)} />
                    { account_error && 
                        <span id={2} style={styles.p}>{account_error}</span>
                    }
                    <TextInput style={styles.input} mode="outlined" label="Account Holder Name" value={accountHolderName} onChangeText={accountHolderN => setAccountHolderName(accountHolderN)} />
                    <Menu
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{account_type}</Button>}>
                        <Menu.Item title="Current account" onPress={()=>chooseAccountType('Current account')} />
                        <Menu.Item title="Savings account" onPress={()=>chooseAccountType('Savings account')} />
                    </Menu>
                    <Button mode="contained" style={styles.button} onPress={()=>submitForm()}>Add Bank Details</Button>
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
        alignUsers: 'center', 
        justifyContent: 'center' 
    },
    p :{
        color:"red"
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
