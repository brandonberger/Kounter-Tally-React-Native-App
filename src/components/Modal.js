import React from 'react';
import {Linking, ouchableOpacity, Platform, Animated, View, Text, Image} from 'react-native';
import styled from "styled-components";
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import FontComponent from './FontComponent';

var modal_handle = require('../../assets/modal_handle.png');
var settings_icon = require('../../assets/settings.png');
var instagram_icon = require('../../assets/instagram_icon.png');
var twitter_icon = require('../../assets/twitter_icon.png');


const config = {
  velocityThreshold: 0.01,
  directionalOffsetThreshold: 20
};


class Modal extends React.Component {

	constructor(props) {
	  	super(props);
  		this.state = { 
	  		menuTop: new Animated.Value(300),
		}
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
	  	}

		toggleSettings(this.props.toggleStatus);


	    confirmPrompt = (status = true) => {
	    	if (this.props.hasCardData) {
		    	if (status) {
		    		this.props.modalButtonTitle = 'Are you sure?';
	    			this.props.showConfirmButtonsMethod('flex');
		    	} else {
	    			this.props.showConfirmButtonsMethod('none');
		    	}
	    	}
	    }

	    confirmDeleteAll = () => {
			this.props.buttonMethod();
			this.props.openModalMethod(false);
	    }

	    if (this.props.hasCardData === 0) {
	    	eraseButtonStatus = true;
	    	eraseButtonColor = '#212121';
	    	eraseButtonTextColor = '#303030';
	    } else {
	    	eraseButtonStatus = false;
	    	eraseButtonColor = '#DC2727';
	    	eraseButtonTextColor = '#FFFFFF';
	    }

	    // console.log('Confirm buttons: ' + this.props.showConfirmButtons);
	    // console.log('PreConfirm: ' + this.props.showPreConfirmButtons);

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
		            	<ModalHandle source={modal_handle} />
		            	<ModalTitleContainer>
		            		<ModalHeaderIcon source={settings_icon} />
	            			<ModalTitle>
											<FontComponent text={this.props.modalTitle} fontFamily="avenir-heavy" />
	            			</ModalTitle>
		            	</ModalTitleContainer>
		            </ModalHeader>
		            <ModalContainer>

		            	{this.props.modalItem ? (
			            <ModalItem>
			            	<ModalItemHeader>
				            	<ModalItemTitle>
												<FontComponent text="Sync to Cloud" fontFamily="avenir-medium" />
				            	</ModalItemTitle>
				            	<ModalItemDescription>
												<FontComponent text="Coming Soon..." fontFamily="avenir-medium" />
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


		            	<ModalMainButton>
				            <ModalButtonTitle style={{ display: this.props.showPreConfirmButtons }}>
											<FontComponent text={this.props.modalButtonTitle} fontFamily="avenir-medium" />
				            </ModalButtonTitle>
				            <SettingsDangerButton 
				            	disabled={eraseButtonStatus} 
				            	style={{ backgroundColor: eraseButtonColor, color: eraseButtonTextColor, display: this.props.showPreConfirmButtons }} 
				            	onPress={(this.props.confirmPrompt) ? () => confirmPrompt() : this.props.buttonMethod}
				            >
											<SettingsDangerButtonText>
												<FontComponent text={this.props.buttonContent} fontFamily="avenir-medium" />
											</SettingsDangerButtonText>
				            </SettingsDangerButton>
				        </ModalMainButton>


				        <ModalConfirmStuff>
				            <ModalButtonTitle style={{ display: this.props.showConfirmButtons }}>
											<FontComponent text="Are you sure you want to erase all data?" fontFamily="avenir-medium" />
				            </ModalButtonTitle>
				            <ModalConfirmButton style={{ display: this.props.showConfirmButtons }}>
					            <ModalConfirmDangerButton onPress={() => confirmPrompt(false)}>
					            		<SettingsDangerButtonText>
														<FontComponent text="No Way!" fontFamily="avenir-medium" />
													</SettingsDangerButtonText>
					            </ModalConfirmDangerButton>
					            <ModalConfirmSuccessButton onPress={ () => confirmDeleteAll() }>
					            		<SettingsDangerButtonText>
														<FontComponent text="Yea, I’m sure." fontFamily="avenir-medium" />
													</SettingsDangerButtonText>
					            </ModalConfirmSuccessButton>
				           	</ModalConfirmButton>
					    </ModalConfirmStuff>


			            {this.props.modalFooter ? (
			            <ModalFooter>
			            	<ModalFooterIcons>
			            		<InstagramLink onPress={() => Linking.openURL('https://www.instagram.com/blckwhteco/')}>
			            			<InstagramIcon source={instagram_icon} />
			            		</InstagramLink>
			            		<TwitterLink onPress={() => Linking.openURL('https://twitter.com/blckwhteco')}>
			            			<TwitterIcon source={twitter_icon} />
			            		</TwitterLink>
			            	</ModalFooterIcons>
			            	<WebsiteLink onPress={() => Linking.openURL('http://blckwhte.co')}>
			            		<ModalFooterMessage>
												<FontComponent text="INNOVATED AT BLCKWHTE.CO" fontFamily="avenir-black" />
			            		</ModalFooterMessage>
			            	</WebsiteLink>
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
	padding-bottom: 30px;
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

const ModalMainButton = styled.View``;

const ModalConfirmStuff = styled.View``;

const ModalTitleContainer = styled.View`
	width: 100%;
	height: auto;
	flex-direction: row;
	justify-content: center;
	margin-top: 20px;
	align-items: center;
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


const ModalConfirmButton = styled.View`
	flex-direction: row;
`;

const ModalConfirmDangerButton = styled.TouchableOpacity`
	background-color: #DC2727;
	justify-content: center;
	margin:0 auto;
	max-width: 157px;
	min-width: 45%;
	margin-bottom: 20;
	height: 40;
	border-radius: 8px;
`;
const ModalConfirmSuccessButton = styled.TouchableOpacity`
	background-color: #4CD964;
	justify-content: center;
	margin:0 auto;
	max-width: 157px;
	min-width: 45%;
	margin-bottom: 20;
	height: 40;
	border-radius: 8px;
`;

const SettingsDangerButton = styled.TouchableOpacity`
	background-color: #DC2727;
	justify-content: center;
	margin:0 auto;
	max-width: 335px;
	width: 95%;
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
	padding-bottom: 30px;
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

const TwitterLink = styled.TouchableOpacity``;

const TwitterIcon = styled.Image`
	height: 24px;
	width: 24px;
	margin-left: 10px;
`;

const InstagramLink = styled.TouchableOpacity``;

const InstagramIcon = styled.Image`
	height: 24px;
	margin-right: 10px;
	width: 24px;
`;

const WebsiteLink = styled.TouchableOpacity``;

const ModalFooterMessage = styled.Text`
	font-size: 10px;
	color: white;
	text-align: center;
	padding-top: 20px;
`;




