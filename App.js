import React from 'react';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import Tracker from './src/components/Tracker';
import ListScreen from './src/components/ListScreen';
import Navigation from './src/components/Navigation';
import AppNavigator from './src/AppNavigator';
import {AsyncStorage} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

import { StyleSheet, Text, View } from 'react-native';


const initialState = {
  action: "",
  name: "",
  trackerCards: 
    {
      card_0: {
          currentCount: 0
      },
      card_1: {
          currentCount: 0
      },
      card_2: {
          currentCount: 0
      },
      card_3: {
          currentCount: 0
      },
      card_4: {
          currentCount: 0
      },
      card_5: {
          currentCount: 0
      },
      card_6: {
          currentCount: 0
      },
      card_7: {
          currentCount: 0
      },
      card_8: {
          currentCount: 0
      },
    }
  
}

const reducer = (state = initialState, action) => {
  const card = state.trackerCards[action.card_id];
  switch (action.type) {
    case "ADD_DRINK":
      return { action: "addDrink", 
        ...state, 
        trackerCards: {
          ...state.trackerCards, 
          [action.card_id]: {
            ...state.trackerCards[action.card_id], 
            currentCount:  card.currentCount + 1 
          } 
        }
      } 
    case "SUBTRACT_DRINK":
      return { action: "subtractDrink", 
        ...state, 
        trackerCards: {
          ...state.trackerCards, 
          [action.card_id]: {
            ...state.trackerCards[action.card_id], 
            currentCount:  card.currentCount - 1 
          } 
        } 
      }
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
          <AppNavigator />
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