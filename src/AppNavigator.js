import {createStackNavigator, createAppContainer} from 'react-navigation';
import Tracker from './components/Tracker';
import ListScreen from './components/ListScreen';
import SplashScreen from './components/SplashScreen';

const AppNavigator = createStackNavigator(
	{	
		List: ListScreen,	
		Tracker: Tracker,
	}
);

export default createAppContainer(AppNavigator);