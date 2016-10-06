'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
} from 'react-native';

import TopBar from './home/TopBar';
import Carousel from 'react-native-swiper';
import MenuButton from './component/MenuButton';

import BagActive from './home/BagActive';
import ClothesActive from './home/ClothesActive';
import DigitalActive from './home/DigitalActive';

import UIConfigure from './common/UIConfigure';
import Constant from './common/Constant';
import Utils from './common/Utils'

export default class HomePage extends Component {

    componentDidMount() {
        const {fetchHomeResult} =this.props;
        fetchHomeResult();
    }

    _onItemClick(title:string) {

    }

    _onMenuClick(title:string) {

    }

    _onRefresh() {
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

    _renderCarousel(data:Array){
        return data.map((item,i)=>{
            return (
                <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=>this._onItemClick('商品详情')}>
                    <View style={styles.slide} >
                        <Image source={{uri:Constant.httpKeys.IMAGE_API_HOST+item.img}}
                              style={styles.carouselImg}/>
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
            <Carousel style={styles.wrapper} height={UIConfigure.home.carouselHeight} autoplay={true} autoplayTimeout={5}
                    paginationStyle={styles.paginationStyle}
                    loop={true}>
                {this._renderCarousel(resultDto.indexjpgDto)}
            </Carousel>

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
      height:UIConfigure.home.carouselHeight,
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
        marginVertical: 20,
    },
    carouselImg: {
      width:UIConfigure.home.carouselWidth,
      height:UIConfigure.home.carouselHeight,
      resizeMode:'cover',
    }

});
