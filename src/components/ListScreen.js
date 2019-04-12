import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
import { Alert, Platform, AlertIOS, ScrollView, SafeAreaView, TouchableOpacity, View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { connect } from 'react-redux';
import DialogInput from 'react-native-dialog-input';


function mapStateToProps(state) {
	return { 
		   	 trackerCards: state.trackerCards,
		   	 numberOfCards: state.trackerCards.length,
		   	 totalCardsEver: state.totalCardHistory
 	  	   }	
}

function mapDispatchToProps(dispatch) {
  	return {
	    addNewTracker(newCardNumber, name, color) {
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
	}
}

function getRandomColor() {
	colors = [
		'#173DD2',
		'#DC2727',
		'#009F36',
		'#4D0BB9',
		'#1783D2',
		'#D21771',
		'#009F82',
		'#6F1DF3',
	];

	return colors[Math.floor(Math.random()*colors.length)];
}


var plus_button_image = '../../assets/plus_button.png';

class ListScreen extends Component {

	constructor(props) {
	  super(props);
	  this.state = { isLoading: true, dialogOpen: false }
	}

	state = {
    	fontLoaded: false,
    	dialogOpen: false,
  	};

	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-bold': require('../../assets/fonts/Anodina-Bold.otf'),
		  'anodina-xbold': require('../../assets/fonts/Anodina-ExtraBold.otf'),
		  'anodina-regular': require('../../assets/fonts/Anodina-Regular.otf'),
		  'avenir-book': require('../../assets/fonts/Avenir-Book.ttf'),
		  'avenir-light': require('../../assets/fonts/Avenir-Light.ttf'),
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

	render() {
		const newCardName = 'card_'+this.props.currentTrackerCount;


		return (
			<View style={styles.container}>
				<SafeAreaView>
	            	<ScrollView style={{ height: "100%" }}>
						<View style={styles.header}>
							{this.state.fontLoaded ? (
								<Text style={[styles.title, {fontFamily: 'anodina-xbold'}]}>KOUNTER</Text>
								) : null
							}
							<TouchableOpacity style={styles.settingsButton}>
								<Image source={require('../../assets/settings.png')} />
							</TouchableOpacity>
						</View>


						<View style={styles.cardContainer}>
							{this.state.fontLoaded ? (
								<Text style={[styles.favoritesText, {fontFamily: 'avenir-heavy'}]}>
									Favorites <Image source={require('../../assets/favorites.png')} />
								</Text>
								) : null
							}

							{this.props.trackerCards.filter(card=>card.favorite_status).map((card, card_id) => {
								return (
								<View key={card_id} style={[styles.card, {backgroundColor: card.color}]}>
									<View style={styles.cardTalk}>
										<TouchableOpacity 
											onPress={() => { 
				                              this.props.navigation.push("Tracker", {
				                                kounter: card
				                              });
				                            }}
											>
										{this.state.fontLoaded ? (
											<Text style={[styles.cardTitle, {fontFamily: 'avenir-medium'}]}>
												{card.title}
											</Text>
											) : null
										}

										{this.state.fontLoaded ? (
											<Text style={[styles.cardDescription, {fontFamily: 'avenir-medium'}]}>
												Description
											</Text>
											) : null
										}
										</TouchableOpacity>
									</View>
									<View style={styles.cardControls}>
										<TouchableOpacity onPress={() => this.props.subtractDrink(card.card_id)}>
											<Image style={styles.cardMinusButton} source={require('../../assets/minus_button.png')} />
										</TouchableOpacity>
										{this.state.fontLoaded ? (
											<Text style={[styles.cardDrinkCount, {fontFamily: 'avenir-medium'}]}>
												{card.currentCount}
											</Text>
											) : null
										}
										<TouchableOpacity onPress={() => this.props.addDrink(card.card_id)}>
											<Image style={styles.cardPlusButton} source={require('../../assets/plus_button.png')} />
										</TouchableOpacity>
									</View>
								</View>
								)
							})}

							{this.state.fontLoaded ? (
								<Text style={[styles.allKountersText, {fontFamily: 'avenir-heavy'}]}>
									ALL KOUNTERS
								</Text>
								) : null
							}

							{this.props.trackerCards.filter(card=>!card.favorite_status).map((card, card_id) => {
								return (
								<View key={card_id} style={[styles.card, {backgroundColor: card.color}]}>
									<View style={styles.cardTalk}>
										<TouchableOpacity 
											onPress={() => { 
				                              this.props.navigation.push("Tracker", {
				                                kounter: card
				                              });
				                            }}
											>
										{this.state.fontLoaded ? (
											<Text style={[styles.cardTitle, {fontFamily: 'avenir-medium'}]}>
												{card.title}
											</Text>
											) : null
										}

										{this.state.fontLoaded ? (
											<Text style={[styles.cardDescription, {fontFamily: 'avenir-medium'}]}>
												Description
											</Text>
											) : null
										}
										</TouchableOpacity>
									</View>
									<View style={styles.cardControls}>
										<TouchableOpacity onPress={() => this.props.subtractDrink(card.card_id)}>
											<Image style={styles.cardMinusButton} source={require('../../assets/minus_button.png')} />
										</TouchableOpacity>
										{this.state.fontLoaded ? (
											<Text style={[styles.cardDrinkCount, {fontFamily: 'avenir-medium'}]}>
												{card.currentCount}
											</Text>
											) : null
										}
										<TouchableOpacity onPress={() => this.props.addDrink(card.card_id)}>
											<Image style={styles.cardPlusButton} source={require('../../assets/plus_button.png')} />
										</TouchableOpacity>
									</View>
								</View>
								)
							})}
						</View>
					</ScrollView>
					<LinearGradient colors={['rgba(0,0,0,0.9)', 'transparent']} start={[0, 1.0]} end={[0.0, 0.3]} style={styles.newCardButtonContainer}>
						<TouchableOpacity 
							style={styles.newCardButton} 
							onPress={() => {if (Platform.OS == 'ios') {
												AlertIOS.prompt('Add New Kounter', 
												   'Please name your Kounter.', 
												   [
													   {
													   	text: 'Cancel',
													   	style: 'cancel',
													   },
													   {
													   	text: 'OK',
													   	onPress: (name) => this.props.addNewTracker(this.props.numberOfCards, name, getRandomColor()),
													   },
												   ],
												   'plain-text',
												)
											} else { this.openDialog(true) }
										}
									}>
							<Image style={[styles.newCardButtonImage, {height: 48}]} source={require(plus_button_image)} />
						</TouchableOpacity>
					</LinearGradient>

					 
				</SafeAreaView>
				<DialogInput style={styles.dialog} isDialogVisible={this.state.dialogOpen}
					             title={"Add New Kounter"}
					             message={"Please name your Kounter"}
					             hintInput ={"Enter Name"}
					             submitInput={ (inputText) => {this.props.addNewTracker(this.props.numberOfCards, inputText, getRandomColor()), this.openDialog(false)} }
					             closeDialog={ () => {this.openDialog(false)}}>
					</DialogInput>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);



const styles = StyleSheet.create({
	dialog: {
		color: "#04bf72"
	},
	container: {
		flex: 1,
		backgroundColor: '#0d0f19',
		width:'100%',
		height:'100%'
	},
	header: {
		borderStyle: 'solid',
		borderBottomWidth: 1,
		borderColor: '#292929',
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: 18,
		marginTop: 7,
		marginBottom: 19,
		letterSpacing: 5,
	},
	settingsButton: {
		position: 'absolute',
		right: 20,
		top: 10
	},
	cardContainer: {
		padding: (0, 5),
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: '1%',
		marginRight: '1%',
		marginTop: 18,
		marginBottom: 10
	},
	favoritesText: {
		color: 'white',
		fontSize: 18,
		left: 10,
		textTransform: 'uppercase'
	},
	allKountersText: {
		color: 'white',
		fontSize: 18,
		left: 10,
		textTransform: 'uppercase',
		paddingTop: 20,
	},
	card: {
		height: 72,
		width: '94.66%',
		backgroundColor: '#EF5350',
		borderRadius: 8,
		margin: 7.5,
		position: 'relative',
		flex: 1,
		flexDirection: 'row'
	},
	cardTalk: {
		justifyContent: 'flex-start',
		width: '55%'
	},
	cardTitle: {
		paddingTop: 13,
		paddingLeft: 20,
		color: 'white',
		fontSize: 18,
		fontWeight: '800',
		textAlign: 'left',
	},
	cardDescription: {
		fontSize: 12,
		color: 'white',
		paddingLeft: 20,
		paddingTop: 1,
		textTransform: 'uppercase'
	},
	cardControls: {
		flex: 1,
		justifyContent: 'center',
		width: '45%',
		alignItems: 'center',
		flexDirection: 'row'
	},
	cardMinusButton: {
		height: 4,
		width: 14.4,
		marginRight: 28
	},
	cardPlusButton: {
		height: 14.4,
		width: 14.4,
		marginLeft: 28
	},
	cardDrinkCount: {
		fontSize: 36,
		color: 'white',
		textAlign: 'center'
	},
	newCardButtonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		bottom: '10%',
	},
	newCardButton: {
		height: 48,
		width: 48,
		marginTop: '5%',
		marginBottom: '10%'
	},
	newCardButtonImage: {
		position: 'absolute',
		width: 48,
		resizeMode: 'center',
	},
});

