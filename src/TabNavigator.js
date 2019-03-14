import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Tracker from './components/Tracker';
import OtherScreen from './components/OtherScreen';

// const TrackerStack = createStackNavigator(
// {
// 	Tracker: Tracker,
// 	Other: OtherScreen
// },
// {
//    initialRouteName: "Tracker",

// });


// TrackerStack.navigationOptions = ({ navigation }) => {
// 	var tabBarVisible = true;
// 	const routeName = navigation.state.routes[navigation.state.index].routeName;

// 	return {
// 		tabBarVisible,
// 		tabBarLabel: "Tracker"
// 	}
// };

// const OtherStack = createStackNavigator(
// {
// 	Other: OtherScreen
// });

// OtherStack.navigationOptions = ({ navigation }) => {
// 	var tabBarVisible = true;

// 	return {
// 		tabBarVisible,
// 		tabBarLabel: "Other"
// 	}
// };


// const TabNavigator = createBottomTabNavigator({
// 	TrackerStack,
// 	OtherStack
// });

export default TabNavigator;