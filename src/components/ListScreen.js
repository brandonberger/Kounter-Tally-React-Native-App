import React, { Component, Alert } from 'react';
import { Font } from 'expo';
import { ScrollView, SafeAreaView, TouchableOpacity, View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class ListScreen extends Component {

	card1 = {
		title: 'Kratom',
		count: '1',
		color: '#EF5350'
	}


	async setCard() {
		const set =	await AsyncStorage.setItem('@storage_Key', 'stored value')
		return set;
	}

	async getCard(card_id) {
		const card = await AsyncStorage.getItem('@storage_Key')
		return card;
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

	 	console.log(this.card1);

	 	await this.setCard();
	 	// console.log(AsyncStorage.getAllKeys());
		// console.log('Hello'+JSON.stringify(this.getCard('cardTest')));
	}

	static navigationOptions = {
	    header: null
  	};

	render() {
		return (
			<View style={styles.container}>
				<SafeAreaView>
	            	<ScrollView style={{ height: "100%" }}>
						{this.state.fontLoaded ? (
							<Text style={[styles.title, {fontFamily: 'anodina-regular'}]}>KOUNTER</Text>
							) : null
						}
						<View style={styles.cardContainer}>
							{cards.map((card, index) => (
								<TouchableOpacity 
									key={index} 
									onPress={() => { 
		                              // this.props.navigation.push("Tracker", {
		                              //   kounter: card
		                              // });
									console.log(JSON.stringify(this.getCard('cardTest')));

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
												{card.count}
											</Text>
											) : null
										}
									</View>
								</TouchableOpacity>
							))}
						</View>
					</ScrollView>
				</SafeAreaView>
			</View>
		);
	}
}

export default ListScreen;


const styles = StyleSheet.create({
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


const cards = [
	{
		title: 'Kratom',
		'count': '1',
		'color': '#EF5350'
	},
	{
		title: 'Kava',
		'count': '2',
		'color': '#42A5F5'
	},
	{
		title: 'Kratom',
		'count': '3',
		'color': '#78909C'
	},
	{
		title: 'Kava',
		'count': '4',
		'color': '#43A047'
	},
	{
		title: 'Kava',
		'count': '5',
		'color': '#7E57C2'
	},
	{
		title: 'Water',
		'count': '6',
		'color': '#E65100'
	},
	{
		title: 'Kratom',
		'count': '7',
		'color': '#0097A7'
	},
	{
		title: 'Kratom',
		'count': '8',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '9',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '10',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '11',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '12',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '13',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '14',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '15',
		'color': '#5C6BC0'
	},
	{
		title: 'Kratom',
		'count': '16',
		'color': '#5C6BC0'
	},
];