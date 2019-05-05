import React from 'react';
import {TouchableOpacity, Platform, Animated, View, Text, Image} from 'react-native';
import styled from "styled-components";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

class Modal extends React.Component {

	constructor(props) {
	  	super(props);
  		this.state = { 
	  		menuTop: new Animated.Value(300),
		}

	}

	componentDidUpdate() {
		toggleSettings(this.props.toggleStatus);
	}

	render() {

		let showOverlay = 0;

		toggleSettings = (status) => {

	  		if (Platform.OS == 'ios') {
				toValue = hp(0);
			} else {
				toValue = hp(0);
			}

	  		if (status == true) {
				Animated.spring(this.state.menuTop, {
					toValue: toValue
				}).start();
				showOverlay = '100%';
	  		}

	  		if (status == false) {
				Animated.spring(this.state.menuTop, {
					toValue: 207
				}).start();
				showOverlay = '0%';
	  		}
	  	};	

		const config = {
	      velocityThreshold: 0.01,
	      directionalOffsetThreshold: 20
	    };

		return (

			<AnimatedContainer 
          		style={{ 
	            	transform: [{ translateY: this.state.menuTop }], 
	            }}>
	            <GestureRecognizer 
	            	style={{height: '100%', width: '100%', backgroundColor: '#0D0F19'}} 
	            	onSwipeDown={() => this.props.openModalMethod(false)} 
	            	config={config}>
		            
		            <ModalHeader>
		            	<ModalHandle source={require('../../assets/modal_handle.png')} />
		            </ModalHeader>

		            {this.props.modalText ? 
		            (<ModalText>
		            	{this.props.modalText}
		            </ModalText>) : null }

		            <SettingsDangerButton onPress={this.props.buttonMethod}>
		            	{this.props.fontLoaded ? (
		            		<SettingsDangerButtonText style={{fontFamily: 'avenir-medium'}}>{this.props.buttonContent}</SettingsDangerButtonText>
		            		) : null
		            	}
		            </SettingsDangerButton>
        		</GestureRecognizer>
        	</AnimatedContainer>
		);
	}	
}

export {Modal};


const SettingsContainer = styled.View`
	height: auto;
	background-color: #0D0F19;
	width: 100%;
	position: absolute;
	z-index: 1000;
	bottom: 0;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(SettingsContainer);


const ModalHeader = styled.View`
	width: 100%;
	justify-content: center;
	flex-direction: row;
	margin-top: 11px;
	margin-bottom: 25px;
`;

const ModalHandle = styled.Image`
	
`;

const ModalText = styled.Text`
	font-size: 18px;
	justify-content: center;
	text-align: center;
	margin: 0 auto;
	color: white;
	width: 305px;
	margin-bottom: 40;
`;

const SettingsDangerButton = styled.TouchableOpacity`
	background-color: #DC2727;
	justify-content: center;
	margin:0 auto;
	width: 335px;
	margin-bottom: 40;
	height: 40;
	border-radius: 8px;
`;

const SettingsDangerButtonText = styled.Text`
	color: #ffffff;
	text-align: center;
	font-size: 16;
`;