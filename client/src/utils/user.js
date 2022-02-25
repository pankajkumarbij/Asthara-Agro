import AsyncStorage from '@react-native-async-storage/async-storage';
const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('role');
      if (value !== null) {
        return value;
      }
     } catch (error) {
     }
  }
  let x;
  const userList =retrieveData();
  console.log(retrieveData ); // Promise  <pending>
  userList.then((result)=> {
    x=result;
  })
//   let r=""
//    retrieveData()
//    .then((a) => {
//      r=a;
//     });
console.log(x);
//export default fetchData();
export const role =retrieveData();
export const userId = localStorage.getItem('loginuserid');