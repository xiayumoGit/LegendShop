'use strict';

import React, { Component } from 'react';
import {
    Navigator,
} from 'react-native';

import Splash from './Splash';
export default class App extends Component {

    componentDidMount(){

    }

    render() {
        let defaultName = 'Splash';
        let defaultComponent = Splash;
        return (
            <Navigator
                initialRoute={{ name: defaultName, component: defaultComponent }}
                renderScene={(route, navigator) => {
                    let Component = route.component;
                    return <Component {...route.params} navigator={navigator} />}} />
        );
    }
}
