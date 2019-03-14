import React, { Component } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';


const RoundButton = props => (

	<TouchableOpacity onPress={props.action} style={RoundButtonStyle.RoundButton}>
		<Image style={RoundButtonStyle.buttonImage} source={require(plus)} />
	</TouchableOpacity>
);



const RoundButtonStyle = StyleSheet.create({

});


export default RoundButton;