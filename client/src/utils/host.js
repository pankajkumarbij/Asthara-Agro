import {  Platform} from 'react-native';
export const host = (Platform.OS === "android") ? "10.0.2.2" : "localhost";