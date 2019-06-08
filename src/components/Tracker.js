import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, Text, View, TouchableOpacity, Image, TextInput} from 'react-native';
import { Font } from 'expo';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import { Modal as ModalComponent } from './Modal';
import styled from "styled-components";
import {addCount, subtractCount, favoriteKounter, resetCount, updateName, updateDescription, deactivateKounter, updateKounters} from './KounterFunctions';


function mapStateToProps(state) {
  	return { 
  		action: state.action,
			kounters: state.kounters,
	   	showConfirmButtons: state.showConfirmButtons,
	   	showPreConfirmButtons: state.showPreConfirmButtons
	}
}

function mapDispatchToProps(dispatch) {
  return {
    addCount: id =>
    	dispatch({
      		type: "ADD_KOUNTER",
      		id: id
    	}),
    subtractCount: id =>
    	dispatch({
      		type: "SUBTRACT_KOUNTER",
      		id: id
    	}),
			deactivateKounter(id, navigation) {
    	dispatch({
    		type: "DEACTIVATE_KOUNTER",
    		id: id
			})
		},
    resetCount: id =>
    	dispatch({
    		type: "RESET_TRACKER",
    		id: id
    	}),
    favoriteKounter: id =>
    	dispatch({
    		type: "FAVORITE",
    		id: id
    	}),
    updateName: (id, newName) =>
    	dispatch({
    		type: "EDIT_NAME",
    		newName: newName,
    		id: id
    	}),
    updateDescription(id, newDescription) {
    	if (newDescription.trim().length == 0) { newDescription = ''; }
    	dispatch({
    		type: "EDIT_DESCRIPTION",
    		newDescription: newDescription,
    		id: id
			})
		},
		toggleEraseAllConfirmButtons: (status) =>
    	dispatch({
    		type: "TOGGLE_ERASE_CONFIRM_BUTTONS",
    		showConfirmButtonsStatus: status
    	}),
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

	componentDidUpdate() {
			if (this.props.action == 'DEACTIVATE') {
				updateKounters(this.props.kounters, this.props.navigation);
		}
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

	handleUpdateKounter = (id, type, value, extra) => {

		switch (type) {
			case 'ADD':
					addCount(id);
					this.props.addCount(id);
					break;
			case 'SUBTRACT':
					subtractCount(id);
					this.props.subtractCount(id);
					break;
			case 'FAVORITE':
					favoriteKounter(id);
					this.props.favoriteKounter(id);
					break;
			case 'RESET':
					resetCount(id);
					this.props.resetCount(id);
					break;
			case 'UPDATE_NAME':
					updateName(id, value);
					this.props.updateName(id, value);
					break;
			case 'UPDATE_DESCRIPTION':
					updateDescription(id, value);
					this.props.updateDescription(id, value);
					break;
			case 'DEACTIVATE':
					this.props.deactivateKounter(id, extra);
					break;
		}
	}

	render() {

		const kounters = this.props.kounters;
		const { navigation } = this.props;
		const kounter_id = navigation.getParam("kounter").id;
		var kounter;

		kounters.map((item, index) => {
			if (item.id == kounter_id) {
				kounter = item;
			}
		})

		// if (kounter == undefined) { return null; this.props.navigation.push('List'); }

		return (
			<View style={{flex: 1}}>
			<TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss(); } }>

				<Container style={{backgroundColor: kounter.color}}>

					<NavigationContainer>
						<TouchableOpacity 
							onPress={() => this.props.navigation.pop()}
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
								onChangeText={(text) => {this.handleUpdateKounter(kounter.id, 'UPDATE_NAME', text)}}
							>
								{kounter.name}
							</KounterTitleField>
							) : null
						}
						{this.state.fontLoaded && !kounter.description ? (
							<ItemDescriptionField 
								maxLength={18}
								autoFocus={false}
								style={{fontFamily: 'avenir-medium'}}
								onChangeText={(text) => {this.handleUpdateKounter(kounter.id, 'UPDATE_DESCRIPTION', text)}}
								placeholder="Add Description"
								placeholderTextColor="white"
							>
							</ItemDescriptionField>
							) : (
							<ItemDescriptionField 
								maxLength={18}
								autoFocus={false}
								style={{fontFamily: 'avenir-medium'}}
								onChangeText={(text) => {this.handleUpdateKounter(kounter.id, 'UPDATE_DESCRIPTION', text)}}
							>
								{kounter.description}
							</ItemDescriptionField>
							)
						}

						{this.state.fontLoaded ? (
							<KounterCount style={{fontFamily: 'avenir-medium'}}>
								{kounter.amount}
							</KounterCount>
							):null
						}
					</KounterContent>
					<View>
						<KounterControls>
							<KounterControlButton onPress={() => this.handleUpdateKounter(kounter.id, 'SUBTRACT')}>
								<KounterControlButtonImage style={{height: 48}} source={minus_button_image} />
							</KounterControlButton>
							<KounterControlButton onPress={() => this.handleUpdateKounter(kounter.id, 'ADD')}>
								<KounterControlButtonImage style={{height: 48}} source={plus_button_image} />
							</KounterControlButton>
				      	</KounterControls>
			      	</View>


			      	<KounterSubControls style={{ marginBottom: hp(10)}}>
			      		<ResetButton onPress={() => this.handleUpdateKounter(kounter.id, 'RESET')}>
			      			<ResetIcon source={reset_button} />
								{this.state.fontLoaded ? (
			      					<ResetButtonText style={{fontFamily: 'avenir-medium'}}> Reset </ResetButtonText>
									) : null
								}
			      		</ResetButton>
			      		<FavoriteButton onPress={() => this.handleUpdateKounter(kounter.id, 'FAVORITE')}>
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
				modalTitle="DEACTIVATE KOUNTER"
				toggleStatus={this.state.modalOpen}
				openModalMethod={this.openModal.bind(this)}
				fontLoaded={this.state.fontLoaded}
				buttonContent="Delete"
				modalButtonTitle={'Are you sure you want to delete “'+ kounter.title + '"?'}
				buttonMethod={() => this.handleUpdateKounter(kounter.id, 'DEACTIVATE', null, this.props.navigation)}
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
