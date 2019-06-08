import React from 'react';
import {connect} from 'react-redux';
import { StatusBar, FlatList, ScrollView, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import {addNewKounter, clearAll, addCount, subtractCount, updateKounters} from './KounterFunctions';
import Card from './Card';
import styled from "styled-components";
import {SafeAreaView} from 'react-navigation';

import {LinearGradient} from 'expo';

import ScreenHeader from './ScreenHeader';
import ListHeader from './ListHeader';
import {Dialog as DialogComponent} from './Dialog';

function mapStateToProps(state) {
	console.log(state);
	return {
		action: state.action,
		hasUpdated: state.hasUpdated,
		kounters: state.kounters,
		number_of_kounters: state.kounters.length,
		nextSort: state.nextSort,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		updateKounters: kounters =>
	    	dispatch({
	      		type: "SET_KOUNTERS",
	      		kounters
			}),
		getKounters: kounters => 
			dispatch({
				type: "GET_KOUNTERS",
				kounters
			}),
    	reset: () => 
    		dispatch({
    			type: "RESET_EVERYTHING"
			}),
		sortKounters: (list, sortMethod, nextSortMethod) =>
			dispatch({
				type: "SORT",
				list: list,
				sortMethod: sortMethod,
				nextSortMethod: nextSortMethod
			}),
		addCount: id => 
			dispatch({
				type: "ADD_KOUNTER",
				id: id
			}),
		subtractCount: id =>
			dispatch({
				type: "SUBTRACT_KOUNTER",
				id: id
			})
    }
}	

favoritesExist = false;
kountersExist = false;

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

class TestScreen extends React.Component {

	static navigationOptions = {
	    header: null
  	};

	constructor(props) {
		super(props);
		this.state = { 
			isLoading: true, 
			dialogOpen: false,
			modalOpen: false,
			currentFilters: {
				favoritesFilter: "SORT_BY_ID",
				kountersFilter: "SORT_BY_ID"
			},
			nextSort: {
				favorites: "SORT_BY_A_Z",
				kounters: "SORT_BY_A_Z",
			}
		}
	}

	componentDidUpdate() {
		// console.log(this.props.kounters);
		// this.resetEverything();
		// console.log(this.props.action);

		switch (this.props.action) {
			case 'ADD':
				updateKounters(this.props.kounters);
				break;
			case 'SUBTRACT':
				updateKounters(this.props.kounters);
				break;
		}

		
		
	}

	componentDidMount() {
		StatusBar.setBarStyle("light-content", true);
		this.handleGetKounters();
	}

	openDialog(status) {
		this.setState({ dialogOpen: status, dialogError: false});
	}

	openSettings(status = true) {
		this.setState({ modalOpen: status });
		this.showOverlay(status);

		if (status == false) {
			this.props.toggleEraseAllConfirmButtons('none')
		}
	}

	showOverlay(status = false) {
		(status) ? overlayWidth = '100%' : overlayWidth = '0%';
		this.setState({ showOverlay: overlayWidth })
	}

	triggerError(status) {
		this.setState({dialogError: status})
	}

	
	sortKounters(list, sortMethod) {
		switch (list) {
			case 'FAVORITES':
				switch (sortMethod) {
					case 'SORT_BY_ID':
						this.props.sortKounters(list, sortMethod, "SORT_BY_A_Z");
						this.setState({ nextSort: { favorites: 'SORT_BY_A_Z', kounters: this.state.nextSort.kounters }});
						this.setState({ currentFilters: { favoritesFilter: 'SORT_BY_ID', kountersFilter: this.state.currentFilters.kountersFilter}});
						break;
					case 'SORT_BY_A_Z':
						this.props.sortKounters(list, sortMethod, "SORT_BY_Z_A");
						this.setState({ nextSort: { favorites: 'SORT_BY_Z_A', kounters: this.state.nextSort.kounters }});
						this.setState({ currentFilters: { favoritesFilter: 'SORT_BY_A_Z', kountersFilter: this.state.currentFilters.kountersFilter}});
						break;
					case 'SORT_BY_Z_A':
						this.props.sortKounters(list, sortMethod, "SORT_BY_ID");
						this.setState({ nextSort: { favorites: 'SORT_BY_ID', kounters: this.state.nextSort.kounters }});
						this.setState({ currentFilters: { favoritesFilter: 'SORT_BY_Z_A', kountersFilter: this.state.currentFilters.kountersFilter}});
						break;
				}
				break;
			case 'KOUNTERS':
				switch (sortMethod) {
					case 'SORT_BY_ID':
						this.props.sortKounters(list, sortMethod, "SORT_BY_A_Z");
						this.setState({ nextSort: { kounters: 'SORT_BY_A_Z', favorites: this.state.nextSort.favorites }});
						this.setState({ currentFilters: { kountersFilter: 'SORT_BY_ID', favoritesFilter: this.state.currentFilters.favoritesFilter}});
						break;
					case 'SORT_BY_A_Z':
						this.props.sortKounters(list, sortMethod, "SORT_BY_Z_A");
						this.setState({ nextSort: { kounters: 'SORT_BY_Z_A', favorites: this.state.nextSort.favorites }});
						this.setState({ currentFilters: { kountersFilter: 'SORT_BY_A_Z', favoritesFilter: this.state.currentFilters.favoritesFilter}});
						break;
					case 'SORT_BY_Z_A':
						this.props.sortKounters(list, sortMethod, "SORT_BY_ID");
						this.setState({ nextSort: { kounters: 'SORT_BY_ID', favorites: this.state.nextSort.favorites }});
						this.setState({ currentFilters: { kountersFilter: 'SORT_BY_Z_A', favoritesFilter: this.state.currentFilters.favoritesFilter}});
						break;
				}
				break;
		}
	}

	handleGetKounters = () => {
		AsyncStorage.getItem("kounters").then(serializedState => {
			const state = JSON.parse(serializedState);
			if (state) {
				this.props.getKounters(state);
			}
		});
	}

	handleAddNewKounter = (number, name, color) => {

		const newKounter = [{
			id: number + 1,
			name: name,
			description: null,
			color: color,
			amount: 0,
			favorite_status: false,
			active: 1
		}];

		addNewKounter(newKounter);

		AsyncStorage.getItem("kounters").then(serializedState => {
			const state = JSON.parse(serializedState);
			if (state) {
				this.props.updateKounters([...state, ...newKounter]);
			} else {
				this.props.updateKounters(newKounter);
			}
		});
	}


	handleUpdateKounter = (id, type) => {
		if (type == 'add') {
			this.props.addCount(id);
		} else if (type == 'subtract') {
			this.props.subtractCount(id);
		}
	}

	resetEverything = () => {
		clearAll();
		this.props.reset();
	}


	navigateToKounterScreen = kounter => {
		this.props.navigation.push("Tracker", {
			kounter: kounter
		});
	}


	render() {

		this.props.kounters.filter(card=>card.favorite_status).filter(card=>card.active).map((card, card_id) => {
			favoritesExist = true;
		});

		if (favoritesExist) {
			showFavorites = 'flex';
		} else {
			showFavorites = 'none';
		}

		this.props.kounters.filter(card=>!card.favorite_status).filter(card=>card.active).map((card, card_id) => {
			kountersExist = true;
		});

		if (kountersExist) {
			showKounters = 'flex';
		} else {
			showKounters = 'none';
		}

		if(!kountersExist || !favoritesExist) {
			showAddButton = 'flex';
		} else {
			showAddButton = 'none';
		}

		const filters = {
	    	favoriteFilters: {
	    		filterFavoritesById: this.props.kounters.filter(card=>card.favorite_status).filter(card=>card.active).sort((a,b) => a.id > b.id),
	    		filterFavoritesAZ: this.props.kounters.filter(card=>card.favorite_status).filter(card=>card.active).sort((a,b) => a.title > b.title),
	    		filterFavoritesZA: this.props.kounters.filter(card=>card.favorite_status).filter(card=>card.active).sort((a,b) => a.title < b.title),
	    	},
	    	kounterFilters: {
	    		filterKountersById: this.props.kounters.filter(card=>!card.favorite_status).filter(card=>card.active).sort((a,b) => a.id > b.id),
	    		filterKountersAZ: this.props.kounters.filter(card=>!card.favorite_status).filter(card=>card.active).sort((a,b) => a.title > b.title),
	    		filterKountersZA: this.props.kounters.filter(card=>!card.favorite_status).filter(card=>card.active).sort((a,b) => a.title < b.title),
	    	}
	    }

	   	switch (this.state.currentFilters.favoritesFilter) {
	   		case 'SORT_BY_ID':
	   			filterFavorites = filters.favoriteFilters.filterFavoritesById;
	   			break;
	   		case 'SORT_BY_A_Z':
	   			filterFavorites = filters.favoriteFilters.filterFavoritesAZ;
	   			break;
	   		case 'SORT_BY_Z_A':
	   			filterFavorites = filters.favoriteFilters.filterFavoritesZA;
	   			break;
	   	}

	   	switch (this.state.currentFilters.kountersFilter) {
	   		case 'SORT_BY_ID':
	   			filterKounters = filters.kounterFilters.filterKountersById;
	   			break;
	   		case 'SORT_BY_A_Z':
	   			filterKounters = filters.kounterFilters.filterKountersAZ;
	   			break;
	   		case 'SORT_BY_Z_A':
	   			filterKounters = filters.kounterFilters.filterKountersZA;
	   			break;
		   }
	

		return (
			<Container>
				<DialogComponent 
					dialogErrorStatus={this.state.dialogError} 
					open={this.state.dialogOpen} 
					openDialogMethod={this.openDialog.bind(this)}
					addNewTracker={this.handleAddNewKounter.bind(this)}
					numberOfKounters={this.props.number_of_kounters}
					getRandomColor={getRandomColor.bind(this)}
					kounters={this.props.kounters}
					triggerError={this.triggerError.bind(this)} 
					fontLoaded={this.state.fontLoaded}
				/>


				{/* <TouchableOpacity onPress={this.handleAddNewKounter}>
					<Text style={{color: 'white'}}>Add New Kounter</Text>
				</TouchableOpacity>
				
				<TouchableOpacity onPress={this.resetEverything}>
					<Text style={{color: 'white'}}>Clear</Text>
				</TouchableOpacity> */}
				<SafeAreaView forceInset={{ bottom: 'never'}}> 
					<ScreenHeader />
					<ScrollView style={{ height: "100%"}}>
						<CardContainer>
						
							<ListHeader 
								title='FAVORITES'
								sortKounters={this.sortKounters.bind(this)}
								nextSort={this.state.nextSort}
								currentFilters={this.state.currentFilters}
							/>

							{filterKounters.map((kounter, kounter_id) => {
								return (
									<Card 
										active={kounter.active}
										navigate={this.navigateToKounterScreen}
										kounter={kounter}
										id={kounter.id}
										name={kounter.name}
										color={kounter.color}
										description={kounter.description}
										amount={kounter.amount}
										updateKounter={this.handleUpdateKounter.bind(this)}
									/>
								);
							})}

							{filterFavorites.map((kounter, kounter_id) => {
								return (
									<Card 
										navigate={this.navigateToKounterScreen}
										kounter={kounter}
										id={kounter.kounter_id}
										name={kounter.name}
										color={kounter.color}
										description={kounter.description}
										amount={kounter.amount}
										updateKounter={this.handleUpdateKounter.bind(this)}
									/>
								);
							})}

						<TouchableOpacity onPress={this.handleGetKounters}>
							<Text style={{color: 'white'}}>Get Kounter</Text>
						</TouchableOpacity>

						</CardContainer>
					</ScrollView>
					<LinearGradient colors={['rgba(0,0,0,0.9)', 'transparent']} start={[0, 1.0]} end={[0.0, 0.3]} style={{display: showAddButton, justifyContent: 'center', alignItems: 'center', bottom: '16%', height: '15%'}}>
						<NewCardButton onPress={() => { this.openDialog(true)} } >
							<NewCardButtonImage source={require('../../assets/plus_button.png')} />
						</NewCardButton>
					</LinearGradient>
				</SafeAreaView>
			</Container>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);


const Container = styled.View`
	flex: 1;
	background-color: #0d0f19;
	justify-content: center;
	top:0;
`;

const CardContainer = styled.View`
	padding: 0px 5px;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	margin: 0px 1% 10px 1%;
`;

const NewCardButton = styled.TouchableOpacity`
	height: 48;
	width: 48;
	margin-top: 5%;
	margin-bottom: 15%;
`;

const NewCardButtonImage = styled.Image`
	position: absolute;
	height: 48;
	width: 48;
	resize-mode: center;
`;
