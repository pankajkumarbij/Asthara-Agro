import React, { useState } from 'react';
import { View, StyleSheet, Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button, Menu } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { url } from '../../utils/url';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../../services/image';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function BackgroundInfo({ navigation }) {

    const [Items, setItems] = useState([{ name: '', fathername: '', totalland: '', village: '', pincode: '', soiltype: '', fpo: '', contact: '', aadhar: '', pancard: '', krishicard: '', members: '', adults: '', childs: '' }]);
    const [family, setfamily] = useState([{ name: '', relation: '', dob: '' }]);
    const [bank, setbank] = useState([{ bankname: '', amount: '' ,datecredit:'', pendingamount: '', rateofinterest: '', typeofloan: 'Choose Loaner', duration: '',}]);

    const [landError, setlandError] = useState(['']);
    const [mobileError, setmobileError] = useState(['']);
    const [namerror, setnamerror] = useState(['']);
    const [faterror, setfaterror] = useState(['']);
    const [villerror, setvillerror] = useState(['']);
    const [soilerror, setsoilerror] = useState(['']);
    const [fpoerror, setfpoerror] = useState(['']);
    const [addharerror, setaddharerror] = useState(['']);
    const [panerror, setpanerror] = useState(['']);
    const [pinerror, setpinerror] = useState(['']);
    const [krishierror, setkrishierror] = useState(['']);
    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [file2, setFile2] = useState();
    const [img2, setImg2] = useState();
    const [file3, setFile3] = useState();
    const [img3, setImg3] = useState();
    const [visible4, setVisible4] = useState([]);

    let history = useHistory();


    const ItemChange1 = (index, newname) => {

        const error = [...namerror];
        if (newname.length == 0) {
            error[index] = "required";
            setnamerror(error);
        }
        else {
            error.splice(index, 1);
            setnamerror(error);

        }


        var value = [...Items];
        value[index].name = newname;
        setItems(value);
    }

    const ItemChange2 = (index, newfathername) => {

        const error = [...faterror];
        if (newfathername.length == 0) {
            error[index] = "required";
            setfaterror(error);
        }
        else {
            error.splice(index, 1);
            setfaterror(error);

        }
        var value = [...Items];
        value[index].fathername = newfathername;
        setItems(value);
    }
    const ItemChange3 = (index, newland) => {

        const error = [...landError];
        const values = [...Items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{1,}/;
        if (newland.length == 0) {
            error[index] = "required";
            setlandError(error);

        }
        else if (!numberRegex.test(newland)) {
            error[index] = "No. Only Should be Numeric";
            setlandError(error);
        }
        else {
            error.splice(index, 1);
            setlandError(error);
        }
        values[index].totalland = newland.replace(/[^0-9]/g, '');
        setItems(values);
    }
    const ItemChange4 = (index, newvillage) => {

        const error = [...villerror];
        if (newvillage.length == 0) {
            error[index] = "required";
            setvillerror(error);
        }
        else {
            error.splice(index, 1);
            setvillerror(error);

        }
        var value = [...Items];
        value[index].village = newvillage;
        setItems(value);
    }
    const ItemChange5 = (index, newsoiltype) => {

        const error = [...soilerror];
        if (newsoiltype.length == 0) {
            error[index] = "required";
            setsoilerror(error);
        }
        else {
            error.splice(index, 1);
            setsoilerror(error);

        }
        var value = [...Items];
        value[index].soiltype = newsoiltype;
        setItems(value);
    }
    const ItemChange6 = (index, newfpo) => {

        const error = [...fpoerror];
        if (newfpo.length == 0) {
            error[index] = "required";
            setfpoerror(error);
        }
        else {
            error.splice(index, 1);
            setfpoerror(error);

        }
        var value = [...Items];
        value[index].fpo = newfpo;
        setItems(value);
    }
    const ItemChange7 = (index, newcon) => {

        const error = [...mobileError];
        const values = [...Items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{10,}/;
        if (newcon.length == 0) {
            error[index] = "required";
            setmobileError(error);

        }
        if (newcon.length < 10) {
            error[index] = "min length should be 10";
            setmobileError(error);
        }
        else if (!numberRegex.test(newcon)) {
            error[index] = "Sr No. Only Should be Numeric";
            setmobileError(error);
        }
        else {
            error.splice(index, 1);
            setmobileError(error);
        }
        values[index].contact = newcon.replace(/[^0-9]/g, '');
        setItems(values);
    }
    const ItemChange8 = (index, newcon) => {

        const error = [...addharerror];
        const values = [...Items];
        const numberRegex = /^[0-9\b]+$/;
        const minLengthRegex = /\d{10,}/;
        if (newcon.length == 0) {
            error[index] = "required";
            setaddharerror(error);

        }
        if (newcon.length < 12) {
            error[index] = "min length should be 12";
            setaddharerror(error);
        }
        else if (!numberRegex.test(newcon)) {
            error[index] = "Only Should be Numeric";
            setaddharerror(error);
        }
        else {
            error.splice(index, 1);
            setaddharerror(error);
        }
        values[index].aadhar = newcon.replace(/[^0-9]/g, '');
        setItems(values);
    }
    const ItemChange9 = (index, newcon) => {

        const error = [...panerror];
        if (newcon.length == 0) {
            error[index] = "required";
            setpanerror(error);
        }
        else {
            error.splice(index, 1);
            setpanerror(error);

        }
        var value = [...Items];
        value[index].pancard = newcon;
        setItems(value);
    }

    const ItemChange24 = (index, newcon) => {

        const error = [...pinerror];
        const numberRegex = /^[0-9\b]+$/;

        if (newcon.length != 6) {
            error[index] = "length should be 6";
            setpinerror(error);
        }
        else if (!numberRegex.test(newcon)) {
            error[index] = "Only Should be Numeric";
            setpinerror(error);
        }
        else {
            error.splice(index, 1);
            setpinerror(error);
        }
        var value = [...Items];
        value[index].pincode = newcon;
        setItems(value);
    }

    const ItemChange16 = (index, newcon) => {

        const error = [...krishierror];
        if (newcon.length == 0) {
            error[index] = "required";
            setkrishierror(error);
        }
        else {
            error.splice(index, 1);
            setkrishierror(error);
        }
        var value = [...Items];
        value[index].krishicard = newcon;
        setItems(value);
    }

    const ItemChange17 = (index, newcon) => {
        var value = [...Items];
        value[index].members = newcon;
        setItems(value);
    }

    const ItemChange18 = (index, newcon) => {
        var value = [...Items];
        value[index].adults = newcon;
        setItems(value);
    }

    const ItemChange19 = (index, newcon) => {
        var value = [...Items];
        value[index].childs = newcon;
        setItems(value);
    }

    const ItemChange10 = (index, newcon) => {
        var value = [...family];
        value[index].name = newcon;
        setfamily(value);
    }
    const ItemChange11 = (index, newcon) => {
        var value = [...family];
        value[index].relation = newcon;
        setfamily(value);
    }

    const ItemChange22 = (index, newcon) => {
        var value = [...family];
        value[index].dob = newcon;
        setfamily(value);
    }

    const ItemChange12 = (index, newcon) => {
        var value = [...bank];
        value[index].bankname = newcon;
        setbank(value);
    }

    const ItemChange13= (index, newcon) => {

        const values = [...bank];
        values[index].amount= newcon.replace(/[^0-9]/g, '');
        setbank(values);
    }

    const ItemChange14= (index, newcon) => {
        var value = [...bank];
        value[index].datecredit = newcon;
        setbank(value);
    }

    const ItemChange15= (index, newcon) => {

        var value = [...bank];
        value[index].pendingamount = newcon;
        setbank(value);
    }

    const ItemChange20 = (index, newcon) => {
        var value = [...bank];
        value[index].rateofinterest = newcon;
        setbank(value);
    }

    const ItemChange21 = (index, newcon) => {
        var value = [...bank];
        value[index].typeofloan = newcon;
        setbank(value);

        closeMenu4(index);
    }

    const ItemChange23 = (index, newcon) => {
        var value = [...bank];
        value[index].duration = newcon;
        setbank(value);
    }
    

    const handleAddFields1 = () => {
        var values = [...family];
        values.push({ name: '', relation: '', dob: ''});
        setfamily(values);
    };

    const handleRemoveFields1 = index => {
        var values = [...family];
        values.splice(index, 1);
        setfamily(values);
    };

    const handleAddFields2 = () => {
        var values = [...bank];
        values.push({ bankname: '', amount: '',datecredit:'', pendingamount:'', rateofinterest:'', typeofloan:'Choose Loaner', duration:''});
        setbank(values);

        var val= [...visible4];
        val.push(false);
        setVisible4(val);
    };

    const handleRemoveFields2 = index => {
        var values = [...bank];
        values.splice(index, 1);
        setbank(values);
    };

    function submitForm() {
        axios.post(url + '/create_fdc', {
            name: Items[0].name,
            father_name: Items[0].fathername,
            village: Items[0].village,
            pincode: Items[0].pincode,
            fpo: Items[0].fpo,
            contact_number: Items[0].contact,
            total_land_in_acres: Items[0].totalland,
            soil_type: Items[0].soiltype,
            aadhar_number:Items[0].aadhar,
            pan_number:Items[0].pancard,
            krishi_number:Items[0].krishicard,
            members:Items[0].members,
            adults:Items[0].adults,
            childs:Items[0].childs,
            image:img,
            soil_upload:img2,
            krishi_upload:img3,
            family_info:family,
            loan_info:bank,
        })
        .then(function (response) {
            alert(response.data.msg);
            if (response.data.msg == "Successfully Saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('FarmerTable', { id: response.data.data._id });
                }
                else {
                    history.push('/farmertable/' + response.data.data._id);
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function submitError() {
        alert("All field requied");
    }

    function getFiles(event){
        setFile(event.target.files[0]);
    }

    function ImageSubmitForm(){

        uploadImage(file)
        .then(result => {
            setImg(result);
            alert("Uploaded successfully");
        });
        
    }

    function getFiles2(event){
        setFile2(event.target.files[0]);
    }

    function ImageSubmitForm2(){

        uploadImage(file2)
        .then(result => {
            setImg2(result);
            alert("Uploaded successfully");
        });
        
    }

    function getFiles3(event){
        setFile3(event.target.files[0]);
    }

    function ImageSubmitForm3(){

        uploadImage(file3)
        .then(result => {
            setImg3(result);
            alert("Image Uploaded successfully");
        });
        
    }

    const openMenu4 = (index) => {
        const values = [...visible4];
        values[index]=true;
        setVisible4(values);
    };

    const closeMenu4 = (index) => {
        const values = [...visible4];
        values[index]=false;
        setVisible4(values);4
    };

    return (
        <Provider theme={theme}>
            <SafeAreaView>
                <ScrollView>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Card style={styles.card} >
                            <Card.Title titleStyle={styles.title} title="Farmer Data Collection" />
                            <Card.Content>
                                <View>
                                    <TextInput style={styles.input} mode="outlined" label="Name" value={[...Items][0].name} onChangeText={(text) => ItemChange1(0, text)} />
                                    {namerror[0] ?
                                        <Text style={{ color: "red" }}>{namerror[0]}</Text> : <></>
                                    }
                                    {Platform.OS=="android" ? 
                                        <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Image_Picker')}}>Choose Photo</Button>
                                        :
                                        <View style={{flexDirection: 'row'}}>
                                            <input type="file" name="file" placeholder="Image"
                                            style={{flex: 3, border: '1px solid gray', marginTop: '2%', borderRadius: '1px'}}
                                            onChange={getFiles}
                                            />
                                            <Button mode="contained" style={{ flex: 1, marginTop: '2%'}} onPress={()=>ImageSubmitForm()}>Upload Image</Button>
                                        </View>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Father Name" value={[...Items][0].fathername} onChangeText={(text) => ItemChange2(0, text)} />
                                    {faterror[0] ?
                                        <Text style={{ color: "red" }}>{faterror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Total Land in acers" value={[...Items][0].totalland} onChangeText={(text) => ItemChange3(0, text)} />
                                    {landError[0] ?
                                        <Text style={{ color: "red" }}>{landError[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Village" value={[...Items][0].villerror} onChangeText={(text) => ItemChange4(0, text)} />
                                    {villerror[0] ?
                                        <Text style={{ color: "red" }}>{villerror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Pin Code" value={[...Items][0].pincode} maxLength={6} onChangeText={(text) => ItemChange24(0, text)} />
                                    {pinerror[0] ?
                                        <Text style={{ color: "red" }}>{pinerror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Soil Type" value={[...Items][0].soiltype} onChangeText={(text) => ItemChange5(0, text)} />
                                    {soilerror[0] ?
                                        <Text style={{ color: "red" }}>{soilerror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="FPO" value={[...Items][0].fpo} onChangeText={(text) => ItemChange6(0, text)} />
                                    {fpoerror[0] ?
                                        <Text style={{ color: "red" }}>{fpoerror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Contact No" value={[...Items][0].contact} maxLength={10} onChangeText={(text) => ItemChange7(0, text)} />
                                    {mobileError[0] ?
                                        <Text style={{ color: "red" }}>{mobileError[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Aadhar Card" value={[...Items][0].aadhar} maxLength={12} onChangeText={(text) => ItemChange8(0, text)} />
                                    {addharerror[0] ?
                                        <Text style={{ color: "red" }}>{addharerror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Pan Card" value={[...Items][0].pancard} maxLength={10} onChangeText={(text) => ItemChange9(0, text)} />
                                    {panerror[0] ?
                                        <Text style={{ color: "red" }}>{panerror[0]}</Text> : <></>
                                    }
                                    <TextInput style={styles.input} mode="outlined" label="Krishi Card Number" value={[...Items][0].krishicard} maxLength={10} onChangeText={(text) => ItemChange16(0, text)} />
                                    {krishierror[0] ?
                                        <Text style={{ color: "red" }}>{krishierror[0]}</Text> : <></>
                                    }
                                    {Platform.OS=="android" ? 
                                        <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Image_Picker')}}>Upload Krishi Card</Button>
                                        :
                                        <View style={{flexDirection: 'row'}}>
                                            <input type="file" name="file" placeholder="Krishi Card"
                                            style={{flex: 3, border: '1px solid gray', marginTop: '2%', borderRadius: '1px'}}
                                            onChange={getFiles2}
                                            />
                                            <Button mode="contained" style={{ flex: 1, marginTop: '2%'}} onPress={()=>ImageSubmitForm2()}>Upload Krishi Card</Button>
                                        </View>
                                    }
                                    {Platform.OS=="android" ? 
                                        <Button style={styles.drawerbutton} mode="outlined" onPress={() => {navigation.navigate('Image_Picker')}}>Upload Soil Report</Button>
                                        :
                                        <View style={{flexDirection: 'row', marginBottom: '2%'}}>
                                            <input type="file" name="file" placeholder="Soil Report"
                                            style={{flex: 3, border: '1px solid gray', marginTop: '2%', borderRadius: '1px'}}
                                            onChange={getFiles3}
                                            />
                                            <Button mode="contained" style={{ flex: 1, marginTop: '2%'}} onPress={()=>ImageSubmitForm3()}>Upload Soil Report</Button>
                                        </View>
                                    }
                                    <Card.Title titleStyle={styles.title} title="Family Information " />
                                    <Card.Content>
                                        <View style={{flexDirection: 'row' }}>
                                            <TextInput style={styles.input, {width: '33%'}} mode="outlined" label="No of Members" value={[...Items][0].members} maxLength={10} onChangeText={(text) => ItemChange17(0, text)} />
                                            <TextInput style={styles.input, {width: '33%'}} mode="outlined" label="No of Adults" value={[...Items][0].adults} maxLength={10} onChangeText={(text) => ItemChange18(0, text)} />
                                            <TextInput style={styles.input, {width: '33%'}} mode="outlined" label="No of Childs" value={[...Items][0].childs} maxLength={10} onChangeText={(text) => ItemChange19(0, text)} />
                                        </View>
                                        {family.map((it, index) => (

                                            <View>
                                                <TextInput style={styles.input} mode="outlined" label="Family Member Name" value={it.name} maxLength={100} onChangeText={(text) => ItemChange10(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="Relation eg:son" value={it.relation} maxLength={100} onChangeText={(text) => ItemChange11(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="Dob" value={it.dob} maxLength={100} onChangeText={(text) => ItemChange22(index, text)} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    {Platform.OS == "android" ?
                                                        <>
                                                            <FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} onPress={() => handleRemoveFields1(index)} />
                                                            <FontAwesomeIcon icon={faPlusCircle} onPress={() => handleAddFields1()} color={'green'} size={30} />
                                                        </>
                                                        :
                                                        <>
                                                            <Button onPress={() => handleRemoveFields1(index)} mode="outlined"><FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} /></Button>
                                                            <Button onPress={() => handleAddFields1()} mode="outlined"><FontAwesomeIcon icon={faPlusCircle} color={'green'} size={30} /></Button>
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                        ))}
                                    </Card.Content>

                                    <Card.Title titleStyle={styles.title} title="Loan Details" />
                                    <Card.Content>
                                        {bank.map((it, index) => (
                                            <View>
                                                <Menu
                                                visible={visible4[index]}
                                                onDismiss={()=>closeMenu4(index)}
                                                anchor={<Button style={{flex: 1, marginTop: '2%'}} mode="outlined" onPress={()=>openMenu4(index)}>{it.typeofloan}</Button>}>
                                                    <Menu.Item title="Bank" onPress={() => ItemChange21(index,"Bank")}/>
                                                    <Menu.Item title="Private" onPress={() => ItemChange21(index,"Private")}/>
                                                </Menu>
                                                <TextInput style={styles.input} mode="outlined" label="Bank Name/Private" value={it.bankname} maxLength={100} onChangeText={(text) => ItemChange12(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="amount(in INC)" value={it.amount} maxLength={100} onChangeText={(text) => ItemChange13(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="Date of credit(YYYY-MM-DD)" value={it.datecredit} maxLength={100} onChangeText={(text) => ItemChange14(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="pending amount(in INC)" value={it.pendingamount} maxLength={100} onChangeText={(text) => ItemChange15(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="rate of interest" value={it.rateofinterest} maxLength={100} onChangeText={(text) => ItemChange20(index, text)} />
                                                <TextInput style={styles.input} mode="outlined" label="duration" value={it.duration} maxLength={100} onChangeText={(text) => ItemChange23(index, text)} />
                                                <View style={{ flexDirection: 'row' }}>
                                                    {Platform.OS == "android" ?
                                                        <>
                                                            <FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} onPress={() => handleRemoveFields2(index)} />
                                                            <FontAwesomeIcon icon={faPlusCircle} onPress={() => handleAddFields2()} color={'green'} size={30} />
                                                        </>
                                                        :
                                                        <>
                                                            <Button onPress={() => handleRemoveFields2(index)} mode="outlined"><FontAwesomeIcon icon={faMinusCircle} color={'red'} size={30} /></Button>
                                                            <Button onPress={() => handleAddFields2()} mode="outlined"><FontAwesomeIcon icon={faPlusCircle} color={'green'} size={30} /></Button>
                                                        </>
                                                    }
                                                </View>
                                            </View>
                                        ))}
                                    </Card.Content>
                                </View>
                                {namerror.length == 0 && pinerror.length == 0 && faterror.length == 0 && landError.length == 0 && villerror.length == 0 &&
                                    soilerror.length == 0 && fpoerror.length == 0 && mobileError.length== 0 ?
                                    <Button mode="contained" style={styles.button} onPress={() => submitForm()}>Submit</Button> :
                                    <Button mode="contained" style={styles.button} onPress={() => submitError()}>Submit</Button>
                                }
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
    }
}); 