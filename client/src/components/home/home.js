import React from 'react'
import { View, Text } from 'react-native';
import {Link} from 'react-router-dom';
export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <a href="https://astharaagro.com/" target="_blank">Home</a>
       </View>
    );
}