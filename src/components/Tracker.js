import React, { Component } from 'react';
import {AlertIOS, Alert, StyleSheet, Text, View, TouchableOpacity, Platform, Image} from 'react-native';
import { Font } from 'expo';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import DialogInput from 'react-native-dialog-input';
import { MaterialDialog } from 'react-native-material-dialog';

function mapStateToProps(state) {
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
    }
  }
}

var plus_button_image = '../../assets/plus_button.png';
var minus_button_image = '../../assets/minus_button.png';


class Tracker extends React.Component {
	
	state = {
    	fontLoaded: false,
    	dialogOpen: false,
  	};

	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-bold': require('../../assets/fonts/Anodina-Bold.otf'),
		  'anodina-regular': require('../../assets/fonts/Anodina-Regular.otf'),
		});

	 	this.setState({ fontLoaded: true });
	}

	static navigationOptions = {
	    header: null
  	};

  	openDialog(status) {
		this.setState({ dialogOpen: status})
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
			<View style={[styles.container, {backgroundColor: kounter.color}]}>
				<View style={styles.navigationContainer}>
					<TouchableOpacity 
						onPress={() => this.props.navigation.push('List')}
					>
						<Image source={require('../../assets/back_arrow.png')} style={styles.navigationItems} />
					</TouchableOpacity>
					<TouchableOpacity onPress={() => {
										if(Platform.OS == 'ios') { 
											AlertIOS.alert(
										    'Delete Kounter', 
										    'Are you sure you want to delete this Kounter?', 
								    		[
								   		   		{
										   			text: 'Cancel',
												   	style: 'cancel',
											   	},
											   	{
												   	text: 'Delete',
												   	onPress: (name) => this.props.removeTracker(card_id, this.props.navigation),
												   	style: 'destructive'
											   	},
										   	],
											) 
										} else { this.openDialog(true) } } }>
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
						<Text style={[styles.itemName, {fontFamily: 'anodina-bold'} ]}>
							{kounter.title}
						</Text>
						) : null
					}

					{this.state.fontLoaded ? (
						<Text style={[styles.currentCount, {fontFamily: 'anodina-bold'}]}>
							{kounter.currentCount}
						</Text>
						):null
					}
				</View>
				<View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.RoundButton} onPress={() => this.props.subtractDrink(kounter.card_id)}>
							<Image style={[styles.buttonImage, {height: 48}]} source={require(minus_button_image)} />
						</TouchableOpacity>
						<TouchableOpacity style={styles.RoundButton} onPress={() => this.props.addDrink(kounter.card_id)}>
							<Image style={[styles.buttonImage, {height: 48}]} source={require(plus_button_image)} />
						</TouchableOpacity>
			      	</View>
		      	</View>


		      	<View style={styles.resetButton}>
		      		<TouchableOpacity onPress={() => this.props.resetCount(kounter.card_id)}>
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
