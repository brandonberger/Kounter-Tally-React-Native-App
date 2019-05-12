import React from 'react';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import InitialNavigator from './src/InitialNavigator';
import {AsyncStorage} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

import { StyleSheet, Text, View } from 'react-native';
const initialState = {
  trackerCards: [],
  action: "",
  totalCardHistory: 0,
  currentSort: {
    favorites: "SORT_BY_ID",
    kounters: "SORT_BY_ID",
  },
  nextSort: {
    favorites: "SORT_BY_A_Z",
    kounters: "SORT_BY_A_Z",
  }
}

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_DRINK":
        return {
            ...state,
            trackerCards: state.trackerCards.map((item, index) => {
                if (item.card_id !== action.card_id) { 
                    return { ...item, lastUpdated: 0 }
                }

                return { ...item, currentCount: item.currentCount + 1, lastUpdated: 1 }
            })
        };
        case "SUBTRACT_DRINK":
        return {
            ...state,
            trackerCards: state.trackerCards.map((item, index) => {
                if (item.card_id !== action.card_id) { 
                    return item
                }

                if (item.currentCount === 0) {
                    return item;
                }

                return { ...item, currentCount: item.currentCount - 1 }

            })
        };
        case "RESET_TRACKER":
        return {
            ...state,
            trackerCards: state.trackerCards.map((item, index) => {
                if (item.card_id !== action.card_id) { 
                    return item
                }

                return { ...item, currentCount: 0 }

            })
        };
        case "FAVORITE":
        return {
            ...state,
            trackerCards: state.trackerCards.map((item, index) => {
                if (item.card_id !== action.card_id) { 
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
            trackerCards: state.trackerCards.map((item, index) => {
                if (item.card_id !== action.card_id) {
                    return item;
                }

                if (item.title != action.newName && action.newName.trim() != '' ) {
                    return {...item, title: action.newName}
                } else {
                    return item;
                }
            })
        }
        case "EDIT_DESCRIPTION":
        return {
            ...state,
            trackerCards: state.trackerCards.map((item, index) => {
                if (item.card_id !== action.card_id) {
                    return item;
                }

                if (item.description !== action.newDescription) {
                    return {...item, description: action.newDescription}
                }
            })
        }

        case "ADD_NEW_TRACKER":
        return {...state, trackerCards: [...state.trackerCards, action.new_tracker], 
            totalCardHistory: state.totalCardHistory + 1 }
        case "REMOVE_TRACKER":
            state.trackerCards.map((item, index) => {
                if (item.card_id == action.card_id) {
                    return cardIndex = index;
                }
            });

            return { 
                ...state,
                ...state.trackerCards, 
                trackerCards: [
                ...state.trackerCards.slice(0, cardIndex), 
                ...state.trackerCards.slice(cardIndex + 1)
                ] 
            }; 
            case "DELETE_ALL":
                return {...state, trackerCards: []}
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
            default:
                return state;
        }
    };


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, reducer);


const store = createStore(persistedReducer);
const persistor = persistStore(store);


const App = () => (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <InitialNavigator />
      </PersistGate>
    </Provider>
);


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#c74463',
  }
});

export default App;