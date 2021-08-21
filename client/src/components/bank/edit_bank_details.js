import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform} from 'react-native';
import { TextInput, Card, Button, Provider, DefaultTheme } from 'react-native-paper';

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

    var bankid = "";
    var id="";
    if(Platform.OS=="android"){
        id = route.params.bankId;
    }
    else{
       bankid = props.match.params.bankid;
    }
    //initialize all required state variables
    const [bankId,setBankId]=useState("");
    const [userId, setUserId] = useState('');
    const [bankName, setBankName] = useState("");
    const [branchName, setBranchName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolderName, setAccountHolderName] = useState("");
    const [ifsccode, setIfsccode] = useState("");
    const [host, setHost] = useState("");
    //fetch corresponding the bank details data for edit
    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setBankId(id);
        }
        else{
            setHost("localhost");
            setBankId(bankid);
        }

        if(bankId){
            fetch(`http://${host}:5000/retrive_bank/${bankId}`, {
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
            });
        }
    }, [host,id,bankId,bankid]);
    //define a function for sending the data in corresponding database
    function submitForm() {
        fetch(`http://${host}:5000/update_bank/${bankId}`, {
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
                ifsc_code: ifsccode
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
            setBankName("");
            setBranchName("");
            setAccountNumber("");
            setAccountHolderName("");
            setIfsccode("");
        }); 
    }
    //define all the required input fields
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignUsers: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Update Bank Details"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="Bank Name" value={bankName} multiline onChangeText={bankName => setBankName(bankName)} />
                    <TextInput style={styles.input} mode="outlined" label="Branch Name" value={branchName} onChangeText={branchName => setBranchName(branchName)} />
                    <TextInput style={styles.input} mode="outlined" label="Account Number" value={accountNumber} onChangeText={accountNumber => setAccountNumber(accountNumber)} />
                    <TextInput style={styles.input} mode="outlined" label="Account Holder Name" value={accountHolderName} onChangeText={accountHolderName => setAccountHolderName(accountHolderName)} />
                    <TextInput style={styles.input} mode="outlined" label="Ifsc Code" value={ifsccode} onChangeText={ifsccode => setIfsccode(ifsccode)} />
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
