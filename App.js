import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Tracker from './src/components/Tracker';
import ListScreen from './src/components/ListScreen';
import Navigation from './src/components/Navigation';
import AppNavigator from './src/AppNavigator';
import {AsyncStorage} from 'react-native';

import { StyleSheet, Text, View } from 'react-native';


const initialState = {
  action: "",
  name: ""
};

const reducer = (state = initialState, action) => {
  return state;
};

const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
      <AppNavigator />
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