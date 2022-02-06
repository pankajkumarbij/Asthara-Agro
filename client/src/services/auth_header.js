import AsyncStorage from '@react-native-async-storage/async-storage';
let token1 ="";
async function fetchData() {
    await AsyncStorage.getItem('token')
    .then((token) => {
        //console.log(token);
       token1=token;
    })
}
export const  authHeader = () =>{
    //fetchData();
    //const token = JSON.stringify(AsyncStorage.getItem('token'));
    //console.log(token1);
    if (token1) {
      return { Authorization: 'Bearer ' + token1 };
    } else {
      return {};
    }
}