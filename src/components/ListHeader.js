import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components';

var settingsButton = require('../../assets/settings.png');
var favoritesIcon = require('../../assets/favorites.png');

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


class ListHeader extends React.Component {
    render() {
        return (
            <ListHeaderView>
                <ListHeaderContainer>
                    <ListHeaderText>{this.props.title}</ListHeaderText>
                    <FavoritesIcon source={favoritesIcon} />
                </ListHeaderContainer>
                <SortingAction>
                    <TouchableOpacity onPress={() => this.props.sortKounters('KOUNTERS', this.props.nextSort.kounters)}>
                        <SortingIcon source={sorts[this.props.currentFilters.kountersFilter].image} />
                    </TouchableOpacity>
                </SortingAction>
            </ListHeaderView>
        );
    }
}

export default ListHeader;


const ListHeaderView = styled.View`
	justify-content: space-between;
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