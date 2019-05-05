import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
import { TouchableWithoutFeedback, Keyboard, Animated, Easing, StatusBar, Alert, Platform, AlertIOS, ScrollView, TouchableOpacity, View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { connect } from 'react-redux';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-navigation';
import styled from "styled-components";
import { Ionicons } from '@expo/vector-icons';
import { Dialog as DialogComponent } from './Dialog';
import { Modal as ModalComponent } from './Modal';

function mapStateToProps(state) {
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
	      			description: null,
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
		  	modalOpen: false
    	}
	}

	state = {
    	fontLoaded: false,
    	dialogOpen: false,
  	};

	triggerError(status) {
		console.log('1'+status);
		this.setState({dialogError: status})
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
		this.setState({ dialogOpen: status, dialogError: false});
	}

	openSettings(status = true) {
		this.setState({ modalOpen: status });
		this.showOverlay(status);
	}

	showOverlay(status = false) {
		(status) ? overlayWidth = '100%' : overlayWidth = '0%';
		this.setState({ showOverlay: overlayWidth })
	}

	static navigationOptions = {
	    header: null
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

	    newKounterTitle = '';
	    
		return (
			<Container>
				<DialogComponent 
					dialogErrorStatus={this.state.dialogError} 
					open={this.state.dialogOpen} 
					openDialogMethod={this.openDialog.bind(this)}
					addNewTracker={this.props.addNewTracker.bind(this)}
					numberOfCards={this.props.numberOfCards}
					getRandomColor={getRandomColor.bind(this)}
					trackerCards={this.props.trackerCards}
					triggerError={this.triggerError.bind(this)} 
				/>

				<SafeAreaView forceInset={{ bottom: 'never'}}> 
						<Header style={{marginTop: headerMargin}}>
							{this.state.fontLoaded ? (
								<HeaderTitle style={{fontFamily: 'anodina-xbold'}}>KOUNTER</HeaderTitle>
								) : null
							}
							<SettingsButton 
								onPress={() => this.openSettings(true)}
							>
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
										<TouchableOpacity style={{justifyContent: 'center', flex: 1}} 
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

										{this.state.fontLoaded && card.description ? (
											<CardDescription style={{fontFamily: 'avenir-medium'}}>
												{card.description}
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
								<KountersText style={{fontFamily: 'avenir-heavy'}, {display: showKounters}}>
									KOUNTERS
								</KountersText>
								) : null
							}

							{this.props.trackerCards.filter(card=>!card.favorite_status).sort(card=>card.card_id).map((card, card_id) => {
								return (
								<Card key={card_id} style={{backgroundColor: card.color}}>
									<CardHeader>
										<TouchableOpacity style={{justifyContent: 'center', flex: 1}} 
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

										{this.state.fontLoaded && card.description ? (
											<CardDescription style={{fontFamily: 'avenir-medium'}}>
												{card.description}
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

				<TouchableWithoutFeedback onPress={() => this.openSettings(false)}>
					<Overlay style={{width: this.state.showOverlay}}>
					</Overlay>
				</TouchableWithoutFeedback>

				<ModalComponent 
					toggleStatus={this.state.modalOpen}
					openModalMethod={this.openSettings.bind(this)}
					fontLoaded={this.state.fontLoaded}
					buttonContent="Erase All Data"
					buttonMethod={this.props.deleteAll}
				/>

	            	{!kountersExist && !favoritesExist ? (
            			<EmptyKountersContainer style={{height: hp(90)}}>
            				<EmptyKountersAddButton 
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



const Overlay = styled.View`
	height: 100%;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	z-index: 999;
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
	border-radius: 10;
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
	height: 70;
	width: 56;
	justify-content: center;
	align-items: center;
`;

const CardMinusButton = styled.Image`
	height: 4;
	width: 14.4;
	margin-left: 20;
`;

const CardPlusButton = styled.Image`
	height: 14.4;
	width: 14.4;
	margin-right: 20;
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


const styles = StyleSheet.create({
	dialog: {
		color: "#04bf72"
	},
});

