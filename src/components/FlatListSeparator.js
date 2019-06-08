import React from 'react';
import {View, FlatList} from 'react-native';


class Separator extends React.Component {
    render() {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    }
}

export default Separator;