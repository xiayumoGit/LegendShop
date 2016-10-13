'use strict';

import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Platform,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import TopBar from './home/TopBar';
import Carousel from 'react-native-swiper';

import BagActive from './home/BagActive';
import ClothesActive from './home/ClothesActive';
import DigitalActive from './home/DigitalActive';
import CarouselWebView from './home/CarouselWebView';

import UIConfigure from './common/UIConfigure';
import Constant from './common/Constant';
import Utils from './common/Utils'

export default class HomePage extends Component {

    componentDidMount() {
        const {fetchHomeResult} =this.props;
        fetchHomeResult();
    }

    _onItemClick(title:string) {
        InteractionManager.runAfterInteractions(() => {
            const {navigator} = this.props;
            navigator.push({
                name: title,
                component: CarouselWebView,
                params: {
                    title:title,
                }
            })
        });
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
                <TouchableOpacity key={i} activeOpacity={0.7}>
                    <View style={styles.container1}>
                        <Image style={styles.icon} source={UIConfigure.home.menuIconArray[i]}/>
                        <Text style={styles.showText}>{item}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    _renderCarousel(data:Array){
        return data.map((item,i)=>{
            return (
                <TouchableOpacity key={i} activeOpacity={0.7} onPress={()=>this._onItemClick(item.title)}>
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
        let content = isLoading ? <ActivityIndicator size={Platform.OS ==='ios'?'small':'large'} style={styles.scrollSpinner}/>
            : (!Utils.isEmptyObject(resultDto)?
            <ScrollView
                            style={styles.container}
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
    },
    container1:{
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
