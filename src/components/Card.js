import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styled from "styled-components";


var plus_button = require('../../assets/plus_button.png');
var minus_button = require('../../assets/minus_button.png');


class Card extends React.Component {
	render() {
		return (
			<CardBody key={this.props.id} style={{backgroundColor: this.props.color}}>
				<CardHeader>
					<TouchableOpacity style={{justifyContent: 'center', flex: 1}}	
						onPress={() => { 
							this.props.navigate(this.props.kounter)
						}}
					>
						<CardTitle>
							{this.props.name}
						</CardTitle>
						<CardDescription>
							{/* {this.props.description} */}
							{this.props.active}
						</CardDescription>
					</TouchableOpacity>
				</CardHeader>
				<CardControlsContainer>
					<CardButtonContainer onPress={() => this.props.updateKounter(this.props.id, 'subtract')}>
						<CardMinusButton source={minus_button} />
					</CardButtonContainer>
						<CardCount>
							{this.props.amount}
						</CardCount>
					<CardButtonContainer onPress={() => this.props.updateKounter(this.props.id, 'add')}>
						<CardPlusButton source={plus_button} />
					</CardButtonContainer>
				</CardControlsContainer>
			</CardBody>
		);
	}
}

export default Card;


const CardBody = styled.View`
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