import React from 'react';
import { Text, View, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


const Header = props => (
	<View style={styles.headerContainer}>
		<Text style={styles.title}>
			{props.viewTitle}
		</Text>
	</View>
);

const styles = {
	title: {
		textAlign: 'center',
		color: '#fff',
		fontSize: 18,
	},
	headerContainer: {
		justifyContent: 'flex-start',
		flexDirection: 'column',
		marginTop: hp('10%'),
		// height: hp('20%'),
		width: '100%',
		// borderWidth: 3
	}
};

export default Header;