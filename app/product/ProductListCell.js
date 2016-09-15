'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  ActivityIndicatorIOS,
  ListView,
  Platform,
  ProgressBarAndroid,
  InteractionManager,
  StyleSheet,
  Alert,
  Text,
  View,
} from 'react-native';

import ProductCell from './ProductCell';
import ProductDetail from './ProductDetail';
import Back from '../component/Back';

import Constant from '../common/Constant';
import Utils from '../common/Utils';

/*
  dataForQuery:以keword为key，存储对应的缓存缓存数据
  nextPageNumberForQuery:以keword为key，存储当前缓存对应的页面数
  loadingStateForQuery:以keword为key，存储对应的加载完所有数据的状态
*/

let resultsCache = {
  dataForQuery: {},
  nextPageNumberForQuery: {},
  loadingStateForQuery: {},
};

export default class ProductListCell extends Component{

 constructor(props) {
    super(props);
    this.state={
      loading: 0,//0是正在loading，－1返回错误，1返回正确
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      filter: '',
      queryNumber: 0,
    };
    this._renderFooter=this._renderFooter.bind(this);
    this._onEndReached=this._onEndReached.bind(this);
    this._renderRow=this._renderRow.bind(this);
  }
  //初始化渲染之后立即调用，这里可以进行网络请求等逻辑
  componentDidMount() {
    console.log('tag','componentDidMount');
    InteractionManager.runAfterInteractions(() => {
      console.log('tag','keyword='+this.props.keyword);
      if(this.props.keyword){
          this._searchProduct('keyword='+this.props.keyword + '&' + 'orderBy=' + this.props.orderBy);
      }else{
          this.setState({
              loading: -1,
          });
        }
    });
  }

  //接到新的渲染指令后调用，这里调用setState不会二次渲染
  componentWillReceiveProps(nextProps){
   console.log('tag','componentWillReceiveProps');
    if(nextProps.keyword!==this.props.keyword||nextProps.orderBy!==this.props.orderBy){
      InteractionManager.runAfterInteractions(() => {
        this.setState({
              queryNumber: 0,
        });
        this._searchProduct('keyword='+this.props.keyword + '&' + 'orderBy=' + this.props.orderBy);
      });
    }
  }
  //防止重复渲染
  // shouldComponentUpdate(nextProps, nextState){
    // console.log('tag','shouldComponentUpdate');
    // return nextProps.keyword !== this.props.keyword;
  // }

  _fetchProduct(query){

    let data = query+'&'+'pageSize='+10+'&'+'page='+this.state.queryNumber;
    console.log('tag','搜索参数＝'+data);

     Utils.httpPostForm(Constant.httpKeys.HOST+Constant.httpKeys.SEARCH_API_KEY,data,
         (response) => {
                //  this.props.onLoading();
                 resultsCache.nextPageNumberForQuery[query] =this.state.queryNumber;//页码增加
                 let cacheData = resultsCache.dataForQuery[query];
                 //如果为空，则属于第一页，当前属于网络获取
                 if(!cacheData){
                      cacheData=response.resultList;
                 }else{
                        for (let i in response.resultList) {
                            cacheData.push(response.resultList[i]);
                        }
                 }
                 resultsCache.dataForQuery[query]=cacheData;
                 this.setState({
                       loading: 1,
                       dataSource: this._getDataSource(resultsCache.dataForQuery[query]),
                 });

           }, (error) => {
                //  this.props.onLoading();
                 console.log('_searchProduct error: ' + error);
                     Alert.alert('查询数据失败','错误信息＝'+error)
                     this.setState({
                           loading: -1,
                           dataSource: [],
                     });
           });
  }

  _searchProduct(query: string){
    this.setState({filter: query,loading:0});
    //如果缓存存在数据则直接进心render并返回
    let cacheData = resultsCache.dataForQuery[query];
    if (cacheData) {
            this.setState({
              dataSource: this._getDataSource(cacheData),
              queryNumber:resultsCache.nextPageNumberForQuery[query],
              loading: 1,
            });
            // this.props.onLoading();
    }else{
        this.setState({
          queryNumber: this.state.queryNumber + 1,
        });
        this._fetchProduct(query);
    }
  }
  _onEndReached(){
    if (this.state.loading===0) {
      return;
    }
    console.log('tag','_onEndReached');
      //如果存在上拉加载则肯定是从网络获取
      InteractionManager.runAfterInteractions(() => {
        this.setState({
          queryNumber: this.state.queryNumber + 1,
        });
        this._fetchProduct('keyword='+this.props.keyword + '&' + 'orderBy=' + this.props.orderBy);
      });
  }

  _getDataSource(data: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(data);
  }

  _pressItem(title:string,prodId:number) {
     let navigator = this.props.navigator;
       navigator.push({
           name: title,
           component: ProductDetail,
           params: {
                title:title,
                prodId:prodId,
            }
       })
  }

  _renderFooter(){
    return  Platform.OS === 'ios'? <ActivityIndicatorIOS style={styles.scrollSpinner}/>:
            <ProgressBarAndroid styleAttr="Inverse" />;
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
    product: Object,
    sectionID: number | string,
    rowID: number | string,
    highlightRowFunc: (sectionID: ?number | string, rowID: ?number | string) => void,
  ) {
    return (
      <ProductCell
        onSelect={()=>this._pressItem('商品详情',product.prodId)}
        onHighlight={() => highlightRowFunc(sectionID, rowID)}
        onUnhighlight={() => highlightRowFunc(null, null)}
        product={product}
      />
    );
  }
  render(){
    //注：因为新版本上拉加载更多，需要Threshold值
    console.log('tag','render');
    let content;
    switch (this.state.loading) {
      case 0:
      content = Platform.OS === 'ios'? <ActivityIndicatorIOS style={styles.scrollSpinner}/>:
          <ProgressBarAndroid styleAttr="Inverse" style={{marginTop: 50}}/>;
      break;
      case 1:
      content = <ListView
                  ref="listview"
                  renderSeparator={this._renderSeparator}
                  dataSource={this.state.dataSource}
                  renderFooter={this._renderFooter}
                  renderRow={this._renderRow}
                  onEndReached={this._onEndReached}
                  onEndReachedThreshold={10}
                  automaticallyAdjustContentInsets={false}
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps={true}
                  showsVerticalScrollIndicator={false}
                  />;
      break;
      case -1:
      content = <View style={styles.noContent}>
                <Text style={{fontSize:15}}>
                    暂无内容
                </Text>
              </View>;
      break;
    }

    return (
          <View style={{flex:1,backgroundColor:'#F1F2F6'}}>
            {content}
          </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:64,
    backgroundColor: 'white',
  },
  centerText: {
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
  },
  scrollSpinner: {
    marginVertical: 20,
  },
  rowSeparator: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    height: 0.5,
    marginLeft: 4,
  },
  rowSeparatorHide: {
    opacity: 0.0,
  },
  noContent:{
    flex:1,
    flexDirection:'row',
    backgroundColor:'white',
    justifyContent:'center',
    alignItems:'center',
  },
});
