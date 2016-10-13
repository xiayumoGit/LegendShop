/**
 * Created by xiayumo on 16/9/23.
 */
'use strict';

import React, {PropTypes} from 'react';
import {
    Text,
    View,
} from 'react-native';

export default class IndicatorNavigatorItem extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        titleStyle: Text.propTypes.style,
        selectedTitleStyle: Text.propTypes.style,
        bacStyle: View.propTypes.style,
        selectedBacStyle: View.propTypes.style,
        lineStyle: View.propTypes.style,
        selectLineStyle: View.propTypes.style,
        selected: PropTypes.bool,
        onPress: PropTypes.func,
    };

    render() {
        let child = React.Children.only(this.props.children);
        return React.cloneElement(child, {
            style: [child.props.style, this.props.style],
        });
    }
}
