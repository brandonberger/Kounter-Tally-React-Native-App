import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './src/AppNavigator';
import {AsyncStorage} from 'react-native';
import { StyleSheet } from 'react-native';

// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import AppNavigator from './src/AppNavigator';
// import { PersistGate } from 'redux-persist/integration/react'


const initialState = {
    kounters: [],
    number_of_kounters: 0,
    action: "",
    totalCardHistory: 0,
    currentSort: {
        favorites: "SORT_BY_ID",
        kounters: "SORT_BY_ID",
    },
    nextSort: {
        favorites: "SORT_BY_A_Z",
        kounters: "SORT_BY_A_Z",
    },
    showConfirmButtons: 'none',
    showPreConfirmButtons: 'flex'
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_KOUNTERS":
            return {...state, action: 'SET', hasUpdated: true,  kounters: action.kounters}
        case "GET_KOUNTERS":
            return {...state, action: 'GET', hasUpdated: false, kounters: action.kounters}


        case "ADD_KOUNTER":
        return {
            ...state,
            action: 'ADD',
            hasUpdated: true,  
            kounters: state.kounters.map((item, index) => {
                if (item.id !== action.id) { 
                    return { ...item, lastUpdated: 0 }
                }

                return { ...item, amount: item.amount + 1, lastUpdated: 1 }
            })
        };
        case "SUBTRACT_KOUNTER":
        return {
            ...state,
            action: 'SUBTRACT',
            hasUpdated: true,  
            kounters: state.kounters.map((item, index) => {
                if (item.id !== action.id) { 
                    return item
                }

                if (item.amount === 0) {
                    return item;
                }

                return { ...item, amount: item.amount - 1 }

            })
        };
        case "RESET_TRACKER":
        return {
            ...state,
            hasUpdated: true,
            kounters: state.kounters.map((item, index) => {
                if (item.id !== action.id) { 
                    return item
                }

                return { ...item, amount: 0 }

            })
        };
        case "FAVORITE":
        return {
            ...state,
            hasUpdated: true,
            action: 'FAVORITE',
            kounters: state.kounters.map((item, index) => {
                if (item.id !== action.id) { 
                    return item
                }

                if (item.favorite_status == false || item.favorite_status == null) {
                    return { ...item, favorite_status: true }
                } else {
                    return { ...item, favorite_status: false }
                }

            })
        };
        case "EDIT_NAME":
        return {
            ...state,
            hasUpdated: true,
            kounters: state.kounters.map((item, index) => {
                if (item.id !== action.id) {
                    return item;
                }

                if (item.name != action.newName && action.newName.trim() != '' ) {
                    return {...item, name: action.newName}
                } else {
                    return item;
                }
            })
        }
        case "EDIT_DESCRIPTION":
        return {
            ...state,
            hasUpdated: true,
            kounters: state.kounters.map((item, index) => {
                if (item.id !== action.id) {
                    return item;
                }

                if (item.description !== action.newDescription) {
                    return {...item, description: action.newDescription}
                } else {
                    return {...item, description: item.description}
                }
            })
        }

        case "ADD_NEW_TRACKER":
        return {...state, hasUpdated: true, trackerCards: [...state.trackerCards, action.new_tracker], 
            totalCardHistory: state.totalCardHistory + 1 }
        case "DEACTIVATE_KOUNTER":
            return {
                ...state,
                hasUpdated: true,
                action: 'DEACTIVATE',
                kounters: state.kounters.map((item, index) => {
                    if (item.id !== action.id) { 
                        return item
                    }
                    return { ...item, active: 0 }
    
                })
            };
            case "DELETE_ALL":
                return {...state, kounters: []}
            case "OPEN_SETTINGS":
                return {...state, action: 'openSettings' }
            case "CLOSE_SETTINGS":
                return {...state, action: 'closeSettings' }
            case "SORT":
                if (action.list == 'FAVORITES') {
                    return {
                        ...state, 
                        currentSort: { 
                            ...state.currentSort, favorites: action.sortMethod
                        },
                        nextSort: {
                            ...state.nextSort, favorites: action.nextSortMethod
                        }
                    }
                } else if (action.list == 'KOUNTERS') {
                    return {
                        ...state,
                        currentSort: { 
                            ...state.currentSort, kounters:action.sortMethod
                        },
                        nextSort: {
                            ...state.nextSort, kounters: action.nextSortMethod
                        }
                    }
                }
                break;
            case "RESET_EVERYTHING": 
                return {state: []}
            case "TOGGLE_ERASE_CONFIRM_BUTTONS":

                if (action.showConfirmButtonsStatus == 'flex') {
                    return {...state, showConfirmButtons: 'flex', showPreConfirmButtons: 'none'}
                } else {
                     return {...state, showConfirmButtons: 'none', showPreConfirmButtons: 'flex'}
                }

            default:
                return state;
        }
    };


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
// }

// const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(reducer);
// const persistor = persistStore(store);

const App = () => (
    <Provider store={store}>
        <AppNavigator />
    </Provider>
);

export default App;