import {createStackNavigator, createAppContainer} from 'react-navigation';
import Tracker from './components/Tracker';
// import ListScreen from './components/ListScreen';
import TestScreen from './components/TestScreen';

const AppNavigator = createStackNavigator(
	{	
		List: TestScreen,	
		// Tracker: Tracker,
	}
);

export default createAppContainer(AppNavigator);