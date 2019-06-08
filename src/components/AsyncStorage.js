import { AsyncStorage } from 'react-native';

export const saveState = async state => {
    try {
        const serializedState = JSON.stringify(state);
        await AsyncStorage.setItem("kounters", serializedState);
    } catch (error) {

    }
}

export const removeItem = async state => {
    const serializedState = JSON.stringify(state);
    await AsyncStorage.removeItem("kounters", serializedState);
}