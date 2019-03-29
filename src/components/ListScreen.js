import React, { Component, Alert } from 'react';
import { Font, LinearGradient } from 'expo';
import { AlertIOS, ScrollView, SafeAreaView, TouchableOpacity, View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { connect } from 'react-redux';

function mapStateToProps(state) {
	console.log(state.trackerCards);
	return { 
		   	 trackerCards: state.trackerCards,
		   	 numberOfCards: state.trackerCards.length
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
	    }
	}
}

function getRandomColor() {
	colors = [
		'#EF5350',
		'#42A5F5',
		'#78909C',
		'#43A047',
		'#7E57C2',
		'#E65100',
		'#0097A7',
		'#5C6BC0',
		'#5C6BC0',
	];

	return colors[Math.floor(Math.random()*colors.length)];
}


var plus_button_image = '../../assets/plus_button.png';

class ListScreen extends Component {

	constructor(props) {
	  super(props);
	  this.state = { isLoading: true }
	}

	state = {
    	fontLoaded: false,
  	};

	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-bold': require('../../assets/fonts/Anodina-Bold.otf'),
		  'anodina-regular': require('../../assets/fonts/Anodina-Regular.otf'),
		});

		await this.setState({ fontLoaded: true });
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
						{this.state.fontLoaded ? (
							<Text style={[styles.title, {fontFamily: 'anodina-regular'}]}>KOUNTER</Text>
							) : null
						}
						<View style={styles.cardContainer}>
							{this.props.trackerCards.map((card, card_id) => {
								return (<TouchableOpacity 
									key={card_id} 
									onPress={() => { 
		                              this.props.navigation.push("Tracker", {
		                                kounter: card
		                              });
		                            }}
									>
									<View style={[styles.card, {backgroundColor: card.color}]}>
										{this.state.fontLoaded ? (
											<Text style={[styles.cardTitle, {fontFamily: 'anodina-bold'}]}>
												{card.title}
											</Text>
											) : null
										}

										{this.state.fontLoaded ? (
											<Text style={[styles.cardDrinkCount, {fontFamily: 'anodina-regular'}]}>
												{card.currentCount}
											</Text>
											) : null
										}
									</View>
								</TouchableOpacity>
								)
							})}
						</View>
					</ScrollView>
					<LinearGradient colors={['rgba(0,0,0,0.9)', 'transparent']} start={[0, 1.0]} end={[0.0, 0.3]} style={styles.newCardButton}>
						<TouchableOpacity 
							style={styles.RoundButton} 
							onPress={() => AlertIOS.prompt('Add New Kounter', 
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
														)}> 
							<Image style={[styles.buttonImage, {height: 48}]} source={require(plus_button_image)} />
						</TouchableOpacity>
					</LinearGradient>
				</SafeAreaView>
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);



const styles = StyleSheet.create({
	newCardButton: {
		justifyContent: 'center',
		alignItems: 'center',
		bottom: '10%',
	},
	RoundButton: {
		height: 48,
		width: 48,
		marginTop: '5%',
		marginBottom: '10%'
	},
	buttonImage: {
		position: 'absolute',
		width: 48,
		resizeMode: 'center',
	},
	container: {
		flex: 1,
		backgroundColor: '#0d0f19',
		width:'100%',
		height:'100%'
	},
	title: {
		color: 'white',
		textAlign: 'center',
		fontSize: 20,
		marginTop: 30,
		marginBottom: 30,
		letterSpacing: 3
	},
	cardContainer: {
		padding: (0, 5),
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'center'
	},
	card: {
		height: 160,
		width: 165,
		backgroundColor: '#EF5350',
		borderRadius: 20,
		margin: 7.5
	},
	cardTitle: {
		paddingTop: 30,
		color: 'white',
		fontSize: 18,
		fontWeight: '800',
		textAlign: 'center',
		letterSpacing: -0.5
	},
	cardDrinkCount: {
		fontSize: 64,
		color: 'white',
		textAlign: 'center'
	}
});

