'use strict';

import React,{ Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';



/**
 * 该组件定义上面icon底部文字并带有右上角冒泡的基础组件,验证参数类型，定义该组件默认的状态和行为
 */

export default class MenuButton extends Component {

    static propTypes = {
        renderIcon: PropTypes.number.isRequired,
        showText: PropTypes.string.isRequired,
        onClick: PropTypes.func,
        renderBadge:PropTypes.func,
        renderPrompt:PropTypes.func,
        textStyle:Text.propTypes.style,
        iconStyle:View.propTypes.style,
    };

    constructor(props) {
        super(props);
        this._onClick = this._onClick.bind(this);
    }

    _onClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        let {textStyle,iconStyle,renderBadge,renderPrompt}= this.props;
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={this._onClick}>
                <View style={styles.container}>
                    <Image style={[styles.icon,iconStyle]} source={this.props.renderIcon}/>
                    <Text style={[styles.showText,textStyle]}>{this.props.showText}</Text>
                    {renderPrompt}
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
       alignItems:'center',
       flex:1,
       paddingLeft:10,
       paddingRight:10,
       paddingTop:3,
       paddingBottom:3,
    },
    icon: {
        width: 40,
        height: 40,
        marginBottom: 3
    },
    showText: {
        fontSize: 12,
        color:'#6E6E6E',
    }
});
