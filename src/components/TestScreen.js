import React from 'react';
import {connect} from 'react-redux';
import { ScrollView, View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import {addNewKounter, clearAll} from './KounterFunctions';
import Card from './Card';
import styled from "styled-components";
import {SafeAreaView} from 'react-navigation';

function mapStateToProps(state) {
	return {
		kounters: state.kounters,
		number_of_kounters: state.kounters.length
	}
}

function mapDistpatchToProps(dispatch) {
	return {
		updateKounters: kounters =>
	    	dispatch({
	      		type: "SET_KOUNTERS",
	      		kounters: kounters
    		}),
    	reset: () => 
    		dispatch({
    			type: "RESET_EVERYTHING"
    		})
    }
}	


class TestScreen extends React.Component {

	componentDidUpdate() {
		// console.log(this.props.kounters);
	}

	handleAddNewKounter = () => {

		const newKounter = [{
			id: this.props.number_of_kounters + 1,
			name: 'kava',
			description: null,
			color: null,
			amount: 0,
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

	resetEverything = () => {
		clearAll();
		this.props.reset();
	}

	render() {
		return (
			<View>
				<TouchableOpacity onPress={this.handleAddNewKounter}>
					<Text>Add New Kounter</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.handleGetKounters}>
					<Text>Get Kounters</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={this.resetEverything}>
					<Text>Clear</Text>
				</TouchableOpacity>

				<SafeAreaView forceInset={{ bottom: 'never'}}> 
	            	<ScrollView style={{ height: "100%"}}>
						<CardContainer>
						{this.props.kounters.map((kounter, kounter_id) => {
							return (
								<Card 
									id={kounter_id}
									name={kounter.name}
									color={kounter.color}
									description={kounter.description}
									amount={kounter.amount}
								/>
							)
						})}
						</CardContainer>
					</ScrollView>
				</SafeAreaView>
				
			</View>
		);
	}
}

export default connect(mapStateToProps, mapDistpatchToProps)(TestScreen);


const CardContainer = styled.View`
	padding: 0px 5px;
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: center;
	margin: 0px 1% 10px 1%;
	background-color:black;
`;