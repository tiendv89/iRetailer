import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';

export default class IconButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {style} = this.props;
        return (
            <TouchableOpacity
                style={}
            >
                <Icon/>
            </TouchableOpacity>
        )
    }
}

IconButton.propTypes = {

};