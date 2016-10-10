'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  ActivityIndicator,
  ListView,
  Platform,
  ProgressBarAndroid,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import ProductCell from './ProductCell';
import ProductDetailContainer from './ProductDetailContainer';

export default class ProductListView extends Component{

 constructor(props) {
    super(props);
    this.state={
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
    };
    this._renderFooter=this._renderFooter.bind(this);
    this._onEndReached=this._onEndReached.bind(this);
    this._renderRow=this._renderRow.bind(this);
  }
  componentDidMount() {
     const{condition,loadingStatuses,queryNumbers,tabIndex,searchProduct}=this.props;
     searchProduct(condition,loadingStatuses,queryNumbers,tabIndex);
  }
  _onEndReached(){
      console.log('tag','_onEndReached');
      const {resultDto,condition,loadingStatuses,queryNumbers,tabIndex,fetchSearchResult} =this.props;
      /**
       * 这两种情况一定要return，正在下拉加载的时候以及第一次已经加载完全部数据
       */
      if(loadingStatuses[tabIndex]===0)return;
      if(resultDto.length<10)return;
      fetchSearchResult(condition,loadingStatuses,queryNumbers,tabIndex);
  }

  _getDataSource(data: Array<any>): ListView.DataSource {
    return this.state.dataSource.cloneWithRows(data);
  }

  _pressItem(title:string,prodId:number) {
     const {navigator} = this.props;
       navigator.push({
           name: title,
           component: ProductDetailContainer,
           params: {
                title:title,
                prodId:prodId,
            }
       })
  }

  _renderFooter(){
    return <ActivityIndicator size={Platform.OS ==='ios'?'small':'large'} style={styles.scrollSpinner}/>;
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
    const {loadingStatuses,tabIndex,resultDto}=this.props;
    let content;
    switch (loadingStatuses[tabIndex]) {
      case 0:
      content = <ActivityIndicator size={Platform.OS ==='ios'?'small':'large'} style={styles.scrollSpinner}/>;
      break;
      case 1:
      content = <ListView
                  renderSeparator={this._renderSeparator}
                  dataSource={this._getDataSource(resultDto)}
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
