import React from 'react';
import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { Provider } from 'react-redux';
import Navigation from './src/components/Navigation';
import AppNavigator from './src/AppNavigator';
import {AsyncStorage} from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'

import { StyleSheet, Text, View } from 'react-native';
const initialState = {
  trackerCards: [],
  action: "",
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case "ADD_DRINK":
       return {
        ...state,
        trackerCards: state.trackerCards.map((item, index) => {
          if (item.card_id !== action.card_id) { 
            return item
          }

          return { ...item, currentCount: item.currentCount + 1 }

        })
      };

    case "SUBTRACT_DRINK":
      return {
        ...state,
        trackerCards: state.trackerCards.map((item, index) => {
          if (item.card_id !== action.card_id) { 
            return item
          }

          return { ...item, currentCount: item.currentCount - 1 }

        })
      };
    case "ADD_NEW_TRACKER":
      return { trackerCards: [...state.trackerCards, action.new_tracker]}
    case "REMOVE_TRACKER":
      state.trackerCards.map((item, index) => {
        if (item.card_id == action.card_id) {
          return cardIndex = index;
        }
      });
      
      return { 
        ...state.trackerCards, 
        trackerCards: [
          ...state.trackerCards.slice(0, cardIndex), 
          ...state.trackerCards.slice(cardIndex + 1)
        ] 
      };

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