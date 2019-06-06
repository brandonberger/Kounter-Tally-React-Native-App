import { AsyncStorage } from 'react-native';
import { saveState } from './AsyncStorage';

export const addNewKounter = (newKounter) => {

	AsyncStorage.getItem("kounters").then(serializedState => {
		const kounters = JSON.parse(serializedState);
		if (kounters) {
			const newKounters = [...kounters, ...newKounter];
			saveState(newKounters);
		} else {
			saveState(newKounter);
		}

	});	
}

export const displayKounters = kounters => {
	return kounters;
}

export const addToCount = state => {
    
}

export const clearAll = () => {
	AsyncStorage.clear()
}