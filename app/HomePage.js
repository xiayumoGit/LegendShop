'use strict';

import React, { Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
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
import Recommend from './home/Recommend';
import BusinessActive from './home/BusinessActive';
import BusinessNew from './home/BusinessNew';
import ThemePavilion from './home/ThemePavilion';

import ProductList from './product/ProductList'
import ProductDetail from './product/ProductDetail';
import SearchProduct from './product/SearchProduct';

import Login from './login/Login';

const BANNER_IMGS = [
    require('./image/img_home_banner1_@2x.jpg'),
    require('./image/img_home_banner2_@2x.jpg'),
    require('./image/img_home_banner3_@2x.jpg'),
];
const adv_IMGS= [
    require('./image/home_adv_@2x.jpg'),
    require('./image/home_adv_@2x.jpg'),
    require('./image/home_adv_@2x.jpg'),
    require('./image/home_adv_@2x.jpg')
];

//首页配置，各组件导入
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state={
          isRefreshing:false,
        };
        this._onRefresh=this._onRefresh.bind(this);
    }

    componentDidMount() {
        //获取首页数据


    }

    _onCodeClick(title:string) {

    }

    _onSearchClick(title:string) {
       let navigator = this.props.navigator;
        navigator.push({
               name: title,
               component: SearchProduct,
               params: {
                    title:title,
                }
        })
    }

    _onMenuClick(title:string) {
       let navigator = this.props.navigator;
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
    _onItemClick(title:string){
      let navigator = this.props.navigator;
        navigator.push({
              name: title,
              component: ProductDetail,
              params: {
                   title:title,
               }
       })
    }
    _onRefresh() {
        this.setState({isRefreshing: true});
        setTimeout(() => {
          //这里从新获取数据
          this.setState({
            isRefreshing: false,
          });
        }, 1500 );
    }
    render() {
        return (
            <View style={{flex: 1}}>
            <StatusBar
                backgroundColor='white'
                translucent={true}
                hidden={false}
                animated={true}
              />
              <TopBar  _onSearchClick={this._onSearchClick.bind(this)}  _onCodeClick={this._onCodeClick.bind(this)}/>
	            <ScrollView style={styles.container1}
                          refreshControl={
                            <RefreshControl
                              refreshing={this.state.isRefreshing}
                              onRefresh={this._onRefresh}
                          />}>
                <Swiper style={styles.wrapper} height={145} autoplay={true} autoplayTimeout={5}
                        paginationStyle={styles.paginationStyle}
                        loop={true}>
                        <TouchableHighlight onPress={()=>this._onItemClick('商品详情')}>
                          <Image source={BANNER_IMGS[0]}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this._onItemClick('商品详情')}>
                          <Image source={BANNER_IMGS[1]}/>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={()=>this._onItemClick('商品详情')}>
                          <Image source={BANNER_IMGS[2]}/>
                        </TouchableHighlight>
                </Swiper>
                <View style={styles.menuView1}>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag1_@2x.png')}
                                showText={'精品'}
                                onClick={()=>this._onMenuClick('精品')}/>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag2_@2x.png')}
                                showText={'热卖'}
                                onClick={()=>this._onMenuClick('热卖')}/>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag3_@2x.png')}
                                showText={'促销'}
                                onClick={()=>this._onMenuClick('促销')}/>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag4_@2x.png')}
                                showText={'团购'}
                                onClick={()=>this._onMenuClick('团购')}/>
                </View>
                <View style={styles.menuView2}>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag5_@2x.png')}
                                showText={'积分'}
                                onClick={()=>this._onMenuClick('积分')}/>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag6_@2x.png')}
                                showText={'试用'}
                                onClick={()=>this._onMenuClick('试用')}/>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag7_@2x.png')}
                                showText={'类目'}
                                onClick={()=>this._onMenuClick('类目')}/>
                    <MenuButton renderIcon={require('./image/icon_home_center_tag8_@2x.png')}
                                showText={'品牌'}
                                onClick={()=>this._onMenuClick('品牌')}/>
                </View>
                <Recommend  onItemClick={this._onItemClick.bind(this)} onMoreClick={this._onMenuClick.bind(this)}/>
                <Swiper style={styles.wrapper} height={70} autoplay={true} autoplayTimeout={5}
                  paginationStyle={styles.paginationStyle}
                  loop={true}>
                  <TouchableHighlight onPress={()=>this._onItemClick('商品详情')}>
                    <Image source={adv_IMGS[0]}/>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>this._onItemClick('商品详情')}>
                    <Image source={adv_IMGS[1]}/>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={()=>this._onItemClick('商品详情')}>
                    <Image source={adv_IMGS[2]}/>
                  </TouchableHighlight>
                </Swiper>
                <BusinessActive onItemClick={this._onItemClick.bind(this)} onMoreClick={this._onMenuClick.bind(this)}/>
                <BusinessNew onItemClick={this._onItemClick.bind(this)} onMoreClick={this._onMenuClick.bind(this)}/>
                <ThemePavilion onItemClick={this._onItemClick.bind(this)} onMoreClick={this._onMenuClick.bind(this)}/>
              </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container1:{
      backgroundColor:'#F1F2F6',
    },
    menuView1: {
      flex:1,
      backgroundColor:'white',
      justifyContent:'space-around',
      flexDirection: 'row',
      marginTop: 8,
      padding:3,
    },
    menuView2: {
      flex:1,
      backgroundColor:'white',
      justifyContent:'space-around',
      flexDirection: 'row',
      padding: 3,
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
    wrapper: {
      flex:1,
      backgroundColor:'white'
    },
    paginationStyle:{
      bottom: 5,
    }
});
