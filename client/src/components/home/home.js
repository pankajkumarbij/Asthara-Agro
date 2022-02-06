import React from 'react'
import { View, Text } from 'react-native';
import {Link} from 'react-router-dom';
export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Home</Text>
       </View>
    );
}