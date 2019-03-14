import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TouchableHighlight, StyleSheet } from 'react-native';

class Navigation extends Component {

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity 
					onPress={() => this.props.navigation.push('Other')}
				>
					<Text style={styles.text}> Back </Text>
				</TouchableOpacity>
				<TouchableOpacity>
					<Text style={styles.text}> Trash </Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Navigation;



const styles = StyleSheet.create({
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
		color: 'white'
	}
});