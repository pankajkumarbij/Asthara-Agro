import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Card, Button, Menu, Provider, DataTable, DefaultTheme } from 'react-native-paper';

const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Edit_Indent(props, {route}) {

        var id="";
        var indentid = ""; 
        if(Platform.OS=="android"){
            id = route.params.indentId;
        }
        else{
            indentid = props.match.params.indentid;
        }


    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const openMenu1 = () => setVisible1(true);
    const closeMenu1 = () => setVisible1(false);

    const [indentId, setIndentId] = useState("");

    const [orderId, setOrderId] = useState("Choose Order");
    const [items, setItems] = useState("");
    const [margin, setMargin] = useState("");

    const [host, setHost] = useState("");


    function chooseOrder(orderId) {
        setOrderId(orderId);
        closeMenu1();
    }

    useEffect(() => {
        if(Platform.OS=="android"){
            setHost("10.0.2.2");
            setIndentId(id);
        }
        else{
            setHost("localhost");
            setIndentId(indentid);
        }
        if(indentId){
       
            fetch(`http://${host}:5000/displayindent/${indentid}`, {
                method: 'GET'
            })
            .then(res => res.json())
            .catch(error => console.log(error))
            .then(item => {
                setOrderId(item[0].orderId);
                setItems(item[0].items);
                setMargin(item[0].margin);

            });
        }
    }   , [host,indentId,indentid,id]);

        function submitForm() {
        fetch(`http://${host}:5000/updateindent/${indentid}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId:orderId,
                items:items,  
                margin:margin,              
            })
        })
        .then(res => res.json())
        .catch(error => console.log(error))
        .then(data => {
            alert(data.message);
            console.log(data);
        }); 
    }
    return (
        <Provider theme={theme}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Card style={styles.card}>
                    <Card.Title title="Indent Details"/>
                    <Card.Content>
                    
                    {orderId &&
                    <Menu 
                    visible={visible1}
                    onDismiss={closeMenu1}
                    anchor={<Button style={styles.input} mode="outlined" onPress={openMenu1}>{orderId}</Button>}>
                        <Menu.Item title="${orderId}" onPress={()=>chooseOrder(orderId)} />
                    </Menu>
                    }
                    {orderId && 
                    <DataTable>
                        <DataTable.Header style={styles.tableheader} >
                        <DataTable.Title >Item Name </DataTable.Title>
                        <DataTable.Title >Quantity</DataTable.Title>
                        <DataTable.Title >Unit</DataTable.Title>
                        </DataTable.Header>
                        {items && 
                            items.map((item)=>{
                                return (
                                    <DataTable.Row key={item.itemName}> 
                                        <DataTable.Cell>{item.itemName} </DataTable.Cell>
                                        <DataTable.Cell>{item.quantity} </DataTable.Cell>
                                        <DataTable.Cell>{item.unit} </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            })
                        }
                    </DataTable>
                    }                   
                    <TextInput style={styles.input} mode="outlined" value={margin}  label="Margin"  onChangeText={margin => setMargin(margin)}/>
                    </Card.Content>
                </Card>
            </View>
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
                width: '90%',
            },
            default: {
                width: '60%',
                marginTop: '2%',
            }
        })
    },
    input: {
        marginTop: '2%',
        width: '100%',
        backgroundColor: 'white',
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