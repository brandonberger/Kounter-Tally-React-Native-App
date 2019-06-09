import React from 'react';
import { Font } from 'expo';
import { Text } from 'react-native';

class FontComponent extends React.Component {

    state = {
        fontLoaded: false
    }

	async componentDidMount() {
		await Font.loadAsync({
		  'anodina-xbold': require('../../assets/fonts/Anodina-ExtraBold.otf'),
		  'avenir-medium': require('../../assets/fonts/Avenir-Medium.ttf'),
		  'avenir-heavy': require('../../assets/fonts/Avenir-Heavy.ttf'),
		  'avenir-black': require('../../assets/fonts/Avenir-Black.ttf'),
		});
		await this.setState({ fontLoaded: true });
	}

    render() {
        return (
            this.state.fontLoaded ? (
                <Text style={{fontFamily: this.props.fontFamily}}>
                    {this.props.text}  
                </Text>
            ) : 
            // (
            //     <Text>
            //         {this.props.text}  
            //     </Text>
            // ) 
            null
        );
    }
}

export default FontComponent;