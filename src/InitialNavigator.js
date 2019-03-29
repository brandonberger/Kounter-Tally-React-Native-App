import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import AppNavigator from './AppNavigator';

const InitialNavigator = createSwitchNavigator({
	Splash: SplashScreen,
	App: AppNavigator
});

export default createAppContainer(InitialNavigator);