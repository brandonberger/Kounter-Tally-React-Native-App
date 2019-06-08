import { AsyncStorage } from 'react-native';
import { saveState, removeItem } from './AsyncStorage';

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

export const updateKounters = (state, navigation) => {
	saveState(state);
	if (navigation) {
		navigation.push('List');
	}
}

export const addCount = (id) => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(updatedData => updatedData.filter(kounter => kounter.id === id))
		.then(serializedState => {
			serializedState = [...serializedState, ...updatedData[0].amount++];
			saveState(serializedState);
		})
}

export const subtractCount = id => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(serializedState => serializedState.filter(kounter => kounter.id === id))
		.then(serializedState => {
			serializedState[0].amount--;
			saveState(serializedState);
		})
}

export const favoriteKounter = id => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(serializedState => serializedState.filter(kounter => kounter.id === id))
		.then(serializedState => {
			(serializedState[0].favorite_status) ? serializedState[0].favorite_status = false : serializedState[0].favorite_status = true;
			saveState(serializedState);
		})
}

export const resetCount = id => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(serializedState => serializedState.filter(kounter => kounter.id === id))
		.then(serializedState => {
			serializedState[0].amount = 0;
			saveState(serializedState);
		})
}

export const updateName = (id, name) => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(serializedState => serializedState.filter(kounter => kounter.id === id))
		.then(serializedState => {
			serializedState[0].name = name;
			saveState(serializedState);
		})
}

export const updateDescription = (id, description) => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(serializedState => serializedState.filter(kounter => kounter.id === id))
		.then(serializedState => {
			serializedState[0].description = description;
			saveState(serializedState);
		})
}

export const deactivateKounter = (id, navigation) => {
	AsyncStorage.getItem("kounters")
		.then(JSON.parse)
		.then(serializedState => serializedState.filter(kounter => kounter.id === id))
		.then(serializedState => {
			serializedState[0].active = 0;
			saveState(serializedState);
		})
		.then( res => {
			navigation.pop({n: 1});
		})
}

export const clearAll = () => {
	AsyncStorage.clear()
}