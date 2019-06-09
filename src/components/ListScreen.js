import React, { Component } from 'react';
import { Font, LinearGradient } from 'expo';
import { TouchableWithoutFeedback, StatusBar, Platform, ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {SafeAreaView} from 'react-navigation';
import styled from "styled-components";
import { Dialog as DialogComponent } from './Dialog';
import { Modal as ModalComponent } from './Modal';

function mapStateToProps(state) {
	// console.log(state);
	return { 
			 action: state.action,
		   	 trackerCards: state.trackerCards,
		   	 numberOfCards: state.trackerCards.length,
		   	 totalCardsEver: state.totalCardHistory,
		   	 currentSort: state.currentSort,
		   	 nextSort: state.nextSort,
		   	 showConfirmButtons: state.showConfirmButtons,
		   	 showPreConfirmButtons: state.showPreConfirmButtons
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
      				currentCount: 0,
      				lastUpdated: 0
      				}
	    	})
				: null
				
				name = null;
	    },
	    addKounter(card_id) {
	    	dispatch({
	      		type: "ADD_KOUNTER",
	      		card_id: card_id
	    	})
	    },
	    subtractKounter(card_id) {
	    	dispatch({
	      		type: "SUBTRACT_KOUNTER",
	      		card_id: card_id
	    	})
	    },
	    deleteAll() {
	    	dispatch({
	    		type: "DELETE_ALL"
	    	})
	    },
	    sortKounters(list, sortMethod, nextSortMethod) {
    		dispatch({
    			type: "SORT",
    			list: list,
    			sortMethod: sortMethod,
    			nextSortMethod: nextSortMethod
    		})
	    },
	    resetEverything() {
	    	dispatch({
	    		type: 'RESET_EVERYTHING'
	    	})
	    },
	    toggleEraseAllConfirmButtons(status) {
	    	dispatch({
	    		type: "TOGGLE_ERASE_CONFIRM_BUTTONS",
	    		showConfirmButtonsStatus: status
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


var plus_button = require('../../assets/plus_button.png');
var minus_button = require('../../assets/minus_button.png');


const sorts = {
	SORT_BY_ID: {
		image: require('../../assets/a_z_filter_disabled.png')
	},
	SORT_BY_A_Z: {
		image: require('../../assets/a_z_filter.png')
	},
	SORT_BY_Z_A: {
		image: require('../../assets/z_a_filter.png')
	}
};

var settingsButton = require('../../assets/settings.png');
var favoritesIcon = require('../../assets/favorites.png');

class ListScreen extends Component {

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

	async componentDidMount() {

		StatusBar.setBarStyle("light-content", true);

		await Font.loadAsync({
		  'anodina-xbold': require('../../assets/fonts/Anodina-ExtraBold.otf'),
		  'avenir-medium': require('../../assets/fonts/Avenir-Medium.ttf'),
		  'avenir-heavy': require('../../assets/fonts/Avenir-Heavy.ttf'),
		  'avenir-black': require('../../assets/fonts/Avenir-Black.ttf'),
		});

		await this.setState({ fontLoaded: true });

		// DANGER
		// this.props.resetEverything();

		this.setState({ currentFilters: { favoritesFilter: this.props.currentSort.favorites, kountersFilter: this.props.currentSort.kounters }});
		this.setState({ nextSort: { favorites: this.props.nextSort.favorites, kounters: this.props.nextSort.kounters }});
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

	render() {


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


	    kounters = this.props.trackerCards;


	    const filters = {
	    	favoriteFilters: {
	    		filterFavoritesById: kounters.filter(card=>card.favorite_status).sort((a,b) => a.id > b.id),
	    		filterFavoritesAZ: kounters.filter(card=>card.favorite_status).sort((a,b) => a.title > b.title),
	    		filterFavoritesZA: kounters.filter(card=>card.favorite_status).sort((a,b) => a.title < b.title),
	    	},
	    	kounterFilters: {
	    		filterKountersById: kounters.filter(card=>!card.favorite_status).sort((a,b) => a.id > b.id),
	    		filterKountersAZ: kounters.filter(card=>!card.favorite_status).sort((a,b) => a.title > b.title),
	    		filterKountersZA: kounters.filter(card=>!card.favorite_status).sort((a,b) => a.title < b.title),
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
					addNewTracker={this.props.addNewTracker.bind(this)}
					numberOfCards={this.props.numberOfCards}
					getRandomColor={getRandomColor.bind(this)}
					trackerCards={this.props.trackerCards}
					triggerError={this.triggerError.bind(this)} 
					fontLoaded={this.state.fontLoaded}
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
								<Image source={settingsButton} />
							</SettingsButton>

						</Header>
	            	<ScrollView style={{ height: "100%"}}>
						<CardContainer>
							<ListHeader style={{display: showFavorites}}>
								<ListHeaderContainer>
									{this.state.fontLoaded ? (
										<ListHeaderText style={{fontFamily: 'avenir-heavy'}}>FAVORITES</ListHeaderText>
										) : null
									}
									<FavoritesIcon source={favoritesIcon} />
								</ListHeaderContainer>
								<SortingAction>
									<TouchableOpacity onPress={() => this.sortKounters('FAVORITES', this.state.nextSort.favorites)}>
										<SortingIcon source={sorts[this.state.currentFilters.favoritesFilter].image} />
									</TouchableOpacity>
								</SortingAction>
							</ListHeader>


							{filterFavorites.map((card, card_id) => {
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
										<CardButtonContainer onPress={() => this.props.subtractKounter(card.card_id)}>
											<CardMinusButton source={minus_button} />
										</CardButtonContainer>
										{this.state.fontLoaded ? (
											<CardCount style={{fontFamily: 'avenir-medium'}}>
												{card.currentCount}
											</CardCount>
											) : null
										}
										<CardButtonContainer onPress={() => this.props.addKounter(card.card_id)}>
											<CardPlusButton source={plus_button} />
										</CardButtonContainer>
									</CardControlsContainer>
								</Card>
								)
							})}


							<ListHeader style={{display: showKounters}}>
								<ListHeaderContainer>
									{this.state.fontLoaded ? (
										<ListHeaderText style={{fontFamily: 'avenir-heavy'}}>KOUNTERS</ListHeaderText>
										) : null
									}
								</ListHeaderContainer>
								<SortingAction>
									<TouchableOpacity onPress={() => this.sortKounters('KOUNTERS', this.state.nextSort.kounters)}>
										<SortingIcon source={sorts[this.state.currentFilters.kountersFilter].image} />
									</TouchableOpacity>
								</SortingAction>
							</ListHeader>
							

							{filterKounters.map((card, card_id) => {
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
										<CardButtonContainer onPress={() => this.props.subtractKounter(card.card_id)}>
											<CardMinusButton source={minus_button} />
										</CardButtonContainer>
										{this.state.fontLoaded ? (
											<CardCount style={{fontFamily: 'avenir-medium'}}>
												{card.currentCount}
											</CardCount>
											) : null
										}
										<CardButtonContainer onPress={() => this.props.addKounter(card.card_id)}>
											<CardPlusButton source={plus_button} />
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
							<NewCardButtonImage source={plus_button} />
						</NewCardButton>
					</LinearGradient>
				</SafeAreaView>

				<TouchableWithoutFeedback onPress={() => this.openSettings(false)}>
					<Overlay style={{width: this.state.showOverlay}}>
					</Overlay>
				</TouchableWithoutFeedback>

				<ModalComponent 
					modalTitle="SETTINGS"
					toggleStatus={this.state.modalOpen}
					openModalMethod={this.openSettings.bind(this)}
					fontLoaded={this.state.fontLoaded}
					buttonContent="Erase All Data"
					buttonMethod={this.props.deleteAll}
					modalItem={true}
					modalButtonTitle="Want to start new?"
					modalFooter={true}
					confirmPrompt={true}
					hasCardData={this.props.trackerCards.length}
					showConfirmButtons={this.props.showConfirmButtons}
					showPreConfirmButtons={this.props.showPreConfirmButtons}
					showConfirmButtonsMethod={this.props.toggleEraseAllConfirmButtons}
				/>

	            	{!kountersExist && !favoritesExist ? (
            			<EmptyKountersContainer style={{height: hp(90)}}>
            				<EmptyKountersAddButton 
								onPress={() => { this.openDialog(true)} }
							>
								<EmptyKountersAddButtonImage source={plus_button} />
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
	margin: 0px 1% 10px 1%;
`;


const ListHeader = styled.View`
	justify-content: space-between;
	flex: 1;
	flex-direction: row;
	margin-top: 20px;
`;

const ListHeaderContainer = styled.View`
	flex-direction: row;
	padding: 0;
	margin: 0;
	left: 0;
	align-items: center;
	width: 50%;
`;

const ListHeaderText = styled.Text`
	color: white;
	font-size: 18px;
	left: 20;
	padding-right: 25px;
`;

const FavoritesIcon = styled.Image`
	margin-top: -1px;
	height: 14px;
	width: 14.63px;
`;


const SortingAction = styled.View`
	width: 50%;
	flex: 1;
	flex-direction: row;
	justify-content: flex-end;

`;
const SortingIcon = styled.Image`
	margin-right: 20;
`;

const Card = styled.View`
	height: 72;
	width: 94.66%;
	background-color: #EF5350;
	border-radius: 10;
	margin: 5px;
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
`;

const KountersText = styled.Text`
	color: white;
	font-size: 18;
	left: 20;
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

const CardCount = styled.Text`
	font-size: 36;
	width: 70;
	color: #ffffff;
	textAlign: center;
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
