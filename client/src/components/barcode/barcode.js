import React, {useState, useEffect} from 'react';
import { useBarcode } from '@createnextapp/react-barcode';
import { TextInput, DefaultTheme, Card, Button, Provider  } from 'react-native-paper';
import { View, StyleSheet, Platform, ScrollView} from 'react-native';
import {faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#0cc261',
        accent: '#f1c40f',
    },
};

export default function Barcode(props){

    const { inputRef } = useBarcode({
        value: props.barcode,
        format: "CODE128",
    });

    function DownlaodBarcode(){
        window.print();
        // var divContents = document.getElementById("printable").innerHTML;
        // console.log(divContents);
        // var a = window.open();
        // a.document.write(divContents);
        // a.document.close();
        // a.print();
    }

    return (
        <Provider theme={theme}>
            <ScrollView keyboardDismissMode="interactive" >
                <View style={{padding: '20px'}}>
                    <img style={{width: '100%',height: '30mm'}} id="printable" ref={inputRef} />
                    <Button  mode="contained" icon={() => <FontAwesomeIcon icon={ faStore } />} onPress={()=>{DownlaodBarcode()}}>Print  Barcode</Button> 
                </View>
            </ScrollView>
        </Provider>
    );
};
//define stylesheet for the component (IOS styles to be added)