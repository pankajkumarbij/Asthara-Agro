import React, {useState} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView, Text } from 'react-native';
import { Provider, DefaultTheme, Card, Button } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { url } from '../../utils/url';
import axios from 'axios';
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

export default function UnloadingDelivery(props,{ navigation, route }) {

    var id = "";
    if(Platform.OS=="android"){
        id = route.params.id;
    }
    else{
        id = props.match.params.id;
    }

    const [file, setFile] = useState();
    const [img, setImg] = useState();
    const [file2, setFile2] = useState();
    const [img2, setImg2] = useState();
    const [file3, setFile3] = useState();
    const [img3, setImg3] = useState();
    const [file4, setFile4] = useState();
    const [img4, setImg4] = useState();
    const [file5, setFile5] = useState();
    const [img5, setImg5] = useState();
    const [file6, setFile6] = useState();
    const [img6, setImg6] = useState();

    let history = useHistory();

    function submitForm() {
        axios.put(url + '/update_delivery_unloading_img/'+id, {
            img7: img,
            img8: img2,
            img9: img3,
            img10: img4,
            img11: img5,
            img12: img6,
        })
        .then(function (response) {
            console.log(response);
            alert(response.data.msg);
            if (response.data.msg == "successfully saved") {
                if (Platform.OS == 'android') {
                    navigation.navigate('AllCustomerPools');
                }
                else {
                    history.push('/alldispatchfordelivery');
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    function getFiles(event){
        setFile(event.target.files[0]);
    }

    function ImageSubmitForm(){

        uploadImage(file)
        .then(result => {
            setImg(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles2(event){
        setFile2(event.target.files[0]);
    }

    function ImageSubmitForm2(){

        uploadImage(file2)
        .then(result => {
            setImg2(result);
            alert("Image Uploaded successfully");
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

    function getFiles4(event){
        setFile4(event.target.files[0]);
    }

    function ImageSubmitForm4(){

        uploadImage(file4)
        .then(result => {
            setImg4(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles5(event){
        setFile5(event.target.files[0]);
    }

    function ImageSubmitForm5(){

        uploadImage(file5)
        .then(result => {
            setImg5(result);
            alert("Image Uploaded successfully");
        });
        
    }

    function getFiles6(event){
        setFile6(event.target.files[0]);
    }

    function ImageSubmitForm6(){

        uploadImage(file6)
        .then(result => {
            setImg6(result);
            alert("Image Uploaded successfully");
        });
        
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title titleStyle={styles.title} title="Upload Unloading Images" />
                    <Card.Content>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm()}>Loaded Closed Truck Side View (Left) with Vehicle Number Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles2}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img2 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm2()}>Loaded Closed Truck Side View (Right) with Vehicle Number Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles3}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img3 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm3()}>Loaded Closed Truck Front View with Driver and Vehicle Number</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles4}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img4 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm4()}>Loaded Closed Truck Back View with Vehicle Number Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles5}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img5 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm5()}>Damaged Crates from Inside the truck Landscape</Button>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <input type="file" name="file" placeholder="Image"
                        style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}
                        onChange={getFiles6}
                        />
                        <Text style={{flex: 2, border: '1px solid gray', marginLeft: '2%', marginTop: '2%', padding: '1%', borderRadius: '1px'}}>{img6 ? "Successfully Uploaded" : "Not Uploaded"}</Text>
                        <Button mode="contained" style={styles.button, { flex: 2, marginTop: '2%',}} onPress={()=>ImageSubmitForm6()}>Damaged Crates from Outside the truck, Open Back View with vehicle number and driver Landscape</Button>
                    </View>
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
    title: {
        ...Platform.select({
            ios: {
                
            },
            android: {
                // textAlign: 'center',
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