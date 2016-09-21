'use strict';

import React,{ Component,PropTypes } from 'react';
import {
    Image,
    TextInput,
    Text,
    View,
    TouchableOpacity,
    Platform,
    StyleSheet
} from 'react-native';

import ProductSearch from '../product/ProductSearch';
import UIConfigure from '../common/UIConfigure';

export default class TopBar extends Component {

  constructor(props){
        super(props);
        this.state = {
            login:'登录',
        };
  }

  componentDidMount() {
    //查询是否登录
    // Utils.storageGetItem(Constant.storeKeys.LOGIN_INFO_KEY)
    //     .then((value)=> {
    //       if(value){
    //       console.log('tag','登录信息获取＝'+JSON.stringify(value));
    //       if(value.accessToken)
    //         this.setState({
    //               login:'已登录',
    //         });
    //       }
    //     });

  }
    /**
     *  进入二维码扫描
     * @param title
     * @private
     */
    _onScanClick(title:string) {

    }

    /**
     *
     * 进入搜索
     * @param title
     * @private
     */
    _onSearchClick(title:string) {
        const {navigator} = this.props;
        navigator.push({
            name: title,
            component: ProductSearch,
            params: {
                title:title,
            }
        })
    }

    render() {
        return (
          <View>
            <View style={styles.container}>
                <Image source={require('../image/home_logo_@2x.png')} style={styles.logo}/>
                <View style={styles.searchBox}>
                    <Image source={require('../image/lib_story_img_search_bt_@2x.png')} style={styles.searchIcon}/>
                    <Text
                        onPress={()=>this._onSearchClick('搜索')}
                        style={styles.inputText}>
                        搜索...
                    </Text>
                </View>
                <Image style={{width:28,height:28}} source={require('../image/icon_camera_@2x.png')}/>
            </View>
            <View style={styles.separate}/>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',   // 水平排布
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop:UIConfigure.home.statusBarHeight,
        height: UIConfigure.home.navigationBarHeight,
        backgroundColor: UIConfigure.home.defaultBgColor,
        alignItems: 'center'
    },
    logo: {
        height: 15,
        width: 100,
        resizeMode: 'stretch'
    },
    searchBox: {
        height: 25,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 12,
        backgroundColor: 'white',
        borderWidth:0.5,
        borderColor:'#DEDEDE',
        alignItems:'center',
        marginLeft:10,
        marginRight:10,
    },
    scanIcon: {
        height: 17,
        width: 17,
        resizeMode: 'stretch'
    },
    searchIcon: {
        marginLeft: 6,
        marginRight: 3,
        width: 10,
        height: 10,
        resizeMode: 'stretch'
    },
    inputText: {
        flex: 1,
        color:UIConfigure.home.searchTextColor,
        backgroundColor: 'transparent',
        fontSize: 10
    },
    loginText:{
        fontSize:13,
    },
    separate:{
      height:1,
      backgroundColor:'#A7A7AA',
    },
});
