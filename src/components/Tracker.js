import React, { Component } from 'react';
import {Keyboard, TouchableWithoutFeedback, AlertIOS, Alert, StyleSheet, Text, View, TouchableOpacity, Platform, Image, TextInput} from 'react-native';
import { Font } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import DialogInput from 'react-native-dialog-input';
import { MaterialDialog } from 'react-native-material-dialog';
import { Modal as ModalComponent } from './Modal';
import styled from "styled-components";

function mapStateToProps(state) {
	console.log(state.trackerCards);
  return { action: state.action,
  		   trackerCards: state.trackerCards,
  		 }
}

function mapDispatchToProps(dispatch) {
  return {
    addDrink(card_id) {
    	dispatch({
      		type: "ADD_DRINK",
      		card_id: card_id
    	})
    },
    subtractDrink(card_id) {
    	dispatch({
      		type: "SUBTRACT_DRINK",
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
    	dispatch({
    		type: "EDIT_DESCRIPTION",
    		newDescription: newDescription,
    		card_id: card_id
    	})
    }
  }
}
var plus_button_image = '../../assets/plus_button.png';
var minus_button_image = '../../assets/minus_button.png';


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

				<View style={[styles.container, {backgroundColor: kounter.color}]}>

					<View style={styles.navigationContainer}>
						<TouchableOpacity 
							onPress={() => this.props.navigation.push('List')}
						>
							<Image source={require('../../assets/back_arrow.png')} style={styles.navigationItems} />
						</TouchableOpacity>
						<TouchableOpacity 
							onPress={() => this.openModal(true)}

							// onPress={() => {
							// 	if(Platform.OS == 'ios') { 
							// 		AlertIOS.alert(
							// 	    'Delete Kounter', 
							// 	    'Are you sure you want to delete this Kounter?', 
						 //    		[
						 //   		   		{
							// 	   			text: 'Cancel',
							// 			   	style: 'cancel',
							// 		   	},
							// 		   	{
							// 			   	text: 'Delete',
							// 			   	onPress: (name) => this.props.removeTracker(card_id, this.props.navigation),
							// 			   	style: 'destructive'
							// 		   	},
							// 	   	],
							// 		) 
							// 	} else { this.openDialog(true) } } }
							>
							<Image 
								source={require('../../assets/trash_button.png')} 
								style={styles.navigationItems}  
							/>
						</TouchableOpacity>

						
						<MaterialDialog
						  title="Delete Kounter"
						  visible={this.state.dialogOpen}
						  onOk={() => {this.props.removeTracker(card_id, this.props.navigation), this.openDialog(false)} }
						  onCancel={() => this.openDialog(false)}
						  okLabel="Delete"
						>
						  <Text style={styles.dialogText}>
						    Are you sure you want to delete this Kounter?
						  </Text>
						</MaterialDialog>

					</View>


					<View style={styles.trackerContainer}>
						{this.state.fontLoaded ? (
							<TextInput 
								autoFocus={false} 
								style={[styles.itemName, {fontFamily: 'avenir-medium'} ]}
								onChangeText={(text) => {this.props.editKounterName(kounter.card_id, text)}}
							>
								{kounter.title}
							</TextInput>
							) : null
						}
						{this.state.fontLoaded && !kounter.description ? (
							<TextInput 
								autoFocus={false}
								style={[styles.itemDescription, {fontFamily: 'avenir-medium'} ]}
								onChangeText={(text) => {this.props.editDescription(kounter.card_id, text)}}
								placeholder="Add Description"
								placeholderTextColor="white"
							>
							</TextInput>
							) : (
							<TextInput 
								autoFocus={false}
								style={[styles.itemDescription, {fontFamily: 'avenir-medium'} ]}
								onChangeText={(text) => {this.props.editDescription(kounter.card_id, text)}}
							>
								{kounter.description}
							</TextInput>
							)
						}

						{this.state.fontLoaded ? (
							<Text style={[styles.currentCount, {fontFamily: 'avenir-medium'}]}>
								{kounter.currentCount}
							</Text>
							):null
						}
					</View>
					<View>
						<View style={styles.buttonContainer}>
							<KounterControlButton onPress={() => this.props.subtractDrink(kounter.card_id)}>
								<KounterControlButtonImage style={{height: 48}} source={require(minus_button_image)} />
							</KounterControlButton>
							<KounterControlButton onPress={() => this.props.addDrink(kounter.card_id)}>
								<KounterControlButtonImage style={{height: 48}} source={require(plus_button_image)} />
							</KounterControlButton>
				      	</View>
			      	</View>


			      	<View style={styles.trackerFooter}>
			      		<TouchableOpacity style={styles.resetButton} onPress={() => this.props.resetCount(kounter.card_id)}>
			      			<Image style={styles.resetIcon} source={require('../../assets/reset_button.png')} />
								{this.state.fontLoaded ? (
			      					<Text style={[styles.resetButtonText, {fontFamily: 'avenir-medium'}]}> Reset </Text>
									) : null
								}
			      		</TouchableOpacity>
			      		<TouchableOpacity style={styles.favoriteButton} onPress={() => this.props.favorite(kounter.card_id)}>
			      			{kounter.favorite_status ? (
			      				<Image style={styles.favoriteIcon} source={require('../../assets/favorites.png')} />
			      				) : (
			      				<Image style={styles.favoriteIcon} source={require('../../assets/favorites_false.png')} />
			      				)
			      			}
			      			{this.state.fontLoaded ? (
		      					<Text style={[styles.favoriteButtonText, {fontFamily: 'avenir-medium'}]}> Favorite </Text>
								) : null
							}
			      		</TouchableOpacity>
			      	</View>


				</View>
			</TouchableWithoutFeedback>
			
			<TouchableWithoutFeedback onPress={() => this.openModal(false)}>
				<Overlay style={{width: this.state.showOverlay}}></Overlay>
			</TouchableWithoutFeedback>		 
			<ModalComponent 
				toggleStatus={this.state.modalOpen}
				openModalMethod={this.openModal.bind(this)}
				fontLoaded={this.state.fontLoaded}
				buttonContent="Erase All Data"
				modalText={'Are you sure you want to delete “'+ kounter.title + '"?'}
			/>

			</View>

		);
	}
}


const Overlay = styled.View`
	height: 100%;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	z-index: 999;
`;

const KounterControlButton = styled.View`
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

const styles = StyleSheet.create({
	navigationContainer: {
		marginTop: '7.5%',
		width: '100%',
		color: '#fff',
		position: 'absolute',
		top: 0,
		height: '20%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: (0, 25),
	},
	navigationItems: {
		height: 23.85,
		width: 25,
	},
	container: {
		flex:1,
		flexDirection: 'column',
    	alignItems: 'center',
    	justifyContent: 'center',
    	width: '100%',
    	backgroundColor: '#c74463',
	},
	trackerContainer: {
    	marginTop: hp('18%'),
	},
	itemName: {
		color: '#fff',
		fontSize: 36,
		fontWeight: 'bold',
		marginTop: 10,
		textAlign: 'center',
		height: 36

	},
	itemDescription: {
		color: '#fff',
		fontSize: 16,
		marginTop: 8,
		textAlign: 'center',
	},
	currentCount: {
		fontSize: 140,
		textAlign: 'center',
		color: 'white',
		marginTop: '10%'
	},
	buttonContainer: {
	    justifyContent: 'space-between',
	    flexDirection: 'row',
	    marginTop: 50,
	    height: 48,
	    width: 200
  	},
  	trackerFooter: {
  		marginTop: 'auto',
  		marginBottom: 100,
  		flexDirection: 'row',
  		width: '60%',
  		justifyContent: 'space-between'
  	},
  	resetButton: {
  		flexDirection: 'row'
  	},
  	resetIcon: {
  		width: 23.5,
  		height: 20
  	},
  	resetButtonText: {
  		color: '#fff',
  		textAlign: 'center',
  		fontSize: 18,
  		paddingLeft: 10
  	},
  	favoriteButton: {
  		flexDirection: 'row'
  	},
  	favoriteButtonText: {
  		color: '#fff',
  		textAlign: 'center',
  		fontSize: 18,
  		paddingLeft: 10
  	},
  	favoriteIcon: {
  		width: 20.9,
  		height: 20
  	},
});


export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
