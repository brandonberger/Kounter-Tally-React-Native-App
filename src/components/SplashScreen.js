import React from 'react';
import {Text, View} from 'react-native';
import { Font } from 'expo';
import styled from "styled-components";

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
		return (
			<SplashContainer>
				<View>
					{this.state.fontLoaded ? (
						<SplashTitle style={{fontFamily: 'anodina-regular'}}>
							K
						</SplashTitle>
					) : null }
					{this.state.fontLoaded ? (
						<SplashSubTitle style={{fontFamily: 'anodina-regular'}}>
							KOUNTER
						</SplashSubTitle>
					) : null }
					</View>
					<SplashFooter>
						{this.state.fontLoaded ? (
							<SplashFooterText style={{fontFamily: 'anodina-regular'}}>
								Made with {String.fromCodePoint(0x1F92C)} in Melbourne, FL
							</SplashFooterText>
						) : null }

					</SplashFooter>
			</SplashContainer>
		);
	}
}

export default SplashScreen;

const SplashContainer = styled.View`
	background-color: #0d0f19;
	flex: 1;
`;

const SplashTitle = styled.Text`
	color: white;
	font-size: 250;
	text-align: center;
	font-weight: bold;
	top: 30%;
`;

const SplashSubTitle = styled.Text`
	color: white;
	font-size: 40;
	letter-spacing: 5;
	text-align: center;
	top: 20%;
`;

const SplashFooter = styled.View`
	margin-top: auto;
	margin-bottom: 50;
`;

const SplashFooterText = styled.Text`
	color: white;
	font-size: 12;
	text-align: center;
`;
