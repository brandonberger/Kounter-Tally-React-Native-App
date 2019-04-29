import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
import { Animated, Easing, StatusBar, Alert, Platform, AlertIOS, ScrollView, TouchableOpacity, View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { connect } from 'react-redux';
import DialogInput from 'react-native-dialog-input';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-navigation';
import styled from "styled-components";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

function mapStateToProps(state) {
	console.log(state);
	return { 
			 action: state.action,
		   	 trackerCards: state.trackerCards,
		   	 numberOfCards: state.trackerCards.length,
		   	 totalCardsEver: state.totalCardHistory
 	  	   }	
}

function mapDispatchToProps(dispatch) {
  	return {
	    addNewTracker(newCardNumber, name, color) {
	    	name ? 
	    	dispatch({
	      		type: "ADD_NEW_TRACKER",
	      		new_tracker: 
	      			{
	      			card_id: newCardNumber + 1,
	      			title: name,
	      			color: color,
      				currentCount: 0
      				}
	    	})
	    	: null
	    },
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
	    openSettings() {
	    	dispatch({
	    		type: "OPEN_SETTINGS"
	    	})
	    },
	    closeSettings() {
	    	dispatch({
	    		type: "CLOSE_SETTINGS"
	    	})
	    },
	    deleteAll() {
	    	dispatch({
	    		type: "DELETE_ALL"
	    	})
	    } 
	}
}


function getRandomColor(lastColor = null) {
	colors = [
		'#173DD2',
		'#1783D2',
		'#0C568C',
		'#DC2727',
		'#D21771',
		'#F16618',
		'#009F36',
		'#009F83',
		'#145951',
		'#4D0BB9',
		'#6F1DF3',
		'#A92DBD',
	];

	if (lastColor) {
		colors.splice(colors.indexOf(lastColor), 1);
	}

	return colors[Math.floor(Math.random()*colors.length)];
}


var plus_button_image = '../../assets/plus_button.png';

class ListScreen extends Component {

	constructor(props) {
	  super(props);
		  this.state = { 
		  	isLoading: true, 
		  	dialogOpen: false,
		  	menuTop: new Animated.Value(300),
    	}
	}

	state = {
    	fontLoaded: false,
    	dialogOpen: false,
  	};



	triggerError() {
		this.setState({dialogError: true})
	}

	async componentDidMount() {

		StatusBar.setBarStyle("light-content", true);

		await Font.loadAsync({
		  'anodina-xbold': require('../../assets/fonts/Anodina-ExtraBold.otf'),
		  'avenir-medium': require('../../assets/fonts/Avenir-Medium.ttf'),
		  'avenir-heavy': require('../../assets/fonts/Avenir-Heavy.ttf'),
		});

		await this.setState({ fontLoaded: true });
	}

	openDialog(status) {
		this.setState({ dialogOpen: status})
	}

	static navigationOptions = {
	    header: null
  	};

  	componentDidUpdate() {
  		this.toggleSettings();
  	}

  	toggleSettings = () => {
  		if (Platform.OS == 'ios') {
			toValue = hp(0 );
		} else {
			toValue = hp(0);
		}


  		if (this.props.action == "openSettings") {
			Animated.spring(this.state.menuTop, {
				toValue: toValue
			}).start();
  		}

  		if (this.props.action == "closeSettings") {
			Animated.spring(this.state.menuTop, {
				toValue: 207
			}).start();
  		}
  	};	

	render() {
		const newCardName = 'card_'+this.props.currentTrackerCount;

		if (Platform.OS == 'android') { 
			headerMargin = StatusBar.currentHeight + 11 
		} else { 
			headerMargin = 11
		}

		favoritesExist = false;
		kountersExist = false;
		this.props.trackerCards.filter(card=>card.favorite_status).map((card, card_id) => {
			favoritesExist = true;
		});

		if (favoritesExist) {
			showFavorites = 'flex';
		} else {
			showFavorites = 'none';
		}

		this.props.trackerCards.filter(card=>!card.favorite_status).map((card, card_id) => {
			kountersExist = true;
		});

		if (kountersExist) {
			showKounters = 'flex';
		} else {
			showKounters = 'none';
		}

		if(kountersExist || favoritesExist) {
			showAddButton = 'flex';
		} else {
			showAddButton = 'none';
		}


		showDialog = 'none';

		if (this.state.dialogOpen) {
			showDialog = 'flex';
			dialogWidth = 300;
			dialogContainerWidth = '100%';
		} else {
			showDialog = 'none';
			dialogWidth = '0%';
			dialogContainerWidth = '0%';
		}

		const config = {
	      velocityThreshold: 0.01,
	      directionalOffsetThreshold: 20
	    };

	    newKounterTitle = '';

		return (
			<Container>
				<DialogContainer style={{ display: showDialog, width: dialogContainerWidth }}>
					<Dialog style={{top: hp(50) - 185 / 2, width: dialogWidth}}>
						<DialogTitle>
							Add New Kounter
						</DialogTitle>
						<DialogSubtitle>
							Enter name of your kounter.
						</DialogSubtitle>

						{this.state.dialogError ? (
							<DialogError>
							Please Enter a name.
							</DialogError>
							) : null
						}

						<DialogField ref={input => {this.dialogField = input}} onSubmitEditing={() => { if(newKounterTitle) { this.props.addNewTracker(this.props.numberOfCards, newKounterTitle, getRandomColor((this.props.trackerCards.length > 0) ? this.props.trackerCards[this.props.trackerCards.length - 1].color : null)), newKounterTitle = null, this.openDialog(false), this.dialogField.clear()} else { this.triggerError(); }} } placeholder="Enter Name" placeholderTextColor="#828282" onChangeText={(text) => newKounterTitle = text}>
						</DialogField>
						<DialogButtons>
							<DialogCancel onPress={() => {this.openDialog(false), this.dialogField.clear()}} >
								<DialogCancelText>
									Cancel
								</DialogCancelText>
							</DialogCancel>
							<DialogSubmit onPress={() => {if(newKounterTitle) { this.props.addNewTracker(this.props.numberOfCards, newKounterTitle, getRandomColor((this.props.trackerCards.length > 0) ? this.props.trackerCards[this.props.trackerCards.length - 1].color : null)), newKounterTitle = null, this.openDialog(false), this.dialogField.clear()} else { this.triggerError() }}}>
								<DialogSubmitText>
									Add
								</DialogSubmitText>
							</DialogSubmit>
						</DialogButtons>
					</Dialog>
				</DialogContainer>

				<SafeAreaView forceInset={{ bottom: 'never'}}> 
						<Header style={{marginTop: headerMargin}}>
							{this.state.fontLoaded ? (
								<HeaderTitle style={{fontFamily: 'anodina-xbold'}}>KOUNTER</HeaderTitle>
								) : null
							}
							<SettingsButton 
								onPress={this.props.openSettings}>
								<Image source={require('../../assets/settings.png')} />
							</SettingsButton>

						</Header>
	            	<ScrollView style={{ height: "100%"}}>
						<CardContainer>
							<FavoritesContainer style={{display: showFavorites}}>
								{this.state.fontLoaded ? (
									<FavoritesText style={{fontFamily: 'avenir-heavy'}}>FAVORITES</FavoritesText>
									) : null
								}
								<FavoritesIcon source={require('../../assets/favorites.png')} />
							</FavoritesContainer>


							{this.props.trackerCards.filter(card=>card.favorite_status).map((card, card_id) => {
								return (
								<Card key={card_id} style={{backgroundColor: card.color}}>
									<CardHeader>
										<TouchableOpacity 
											onPress={() => { 
				                              this.props.navigation.push("Tracker", {
				                                kounter: card
				                              });
				                            }}
											>
										{this.state.fontLoaded ? (
											<CardTitle style={{fontFamily: 'avenir-medium'}}>
												{card.title}
											</CardTitle>
											) : null
										}

										{this.state.fontLoaded ? (
											<CardDescription style={{fontFamily: 'avenir-medium'}}>
												Description
											</CardDescription>
											) : null
										}
										</TouchableOpacity>
									</CardHeader>
									<CardControlsContainer>
										<CardButtonContainer style={styles.cardButtonContainer} onPress={() => this.props.subtractDrink(card.card_id)}>
											<CardMinusButton source={require('../../assets/minus_button.png')} />
										</CardButtonContainer>
										{this.state.fontLoaded ? (
											<CardDrinkCount style={{fontFamily: 'avenir-medium'}}>
												{card.currentCount}
											</CardDrinkCount>
											) : null
										}
										<CardButtonContainer onPress={() => this.props.addDrink(card.card_id)}>
											<CardPlusButton source={require('../../assets/plus_button.png')} />
										</CardButtonContainer>
									</CardControlsContainer>
								</Card>
								)
							})}

							{this.state.fontLoaded ? (
								<KountersText style={{fontFamily: 'avenir-heavy'}, {display: showFavorites}}>
									KOUNTERS
								</KountersText>
								) : null
							}

							{this.props.trackerCards.filter(card=>!card.favorite_status).sort(card=>card.card_id).map((card, card_id) => {
								return (
								<Card key={card_id} style={{backgroundColor: card.color}}>
									<CardHeader>
										<TouchableOpacity 
											onPress={() => { 
				                              this.props.navigation.push("Tracker", {
				                                kounter: card
				                              });
				                            }}
											>
										{this.state.fontLoaded ? (
											<CardTitle style={{fontFamily: 'avenir-medium'}}>
												{card.title}
											</CardTitle>
											) : null
										}

										{this.state.fontLoaded ? (
											<CardDescription style={{fontFamily: 'avenir-medium'}}>
												Description
											</CardDescription>
											) : null
										}
										</TouchableOpacity>
									</CardHeader>
									<CardControlsContainer>
										<CardButtonContainer onPress={() => this.props.subtractDrink(card.card_id)}>
											<CardMinusButton source={require('../../assets/minus_button.png')} />
										</CardButtonContainer>
										{this.state.fontLoaded ? (
											<CardDrinkCount style={{fontFamily: 'avenir-medium'}}>
												{card.currentCount}
											</CardDrinkCount>
											) : null
										}
										<CardButtonContainer onPress={() => this.props.addDrink(card.card_id)}>
											<CardPlusButton source={require('../../assets/plus_button.png')} />
										</CardButtonContainer>
									</CardControlsContainer>
								</Card>
								)
							})}
							<View style={{paddingBottom: '35%'}}></View>
						</CardContainer>

					</ScrollView>
					<LinearGradient colors={['rgba(0,0,0,0.9)', 'transparent']} start={[0, 1.0]} end={[0.0, 0.3]} style={{display: showAddButton, justifyContent: 'center', alignItems: 'center', bottom: '16%', height: '15%'}}>
						<NewCardButton onPress={() => { this.openDialog(true)} } >
							<NewCardButtonImage source={require(plus_button_image)} />
						</NewCardButton>
					</LinearGradient>
				</SafeAreaView>

				<AnimatedContainer 
		          		style={{ 
			            	transform: [{ translateY: this.state.menuTop }], 
			            }}>
			            <GestureRecognizer style={{height: '100%', width: '100%', backgroundColor: '#0D0F19'}} onSwipeDown={this.props.closeSettings} config={config}>
				            <SettingsHeader>
				            	<SettingsMenuSettingsImage source={require('../../assets/settings.png')} />
				            	{this.state.fontLoaded ? (
				            		<SettingsMenuText style={{fontFamily: 'avenir-medium'}}> Settings </SettingsMenuText>
				            		) : null
				            	}
				            </SettingsHeader>

				            <SettingsMenuList>
				            	<SettingsMenuItem>
				            		<MenuItemName>
				            			iCloud Sync
				            		</MenuItemName>
				            		<MenuItemToggle>
				            			<MenuItemToggleButton source={require('../../assets/toggle.png')} />
				            		</MenuItemToggle>
				            	</SettingsMenuItem>
				            </SettingsMenuList>

				            <SettingsDangerButton onPress={this.props.deleteAll}>
				            	{this.state.fontLoaded ? (
				            		<SettingsDangerButtonText style={{fontFamily: 'avenir-medium'}}>Erase All Data</SettingsDangerButtonText>
				            		) : null
				            	}
				            </SettingsDangerButton>
	            		</GestureRecognizer>
	            	</AnimatedContainer>


	            	{!kountersExist && !favoritesExist ? (
            			<EmptyKountersContainer style={{height: hp(90)}}>
            				<EmptyKountersAddButton 
								// onPress={() => {if (Platform.OS == 'ios') {
								// 					AlertIOS.prompt('Add New Kounter', 
								// 					   'Please name your Kounter.', 
								// 					   [
								// 						   {
								// 						   	text: 'Cancel',
								// 						   	style: 'cancel',
								// 						   },
								// 						   {
								// 						   	text: 'OK',
								// 						   	onPress: (name) => this.props.addNewTracker(this.props.numberOfCards, name, getRandomColor((this.props.trackerCards.length > 0) ? this.props.trackerCards[this.props.trackerCards.length - 1].color : null)),
								// 						   },
								// 					   ],
								// 					   'plain-text',
								// 					)
								// 				} else { this.openDialog(true) }
								// 			}
									onPress={() => { this.openDialog(true)} }

										>
								<EmptyKountersAddButtonImage source={require(plus_button_image)} />
							</EmptyKountersAddButton>

            				{this.state.fontLoaded ? (
            					<EmptyAddKounterText style={{fontFamily: 'avenir-heavy'}}> ADD KOUNTER </EmptyAddKounterText>
            					) : null
            				}
            				<RocketShipContainer>
            					<RocketShip source={require('../../assets/rocket_ship.png')} />
            				</RocketShipContainer>
            			</EmptyKountersContainer>
            			) : null
            		}

			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);

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
	
const Dialog = styled.View`
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
	font-size: 12px;
	text-align: center;
	position: absolute;
	top: 35%;
	width: 100%;
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


const Container = styled.View`
	flex: 1;
	background-color: #0d0f19;
	width: 100%;
	height: 100%;
`;

const Header = styled.View`
	border-style: solid;
	border-bottom-width: 1;
	border-color: #292929;
`;

const HeaderTitle = styled.Text`
	color: #ffffff;
	text-align: center;
	font-size: 18;
	margin-bottom: 19;
	letter-spacing: 5;
	height: 20;
`;

const SettingsButton = styled.TouchableOpacity`
	position: absolute;
	right: 20;
`;

const CardContainer = styled.View`
	padding: 0px 5px;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	margin: 18px 1% 10px 1%;
`;

const FavoritesContainer = styled.View`
	flex-direction: row;
	padding: 0;
	margin: 0;
	left: 0;
	align-items: center;
`;

const FavoritesText = styled.Text`
	color: white;
	font-size: 18px;
	left: 10;
	padding-right: 15px;
`;

const FavoritesIcon = styled.Image`
	margin-top: -1px;
`;

const Card = styled.View`
	height: 72;
	width: 94.66%;
	background-color: #EF5350;
	border-radius: 8;
	margin: 7.5px;
	position: relative;
	flex: 1;
	flex-direction: row;
`;

const CardHeader = styled.View`
	justify-content:  flex-start;
	width: 50%;
`;

const CardTitle = styled.Text`
	padding-top: 13;
	padding-left: 20;
	color: white;
	font-size: 18;
	font-weight: 800;
	text-align: left;
`;

const CardDescription = styled.Text`
	font-size: 12;
	color: #ffffff;
	padding-left: 20;
	padding-top: 1;
	text-transform: uppercase;
`;

const KountersText = styled.Text`
	color: white;
	font-size: 18;
	left: 10;
	padding-top: 20;
`;

const EmptyKountersContainer = styled.View`
	flex: 1;
	align-items: center;
	width: 100%;
	position: absolute;
	bottom:0;
`;

const EmptyAddKounterText = styled.Text`
	color: #ffffff;
	font-size: 24;
	text-align: center;
	margin-top: 22;
`;

const EmptyKountersAddButtonImage = styled.Image`
	height: 48;
	width: 48;
`;

const EmptyKountersAddButton = styled.TouchableOpacity`
	height: 48;
	margin-top: 50%;
	width: 48;
`;

const RocketShipContainer = styled.View`
	margin-top: auto;
	justify-content: center;
	align-items: center;
	text-align: center;
	position: absolute;
	bottom: 0;
	z-index: 100;
`;

const RocketShip = styled.Image`
	height: 257;
	width: 300;
	margin-top: auto;
	margin-left: 0;
`;

const CardControlsContainer = styled.View`
	flex: 1;
	justify-content: center;
	width: 50%;
	align-items: center;
	flex-direction: row;
`;

const CardButtonContainer = styled.TouchableOpacity`
	height: 36;
	width: 36;
	justify-content: center;
	align-items: center;
`;

const CardMinusButton = styled.Image`
	height: 4;
	width: 14.4;
`;


const CardPlusButton = styled.Image`
	height: 14.4;
	width: 14.4;
`;

const CardDrinkCount = styled.Text`
	font-size: 36;
	width: 70;
	color: #ffffff;
	textAlign: center;
`;

const NewCardButton = styled.TouchableOpacity`
	height: 48;
	width: 48;
	margin-top: 5%;
	margin-bottom: 10%;
`;

const NewCardButtonImage = styled.Image`
	position: absolute;
	height: 48;
	width: 48;
	resize-mode: center;
`;

const SettingsContainer = styled.View`
	height: 207;
	background-color: #0D0F19;
	width: 100%;
	position: absolute;
	z-index: 1000;
	bottom: 0;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(SettingsContainer);

const SettingsHeader = styled.View`
	padding-top: 21;
	padding-left: 16;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

const SettingsMenuSettingsImage = styled.Image`
	height: 20;
	width: 20;
`;

const SettingsMenuText = styled.Text`
	font-size: 18px;
	padding-left: 11px;
	color: #ffffff;
`;

const SettingsMenuList = styled.View`
	height: auto;
	width: 100%;
	margin-top: 22px;
`;

const SettingsMenuItem = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 43.5px;
	padding-left: 16;
	padding-right: 16;
	border-top-width: 0.2px;
	border-top-color: #292929;
	border-bottom-width: 0.2px;
	border-bottom-color: #292929;
`;

const MenuItemName = styled.Text`
	color: #ffffff;
	font-size: 17px;
	letter-spacing: -0.41px;
`;

const MenuItemToggle = styled.View`
	height: 32px;
	width: 52px;
`;

const MenuItemToggleButton = styled.Image`
	
`;

const SettingsDangerButton = styled.TouchableOpacity`
	background-color: #DC2727;
	justify-content: center;
	margin:0 auto;
	width: 220px;
	margin-top: 20;
	height: 40;
	border-radius: 10px;
`;

const SettingsDangerButtonText = styled.Text`
	color: #ffffff;
	text-align: center;
	font-size: 16;
`;

const styles = StyleSheet.create({
	dialog: {
		color: "#04bf72"
	},
});

