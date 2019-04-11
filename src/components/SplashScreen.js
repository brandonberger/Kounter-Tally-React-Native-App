import React from 'react';
import {Text, View} from 'react-native';
import { Font } from 'expo';

class SplashScreen extends React.Component {

	state = {
    	fontLoaded: false,
  	};

  	static navigationOptions = {
	    header: null
  	};
 

  	performTimeConsumingTask = async() => {
	    return new Promise((resolve) =>
	      setTimeout(
	        () => { resolve('result') },
	        200
	      )
	    )
	  }

  	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-bold': require('../../assets/fonts/Anodina-Bold.otf'),
		  'anodina-regular': require('../../assets/fonts/Anodina-Regular.otf'),
		});

		await this.setState({ fontLoaded: true });

		const data = await this.performTimeConsumingTask();

	    if (data !== null) {
	      this.props.navigation.navigate('App');
	    }
	}

	render() {
		const viewStyles = {
			backgroundColor: '#0d0f19',
			flex: 1,
			// justifyContent: 'flex-start',
		};
		const kStyles = {
			color: 'white',
			fontSize: 250,
			textAlign: 'center',
			fontWeight: 'bold',
			top: '30%',
			fontFamily: 'anodina-regular'
		};
		const subtitleStyles = {
			color: 'white',
			fontFamily: 'anodina-regular',
			fontSize: 40,
			letterSpacing: 5,
			textAlign: 'center',
			top: '20%'
		};

		const madeWithContainer = {
	  		marginTop: 'auto',
	  		marginBottom: 50,

		}

		const madeWithStyles = {
			color: 'white',
			fontFamily: 'anodina-regular',
			fontSize: 12,
			textAlign: 'center'
		}

		return (
			<View style={viewStyles}>
				<View>
					{this.state.fontLoaded ? (
						<Text style={kStyles}>
							K
						</Text>
					) : null }
					{this.state.fontLoaded ? (
						<Text style={subtitleStyles}>
							KOUNTER
						</Text>
					) : null }
					</View>
					<View style={madeWithContainer}>
						{this.state.fontLoaded ? (
							<Text style={madeWithStyles}>
								Made with {String.fromCodePoint(0x1F92C)} in Melbourne, FL
							</Text>
						) : null }

					</View>
			</View>
		);
	}
}

export default SplashScreen;