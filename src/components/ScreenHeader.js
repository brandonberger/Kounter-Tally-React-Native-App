import React from 'react';
import { StatusBar, Platform, View, Text, TouchableOpacity, Image } from 'react-native';
import styled from "styled-components";

if (Platform.OS == 'android') { 
	headerMargin = StatusBar.currentHeight + 11 
} else { 
	headerMargin = 133
}

var settingsButton = require('../../assets/settings.png');

class ScreenHeader extends React.Component {
    render() {
        return (
            <Header style={{marginTop: headerMargin}}>
                <HeaderTitle>KOUNTER</HeaderTitle>
                <SettingsButton 
                    onPress={() => this.openSettings(true)}
                >
                    <Image source={settingsButton} />
                </SettingsButton>

            </Header>
        );
    }
}

export default ScreenHeader;

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