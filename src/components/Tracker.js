import React, { Component } from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity, Platform, Image} from 'react-native';
import { Font } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Navigation from './Navigation';


function mapStateToProps(state) {
  return { action: state.action,
  		   trackerCards: state.trackerCards,
  		 }
}

function mapDispatchToProps(dispatch) {
  console.log(this.props+'hello');
  return {

    addDrink(card_id) {
    	dispatch({
      		type: "ADD_DRINK",
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
  	};

	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-bold': require('../../assets/fonts/Anodina-Bold.otf'),
		  'anodina-regular': require('../../assets/fonts/Anodina-Regular.otf'),
		});


		// console.log(this.props.trackerCards);

	 	this.setState({ fontLoaded: true });
	}

	componentDidUpdate() {
    	// console.log(this.props.action);
		console.log(this.props.trackerCards);
  	}

	static navigationOptions = {
	    header: null
  	};

	render() {
		const { navigation } = this.props;
		const card_id = 'card_'+navigation.getParam("id");
		const kounter = navigation.getParam("kounter");

		// console.log(card_id);
		const currentTracker = this.props.trackerCards[card_id];

		console.log(currentTracker.currentCount + 'test');

		return (
			<View style={[styles.container, {backgroundColor: kounter.color}]}>
				<View style={styles.navigationContainer}>
					<TouchableOpacity 
						onPress={() => this.props.navigation.push('List')}
					>
						<Image source={require('../../assets/back_arrow.png')} style={styles.navigationItems} />
					</TouchableOpacity>
					<TouchableOpacity>
						<Image source={require('../../assets/trash_button.png')} style={styles.navigationItems} />
					</TouchableOpacity>
				</View>


				<View style={styles.trackerContainer}>
					{this.state.fontLoaded ? (
						<Text style={[styles.itemName, {fontFamily: 'anodina-bold'} ]}>
							{kounter.title}
						</Text>
						) : null
					}

					{this.state.fontLoaded ? (
						<Text style={[styles.currentCount, {fontFamily: 'anodina-bold'}]}>
							{currentTracker.currentCount}
						</Text>
						):null
					}
					
					<View style={styles.buttonContainer}>
			            <TouchableOpacity style={styles.RoundButton} onPress={() => this.props.addDrink(card_id)}>
							<Image style={[styles.buttonImage, {height: 48}]} source={require(plus_button_image)} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.RoundButton}>
							<Image style={[styles.buttonImage, {height: 48}]} source={require(minus_button_image)} />
						</TouchableOpacity>
			      	</View>
		      	</View>


		      	<View style={styles.resetButton}>
		      		<TouchableOpacity onPress={this.resetCount}>
		      			<Text style={styles.resetButtonText}>
		      				Reset
		      			</Text>
		      		</TouchableOpacity>
		      	</View>
			</View>
		);
	}
}


const styles = StyleSheet.create({

	RoundButton: {
		height: 48,
		width: 48,
		borderColor: '#fff',
	    alignItems: 'center',
	},
	buttonImage: {
		position: 'absolute',
		width: 48,
		resizeMode: 'center'
	},
	navigationContainer: {
		marginTop: '15%',
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
    	marginTop: hp('20%'),
	},
	itemName: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		marginTop: 10,
		textAlign: 'center',
	},
	currentCount: {
		fontSize: 250,
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
  	resetButton: {
  		marginTop: 'auto',
  		marginBottom: 50,
  		textAlign: 'center'
  	},
  	resetButtonText: {
  		color: '#fff',
  		textAlign: 'center',
  		fontSize: 18
  	}
});


export default connect(mapStateToProps, mapDispatchToProps)(Tracker);
