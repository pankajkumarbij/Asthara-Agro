import AsyncStorage from '@react-native-async-storage/async-storage';

export async function roleas() {
  return await AsyncStorage.getItem('role')
  .then((role) => {
    return role;
  });
}

export async function loginuserId() {
  return await AsyncStorage.getItem('loginuserid')
  .then((id) => {
    return id;
  });
}
