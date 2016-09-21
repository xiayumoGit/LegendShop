'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    Alert,
    StatusBar,
    RefreshControl,
    TouchableOpacity,
    InteractionManager,
    TouchableHighlight,
} from 'react-native';

import TopBar from './home/TopBar';
import Swiper from 'react-native-swiper';
import MenuButton from './component/MenuButton';

import BagActive from './home/BagActive';
import ClothesActive from './home/ClothesActive';
import DigitalActive from './home/DigitalActive';

import ProductList from './product/ProductList'

import UIConfigure from './common/UIConfigure';
import Constant from './common/Constant';
import Utils from './common/Utils'

export default class HomePage extends Component {

    componentDidMount() {
        const {fetchHomeResult} =this.props;
        fetchHomeResult();
    }

    /**
     *
     * 进入收藏，订单，财产，精品
     * @param title
     * @private
     */
    _onMenuClick(title:string) {
        const {navigator} = this.props;
        navigator.push({
               name: title,
               component: ProductList,
               params: {
                    title:title,
                    orderBy:'buys',
                    keyword:'包',
                }
        })
    }

    /**
     * 下拉刷新
     * @private
     */
    _onRefresh() {
        /**
         * 首页刷新数据
         */
        const {fetchHomeRefreshResult} =this.props;
        fetchHomeRefreshResult();
    }

    _renderMenuView(){
        return UIConfigure.home.menuStringArray.map((item,i)=>{
            return (
                <MenuButton key={i} renderIcon={UIConfigure.home.menuIconArray[i]}
                            showText={item}
                            onClick={()=>this._onMenuClick(item)}/>
            )
        });
    }

    /**
     * 获取轮播图片刷新
     * @returns {*}
     * @private
     */
    _renderSwiperCell(swiperArray){
        return swiperArray.map((item,i)=>{

            return (
                <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=>this._onItemClick('商品详情')}>
                    <View style={styles.slide} >
                        <Image source={{uri:Constant.httpKeys.IMAGE_API_HOST+item.img}}
                              style={styles.swiperImg}/>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    render() {

        const {isLoading,isRefreshing,resultDto}=this.props;

        let content = isLoading ? <ActivityIndicator style={styles.scrollSpinner}/>
            : (!Utils.isEmptyObject(resultDto)?<ScrollView style={styles.container}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                            <RefreshControl
                              refreshing={isRefreshing}
                              onRefresh={()=>this._onRefresh()}
                          />}>
            <Swiper style={styles.wrapper} height={UIConfigure.home.swiperHeight} autoplay={true} autoplayTimeout={5}
                    paginationStyle={styles.paginationStyle}
                    loop={true}>
                {this._renderSwiperCell(resultDto.indexjpgDto)}
            </Swiper>

            <View style={styles.menuView}>
                {this._renderMenuView()}
            </View>

            <BagActive {...this.props}/>
            <ClothesActive {...this.props}/>
            <DigitalActive {...this.props}/>
        </ScrollView>:null);

        return (
            <View style={{flex: 1}}>
              <TopBar navigator={this.props.navigator}/>
                {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:UIConfigure.home.defaultBgColor,
    },
    slide: {
      flex: 1,
      height:UIConfigure.home.swiperHeight,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    menuView: {
      backgroundColor:'white',
      justifyContent:'space-around',
      flexDirection: 'row',
      marginTop: 8,
      padding:3,
    },
    wrapper: {
      backgroundColor:'white'
    },
    paginationStyle:{
      bottom: 5,
    },
    scrollSpinner: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical:200,
    },
    swiperImg: {
      width:UIConfigure.home.swiperWidth,
      height:UIConfigure.home.swiperHeight,
      resizeMode:'cover',
    }

});
