import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

class Dialog extends React.Component {
	
	constructor(props){
   		super(props);
 	}

	render() {
		let dialogOpen = this.props.open;
		let dialogErrorStatus = this.props.dialogErrorStatus;

		showDialog = 'none';

		if (dialogOpen) {
			showDialog = 'flex';
			dialogWidth = 300;
			dialogContainerWidth = '100%';
		} else {
			showDialog = 'none';
			dialogWidth = '0%';
			dialogContainerWidth = '0%';
		}

		if (dialogErrorStatus) {
			errorBorderStyle = "solid";
			errorBorderColor = "red";
			errorBorderWidth = 1;
		} else {
			errorBorderStyle = "solid";
			errorBorderColor = "transparent";
			errorBorderWidth = 0;
		}


		addNewKounter = (newKounterTitle) => {

			console.log(this.props.numberOfCards);

			if(newKounterTitle) { 
				this.props.addNewTracker(
					this.props.numberOfCards, 
				 	newKounterTitle, 
				 	this.props.getRandomColor(
				 		(this.props.trackerCards.length > 0) 
				 		? this.props.trackerCards[this.props.trackerCards.length - 1].color 
				 		: null
			 		)
				), 
				newKounterTitle = null, 
				this.props.openDialogMethod(false), 
				this.dialogField.clear(), 
				this.setState({dialogError: false})
			} else { 
				this.props.triggerError(); 
			}
		}

		return (
			<DialogContainer style={{ display: showDialog, width: dialogContainerWidth }}>
				<DialogModal style={{top: hp(50) - 185 / 2, width: dialogWidth}}>
					<DialogTitle>
						Add New Kounter
					</DialogTitle>
					<DialogSubtitle>
						Enter name of your kounter.
					</DialogSubtitle>

					<DialogFieldContainer>
					{dialogErrorStatus ? (
						<Ionicons style={{position: 'absolute', right: 35, top: 25, zIndex: 90}} size={24} color="red" name="ios-alert" />
						) : null
					}
						<DialogField 
							style={{borderStyle: errorBorderStyle, 
									borderColor: errorBorderColor, 
									borderWidth: errorBorderWidth}} 
							ref={
								input => {
									this.dialogField = input
								}
							} 
							onSubmitEditing={
								() => { addNewKounter(newKounterTitle) }
							} 
							placeholder="Enter Name" 
							placeholderTextColor="#828282" 
							onChangeText={(text) => newKounterTitle = text}
						>
						</DialogField>
					</DialogFieldContainer>
					<DialogButtons>
						<DialogCancel onPress={() => {this.props.openDialogMethod(false), this.dialogField.clear()}} >
							<DialogCancelText>
								Cancel
							</DialogCancelText>
						</DialogCancel>
						<DialogSubmit onPress={() => { addNewKounter(newKounterTitle) }}>
							<DialogSubmitText>
								Add
							</DialogSubmitText>
						</DialogSubmit>
					</DialogButtons>
				</DialogModal>
			</DialogContainer>
		);
	}
}

export {Dialog};

const DialogContainer = styled.View`
	flex: 1;
	z-index: 99;
	height: 100%;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	margin:0 auto;
	justify-content: center;
	align-items: center;
`;
	
const DialogModal = styled.View`
	height: 185px;
	z-index: 100;
	position:absolute;
	background-color:#0D0F19;
	border-radius: 10px;
`;
const DialogTitle = styled.Text`
	color: white;
	font-size: 18px;
	letter-spacing: -0.375px;
	top: 20px;
	text-align: center;
	
`;
const DialogSubtitle = styled.Text`
	color: #BDBDBD;
	font-size: 14px;
	text-align: center;
	margin-top: 24px;
`;

const DialogError = styled.Text`
	color: red;
	font-size: 10px;
	text-align: center;
	position: absolute;
	top: 35%;
	width: 100%;
`;

const DialogFieldContainer = styled.View`
	position: relative;
`;

const DialogErrorIcon = styled.Image`
	position: absolute;
	right: 35;
	top: 25;
	z-index: 90;
`;

const DialogField = styled.TextInput`
	width: 258px;
	height: 40px;
	background: #090909;
	margin:0 auto;
	margin-top: 17px;
	border-radius: 10px;
	color: white;
	padding: 11px;
`;

const DialogButtons = styled.View`
	flex: 1;
	flex-direction: row;
	margin-top: 20px;
	justify-content: space-evenly;
`;

const DialogCancel = styled.TouchableOpacity`
`;
const DialogSubmit = styled.TouchableOpacity`
`;

const DialogSubmitText = styled.Text`
	color: white;
	font-size: 18px;
	letter-spacing: -0.375px;
`;
const DialogCancelText = styled.Text`
	color: white;
	font-size: 18px;
	letter-spacing: -0.375px;
`;