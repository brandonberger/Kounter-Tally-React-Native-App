import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import { Font } from 'expo';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Modal as ModalComponent } from './Modal';
import styled from "styled-components";

function mapStateToProps(state) {
  	return { 
  		action: state.action,
		trackerCards: state.trackerCards,
	   	showConfirmButtons: state.showConfirmButtons,
	   	showPreConfirmButtons: state.showPreConfirmButtons
	}
}

function mapDispatchToProps(dispatch) {
  return {
    addKounter(card_id) {
    	dispatch({
      		type: "ADD_KOUNTER",
      		card_id: card_id
    	})
    },
    subtractKounter(card_id) {
    	dispatch({
      		type: "SUBTRACT_KOUNTER",
      		card_id: card_id
    	})
    },
    removeTracker(card_id, navigation) {
    	navigation.push('List');
    	dispatch({
    		type: "REMOVE_TRACKER",
    		card_id: card_id
    	})
    },
    resetCount(card_id) {
    	dispatch({
    		type: "RESET_TRACKER",
    		card_id: card_id
    	})
    },
    favorite(card_id) {
    	dispatch({
    		type: "FAVORITE",
    		card_id: card_id
    	})
    },
    editKounterName(card_id, newName) {
    	dispatch({
    		type: "EDIT_NAME",
    		newName: newName,
    		card_id: card_id
    	})
    },
    editDescription(card_id, newDescription) {
    	if (newDescription.trim().length == 0) { newDescription = ''; }
    	dispatch({
    		type: "EDIT_DESCRIPTION",
    		newDescription: newDescription,
    		card_id: card_id
    	})
	},
	toggleEraseAllConfirmButtons(status) {
    	dispatch({
    		type: "TOGGLE_ERASE_CONFIRM_BUTTONS",
    		showConfirmButtonsStatus: status
    	})
    }

}
}
var plus_button_image = require('../../assets/plus_button.png');
var minus_button_image = require('../../assets/minus_button.png');
var back_arrow = require('../../assets/back_arrow.png');
var trash_button = require('../../assets/trash_button.png');
var reset_button = require('../../assets/reset_button.png');
var favorites_button = require('../../assets/favorites.png');
var favorites_false_button = require('../../assets/favorites_false.png');

class Tracker extends React.Component {
	

	state = {
    	fontLoaded: false,
    	dialogOpen: false,
    	modalOpen: false,
  	};

	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-bold': require('../../assets/fonts/Anodina-Bold.otf'),
		  'anodina-regular': require('../../assets/fonts/Anodina-Regular.otf'),
		  'avenir-medium': require('../../assets/fonts/Avenir-Medium.ttf'),
		  'avenir-heavy': require('../../assets/fonts/Avenir-Heavy.ttf'),
		});

	 	this.setState({ fontLoaded: true });
	}

	static navigationOptions = {
	    header: null
  	};

  	openDialog(status) {
		this.setState({ dialogOpen: status})
	}

	openModal(status = true) {
		this.setState({ modalOpen: status });
		this.showOverlay(status);
	}

	showOverlay(status = false) {
		(status) ? overlayWidth = '100%' : overlayWidth = '0%';
		this.setState({ showOverlay: overlayWidth })
	}

	render() {

		const trackerCards = this.props.trackerCards;

		const { navigation } = this.props;
		const card_id = navigation.getParam("kounter").card_id;

		var kounter;

		trackerCards.map((item, index) => {
			if (item.card_id == card_id) {
				kounter = item;
			}
		})

		if (kounter == undefined) { return null; this.props.navigation.push('List'); }

		return (
			<View style={{flex: 1}}>
			<TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss(); } }>

				<Container style={{backgroundColor: kounter.color}}>

					<NavigationContainer>
						<TouchableOpacity 
							onPress={() => this.props.navigation.push('List')}
						>
							<NavigationButtonImage source={back_arrow}/>
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => this.openModal(true)}
						>
							<NavigationButtonImage 
								source={trash_button} 
							/>
						</TouchableOpacity>

					</NavigationContainer>


					<KounterContent style={{marginTop: hp('18%')}}>
						{this.state.fontLoaded ? (
							<KounterTitleField 
								maxLength={12}
								autoFocus={false} 
								style={{fontFamily: 'avenir-medium'}}
								onChangeText={(text) => {this.props.editKounterName(kounter.card_id, text)}}
							>
								{kounter.title}
							</KounterTitleField>
							) : null
						}
						{this.state.fontLoaded && !kounter.description ? (
							<ItemDescriptionField 
								maxLength={18}
								autoFocus={false}
								style={{fontFamily: 'avenir-medium'}}
								onChangeText={(text) => {this.props.editDescription(kounter.card_id, text)}}
								placeholder="Add Description"
								placeholderTextColor="white"
							>
							</ItemDescriptionField>
							) : (
							<ItemDescriptionField 
								maxLength={18}
								autoFocus={false}
								style={{fontFamily: 'avenir-medium'}}
								onChangeText={(text) => {this.props.editDescription(kounter.card_id, text)}}
							>
								{kounter.description}
							</ItemDescriptionField>
							)
						}

						{this.state.fontLoaded ? (
							<KounterCount style={{fontFamily: 'avenir-medium'}}>
								{kounter.currentCount}
							</KounterCount>
							):null
						}
					</KounterContent>
					<View>
						<KounterControls>
							<KounterControlButton onPress={() => this.props.subtractKounter(kounter.card_id)}>
								<KounterControlButtonImage style={{height: 48}} source={minus_button_image} />
							</KounterControlButton>
							<KounterControlButton onPress={() => this.props.addKounter(kounter.card_id)}>
								<KounterControlButtonImage style={{height: 48}} source={plus_button_image} />
							</KounterControlButton>
				      	</KounterControls>
			      	</View>


			      	<KounterSubControls style={{ marginBottom: hp(10)}}>
			      		<ResetButton onPress={() => this.props.resetCount(kounter.card_id)}>
			      			<ResetIcon source={reset_button} />
								{this.state.fontLoaded ? (
			      					<ResetButtonText style={{fontFamily: 'avenir-medium'}}> Reset </ResetButtonText>
									) : null
								}
			      		</ResetButton>
			      		<FavoriteButton onPress={() => this.props.favorite(kounter.card_id)}>
			      			{kounter.favorite_status ? (
			      				<FavoriteIcon source={favorites_button} />
			      				) : (
			      				<FavoriteIcon source={favorites_false_button} />
			      				)
			      			}
			      			{this.state.fontLoaded ? (
		      					<FavoriteButtonText style={{fontFamily: 'avenir-medium'}}> Favorite </FavoriteButtonText>
								) : null
							}
			      		</FavoriteButton>
			      	</KounterSubControls>


				</Container>
			</TouchableWithoutFeedback>
			
			<TouchableWithoutFeedback onPress={() => this.openModal(false)}>
				<Overlay style={{width: this.state.showOverlay}}></Overlay>
			</TouchableWithoutFeedback>		 
			<ModalComponent 
				modalTitle="DELETE KOUNTER"
				toggleStatus={this.state.modalOpen}
				openModalMethod={this.openModal.bind(this)}
				fontLoaded={this.state.fontLoaded}
				buttonContent="Delete"
				modalButtonTitle={'Are you sure you want to delete “'+ kounter.title + '"?'}
				buttonMethod={() => this.props.removeTracker(kounter.card_id, this.props.navigation)}
				showConfirmButtons={this.props.showConfirmButtons}
				showPreConfirmButtons={this.props.showPreConfirmButtons}
				showConfirmButtonsMethod={() => this.props.toggleEraseAllConfirmButtons}
			/>

			</View>

		);
	}
}


const NavigationContainer = styled.View`
	margin-top: 14%;
	width: 100%;
	color: #fff;
	position: absolute;
	top: 0;
	height: 20%;
	flex-direction: row;
	justify-content: space-between;
	padding-left: 25;
	padding-right: 25;
`;

const Overlay = styled.View`
	height: 100%;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	z-index: 999;
`;

const KounterControlButton = styled.TouchableOpacity`
	height: 48;
	width: 48;
	border-color: #fff;
	align-items: center;
`;

const KounterControlButtonImage = styled.Image`
	position: absolute;
	width: 48;
	resize-mode: center;
`;

const NavigationButtonImage = styled.Image`
	height: 23.85;
	width: 25;
`;

const Container = styled.View`
	flex:1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: #c74463;
`;

const KounterContent = styled.View`
	width: 100%;
`;

const KounterTitleField = styled.TextInput`
	color: #fff;
	font-size: 36;
	font-weight: bold;
	margin-top: 10;
	text-align: center;
	height: 40;
`;

const ItemDescriptionField = styled.TextInput`
	color: #fff;
	font-size: 16;
	margin-top: 8;
	text-align: center;
`;

const KounterCount = styled.Text`
	font-size: 140;
	text-align: center;
	color: white;
	margin-top: 10%;
`;

const KounterControls = styled.View`
	justify-content: space-between;
	flex-direction: row;
	margin-top: 50;
	height: 48;
	width: 200;
`;

const KounterSubControls = styled.View`
	margin-top: auto;
	flex-direction: row;
	width: 60%;
	justify-content: space-between;
`;

const ResetButton = styled.TouchableOpacity`
	flex-direction: row;
`;

const ResetIcon = styled.Image`
	width: 23.5;
	height: 20;
`;

const ResetButtonText = styled.Text`
	color: #fff;
	text-align: center;
	font-size: 18;
	padding-left: 5;
`;

const FavoriteButton = styled.TouchableOpacity`
	flex-direction: row;
`;

const FavoriteButtonText = styled.Text`
	color: #fff;
	text-align: center;
	font-size: 18;
	padding-left: 5;
`;

const FavoriteIcon = styled.Image`
	width: 20.9;
	height: 20;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
