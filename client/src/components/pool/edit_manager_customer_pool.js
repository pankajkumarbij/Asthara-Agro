import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, {useState, useEffect} from 'react';
import { View, StyleSheet,Platform, ScrollView, SafeAreaView} from 'react-native';
import { Provider, DefaultTheme, Card, TextInput, Button } from 'react-native-paper';
import { useHistory } from 'react-router-dom';
import { vendor_pool_by_id } from '../../services/pool';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function EditCustomerManagerPool(props,{ navigation }) {

    const id = props.match.params.id;

    const [state, setState] = useState("");
    const [region, setRegion] = useState("");
    const [subRegion, setSubRegion] = useState("");
    const [items, setItems] = useState([{ postal_code: ''}]);

    useEffect(() => {

        vendor_pool_by_id(id)
        .then(result => {
            setState(result[0].state);
            setRegion(result[0].region);
            setSubRegion(result[0].sub_region);
            setItems(result[0].postal_code);
        })

    }, [id]);

    let history = useHistory();

    const ItemChange = (index, fieldvalue) => {
        const values = [...items];
        values[index].postal_code = fieldvalue.replace(/[^0-9]/g, '');
        setItems(values);
    };

    const handleAddFields = () => {
        const values = [...items];
        values.push({ postal_code: '' });
        setItems(values);
    };
    
    const handleRemoveFields = index => {
        const values = [...items];
        values.splice(index, 1);
        setItems(values);
    };

    function submitForm() {
        fetch(`http://localhost:5000/update_vendor_pool/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                state: state,
                region: region,
                sub_region: subRegion,
                postal_code: items
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            if(!data.err){
                history.push('/allvendorpools');
            }
        }); 
    }

    return (
        <Provider theme={theme}>
        <SafeAreaView>
        <ScrollView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card} >
                    <Card.Title title="Edit Customer Manager Cross Pool"/>
                    <Card.Content>
                    <TextInput style={styles.input} mode="outlined" label="State" value={state} onChangeText={state => setState(state)} />
                    <TextInput style={styles.input} mode="outlined" label="Region" value={region} onChangeText={region => setRegion(region)} />
                    <TextInput style={styles.input} mode="outlined" label="Sub Region" value={subRegion} onChangeText={subRegion => setSubRegion(subRegion)} />
                    {items.map((it, index) => (
                        <View>
                            <TextInput style={styles.input} mode="outlined" label="Pin Code" value={it.postal_code} onChangeText={(text)=>ItemChange(index, text)} />
                            <View style={{flexDirection: 'row'}}>
                                {Platform.OS=="android" ?
                                    <>
                                        <FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30} onPress={() => handleRemoveFields(index)}/>
                                        <FontAwesomeIcon icon={ faPlusCircle } onPress={() => handleAddFields()} color={ 'green' } size={30} />
                                    </>
                                    :
                                    <>
                                        <Button onPress={() => handleRemoveFields(index)} mode="outlined"><FontAwesomeIcon icon={ faMinusCircle } color={ 'red' } size={30}/></Button>
                                        <Button  onPress={() => handleAddFields()}  mode="outlined"><FontAwesomeIcon icon={ faPlusCircle } color={ 'green' } size={30} /></Button>
                                    </>
                                }
                            </View>
                        </View>
                    ))}
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