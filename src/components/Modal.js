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
					toValue: hp(100)
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
		            	<ModalTitleContainer>
		            		<ModalHeaderIcon source={require('../../assets/settings.png')} />

		            		<ModalTitle>
								{this.props.modalTitle}	            		
		            		</ModalTitle>
		            	</ModalTitleContainer>
		            </ModalHeader>
		            <ModalContainer>

		            	{this.props.modalItem ? (
			            <ModalItem>
			            	<ModalItemHeader>
				            	<ModalItemTitle>
				            		Sync to Cloud
				            	</ModalItemTitle>
				            	<ModalItemDescription>
				            		Coming Soon...
				            	</ModalItemDescription>
			            	</ModalItemHeader>
			            	<ModalIconContainer>
			            		<ModalItemIcon>
			            			<ToggleParent>
			            				<ToggleChild>

			            				</ToggleChild>
			            			</ToggleParent>
			            		</ModalItemIcon>
			            	</ModalIconContainer>
			            </ModalItem> ) : null }


			            <ModalButtonTitle>
			            	{this.props.modalButtonTitle}
			            </ModalButtonTitle>
			            <SettingsDangerButton onPress={this.props.buttonMethod}>
			            	{this.props.fontLoaded ? (
			            		<SettingsDangerButtonText style={{fontFamily: 'avenir-medium'}}>{this.props.buttonContent}</SettingsDangerButtonText>
			            		) : null
			            	}
			            </SettingsDangerButton>
			            {this.props.modalFooter ? (
			            <ModalFooter>
			            	<ModalFooterIcons>
			            		<TwitterIcon source={require('../../assets/twitter_icon.png')}/>
			            		<InstagramIcon source={require('../../assets/twitter_icon.png')}/>
			            	</ModalFooterIcons>
			            	<ModalFooterMessage>
			            		INNOVATED AT BLCKWHTE.CO
			            	</ModalFooterMessage>
			            </ModalFooter>) : null }
			        </ModalContainer>
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
	align-items: center;
	flex-direction: column;
	margin-top: 11px;
	margin-bottom: 25px;
`;

const ModalHandle = styled.Image``;


const ModalTitleContainer = styled.View`
	width: 100%;
	height: auto;
	flex-direction: row;
	justify-content: center;
	margin-top: 20px;
`;

const ModalHeaderIcon = styled.Image`
	height: 14px;
	width: 14px;
`;

const ModalTitle = styled.Text`
	padding-left: 10px;
	color: white;
	font-size: 14px;
	text-align: center;
	font-weight:bold;
`;

const ModalContainer = styled.View`
	margin-left: 20px;
	margin-right:  20px;
`;

const ModalItem = styled.View`
	width: 100%;
	height: 60px;
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-style: solid;
	border-top-color: #292929;
	border-bottom-color: #292929;
	flex: 1;
	margin-bottom: 20px;
	flex-direction: row;
`;

const ModalItemHeader = styled.View`
	height: 100%;
	width: 50%;
	flex-direction: column;
	justify-content: center;
`;
	
const ModalItemTitle = styled.Text`
	font-size: 14px;
	color: white;
`;

const ModalItemDescription = styled.Text`
	color: white;
	font-size: 10px;
`;

const ModalItemIcon = styled.View``;

const ModalIconContainer = styled.View`
	width: 50%;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
`;

const ToggleParent = styled.View`
	width: 50px;
	height: 30px;
	background: #303030;
	border-radius: 15px;
	position: relative;
	right: 0;
`;
const ToggleChild = styled.View`
	background: #212121;
	width: 20px;
	height: 20px;
	position: absolute;
	border-radius: 100;
	left: 5px;
	top: 5px;
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

const ModalButtonTitle = styled.Text`
	font-size: 14px;
	color: white;
	text-align: center;
	margin-bottom: 20px;
`;

const SettingsDangerButton = styled.TouchableOpacity`
	background-color: #DC2727;
	justify-content: center;
	margin:0 auto;
	width: 335px;
	margin-bottom: 20;
	height: 40;
	border-radius: 8px;
`;

const SettingsDangerButtonText = styled.Text`
	color: #ffffff;
	text-align: center;
	font-size: 16;
`;

const ModalFooter = styled.View`
	padding-bottom: 44px;
	border-style: solid;
	border-top-width: 1px;
	border-color: #292929;
`;
const ModalFooterIcons = styled.View`
	flex: 1;
	justify-content: center;
	flex-direction: row;
	align-items: center;
	margin-top: 20px;
`;
const TwitterIcon = styled.Image`
	height: 24px;
	width: 24px;
	margin-right: 10px;
`;
const InstagramIcon = styled.Image`
	height: 24px;
	width: 24px;
	margin-left: 10px;
`;
const ModalFooterMessage = styled.Text`
	font-size: 10px;
	color: white;
	text-align: center;
	padding-top: 20px;
`;




