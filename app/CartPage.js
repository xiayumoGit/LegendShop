'use strict';

import React,{ Component,PropTypes } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicatorIOS,
    ScrollView,
    StyleSheet,
    ListView,
    Platform,
} from 'react-native';

  import CartCell from './cart/CartCell';
  import ProductDetail from './product/ProductDetail';

  //购物车测试数据
  const CART_DATAS=[
   {title:'汉密尔顿(Hamiliton)旗舰店',content:[
      {img:require('./image/default_banner_@2x.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
      color:'颜色：银盘 棕带',price:'¥5599.00'},
      {img:require('./image/default_banner_@2x.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表adsfasdf',
      color:'颜色：银盘 棕带',price:'125555.00'}]
   },
   {title:'百达翡丽独家直营店',content:[
      {img:require('./image/default_banner_@2x.jpg'),name:'百达翡丽(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
      color:'颜色：银盘 白色',price:'1256000.00'},]
   },
   {title:'江诗丹顿旗舰店',content:[
      {img:require('./image/default_banner_@2x.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
      color:'颜色：银盘 棕带',price:'¥5599.00'},
      {img:require('./image/default_banner_@2x.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表adsfasdf',
      color:'颜色：银盘 棕带',price:'125555.00'},
      {img:require('./image/default_banner_@2x.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表adsfasdf',
      color:'颜色：银盘 棕带',price:'125555.00'},
      {img:require('./image/default_banner_@2x.jpg'),name:'汉密尔顿(Hamiliton)卡其海军先锋系列 自动机械男表adsfasdf',
      color:'颜色：银盘 棕带',price:'125555.00'}]
   },
   {title:'劳力士中国授权店',content:[
      {img:require('./image/default_banner_@2x.jpg'),name:'百达翡丽(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
      color:'颜色：银盘 白色',price:'1256000.00'},
      {img:require('./image/default_banner_@2x.jpg'),name:'百达翡丽(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
      color:'颜色：银盘 白色',price:'1256000.00'},
      {img:require('./image/default_banner_@2x.jpg'),name:'百达翡丽(Hamiliton)卡其海军先锋系列 自动机械男表h88475345',
      color:'颜色：银盘 白色',price:'1256000.00'},]
   },
  ];
export default class CartPage extends Component {

    constructor(props) {
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
          };
        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        let dataSource = new ListView.DataSource({
            getRowData: getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
          });
        this.state={
          dataSource: dataSource,
        };
        this._renderRow=this._renderRow.bind(this);
    }
    componentDidMount(){
        this._fetchData();
    }
    _fetchData(){
        //网络获取购物车数据
      let dataBlob = {};
      let sectionIDs = [];
      let rowIDs = [];
      //这里一定要非常注意，真正存储数据的地方只有dataBlob
      for (let ii = 0,maxI = CART_DATAS.length ; ii < maxI; ii++) {
        let sectionName = CART_DATAS[ii].title;
        sectionIDs.push(sectionName);
        dataBlob[sectionName] = sectionName;
        rowIDs[ii] = [];
        for (let jj = 0,maxJ =CART_DATAS[ii].content.length; jj < maxJ; jj++) {
          let rowName = 'S' + ii + ', R' + jj;
          rowIDs[ii].push(rowName);
          dataBlob[rowName] = CART_DATAS[ii].content[jj];
        }
      }
        this.setState({
          dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
        });
    }
    _pressItem(title:string) {
        let navigator = this.props.navigator;
        if(navigator) {
            navigator.push({
                name: title,
                component: ProductDetail,
                params: {
                    title: title,
                }
            })
        }
    }
    _onPayClick(){



    }
    _renderSeparator(
      sectionID: number | string,
      rowID: number | string,
      adjacentRowHighlighted: boolean
    ) {
      let style = styles.rowSeparator;
      if (adjacentRowHighlighted) {
          style = [style, styles.rowSeparatorHide];
      }
      return (
        <View key={'SEP_' + sectionID + '_' + rowID}  style={style}/>
      );
    }
    _renderRow(
      cart: Object,
      sectionID: number | string,
      rowID: number | string,
      highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
    ) {
      return (
        <CartCell
          onSelect={()=>this._pressItem('商品详情')}
          onHighlight={() => highlightRowFunc(sectionID, rowID)}
          onUnhighlight={() => highlightRowFunc(null, null)}
          cart={cart}
        />
      );
    }
    _renderSectionHeader(sectionData:string, sectionID:number|string){
      return (
          <View style={styles.sectionContainer}>
            <Image source={require('./image/default_banner_@2x.jpg')} style={styles.icon}/>
            <Text style={styles.sectionHeader}>
              {sectionData}
            </Text>
          </View>
          );
    }
    render() {

      let content = this.state.dataSource.getRowCount() === 0 ?
        <ActivityIndicatorIOS style={styles.scrollSpinner} />:
        <ListView
          ref="listview"
          renderSeparator={this._renderSeparator}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderSectionHeader={this._renderSectionHeader}
        />;
        return (
          <View style={{flex: 1}}>
            <View style={styles.container}>
                <Text style={{fontSize:15}}>
                  购物车
                </Text>
            </View>
            <View style={styles.separate}/>
            <View style={styles.container1}>
              {content}
            </View>
            <View  style={styles.bottom}>
              <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.bottomContainer1}>
                    <Image source={require('./image/icon_button_i_01.png')} style={styles.icon}/>
                    <Text style={[styles.text1,{color:'white',marginLeft:5}]}>全选 总金额  ¥55889.00</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.bottomContainer1}>
                <TouchableOpacity onPress={()=>this._onPayClick('')} activeOpacity={0.7}>
                    <View style={styles.bottomContainer2}>
                        <Text style={{fontSize:12,color:'white',marginLeft:8}}>结算(3)</Text>
                    </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',   // 水平排布
      justifyContent:'center',
      paddingLeft: 5,
      paddingRight: 5,
      paddingTop: 20,  // 处理iOS状态栏
      height: 60,   // 处理iOS状态栏
      backgroundColor: 'white',
      alignItems: 'center'  // 使元素垂直居中排布, 当flexDirection为column时, 为水平居中
  },
  container1:{
    flex:1,
    backgroundColor:'#F1F2F6',
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 0.5,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  sectionContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    marginTop:10,
    padding:10,
    backgroundColor:'white',
    borderWidth:0.5,
    borderColor:'#DEDEDE',
  },
  sectionHeader:{
    marginLeft:5,
    fontSize:12,
  },
  separate:{
    height:1,
    backgroundColor:'#A7A7AA',
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:45,
    backgroundColor:'#808080',
  },
  bottomContainer1:{
    flexDirection:'row',
    alignItems:'center',
    padding:10,
  },
  bottomText:{
    color:'white',
    fontSize:10,
    paddingLeft:22,
    borderRadius:2,
    paddingRight:22,
    paddingTop:11,
    paddingBottom:11,
  },

    bottomContainer2: {
        alignItems:'center',
        width:100,
        paddingBottom:10,
        paddingTop: 10,
        borderRadius:3,
        borderColor:'#F0F0F0',
        backgroundColor:'#FF4854'
    },
  icon:{
    width:13,
    height:13,
  },
  text1:{
    fontSize:12,
  },
});
