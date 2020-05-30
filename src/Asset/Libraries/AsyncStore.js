import { AsyncStorage } from 'react-native';

const setCurrentScreenName = async (Value) => {
    await AsyncStorage.setItem('@CurrentScreenName', Value);
}
const getCurrentScreenName = async () => {
    return await AsyncStorage.getItem('@CurrentScreenName');
}

export {
   setCurrentScreenName,getCurrentScreenName
}
