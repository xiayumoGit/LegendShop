/**
 * Created by xiayumo on 16/10/12.
 */
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    WebView,
    View,
} from 'react-native';

import Back from '../component/Back';
import Constant from '../common/Constant'

export default class CarouselWebView extends Component{

    constructor(props) {
        super(props);
        this.state={

        };
    }

    _onClick() {
        this.props.navigator.pop();
    }

    shouldComponentUpdate(nextProps: Object): boolean {
        return !!nextProps.shouldUpdate;
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:Constant.colors.lightGreyColor}}>
                <Back title={this.props.title} _onClick={()=>this._onClick()}
                      />
                <WebView
                    automaticallyAdjustContentInsets={false}
                    source={{uri: 'https://www.hao123.com/'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    startInLoadingState={true}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({

});


