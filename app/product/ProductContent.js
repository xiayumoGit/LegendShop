
'use strict';

import React,{ Component,PropTypes } from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import Back from '../component/Back';
import Swiper from 'react-native-swiper';
import OrderCommit from '../order/OrderCommit';

//详情具体展示页面，这里需要处理四种对应的组件变化状态
//prodProp属性变化，item选中变化，数量选中变化，评论区数据变化

export default class ProductContent extends Component{

  constructor(props) {
     super(props);
     this.state={
       prodProps:null,
       num:1,
       commentData:null,
     };
  }

  // _renderProdProps(data){
  //   return data.map((item,i)=>{
  //     return (
  //         <View key={i} style={{flex:1,flexDirection:'row',alignItems:'center',marginTop:10}}>
  //           <Text style={[styles.text1,{marginRight:5}]}>{item.propName}</Text>
  //           {this._renderProdPropsItem(item.prodPropValList)}
  //         </View>
  //        )
  //   });
  // }

  // _handleClick(data,i){
  //     let prodProps=this.state.prodProps;
  //     for(let ii=0;ii<data.length;ii++){
  //         data[ii].isSelected=false;
  //         if(ii===i){
  //           data[ii].isSelected=true;
  //           prodProps+=data[ii].name;
  //         }
  //     }
  //     this.setState({
  //       prodProps:prodProps,
  //     });
  //
  // }

  // _renderProdPropsItem(data){
  //   return data.map((item,i)=>{
  //     return (
  //       <TouchableOpacity key={i} onPress={()=>this._handleClick(data,i)}>
  //         <Text style={[styles.text2,styles.border,
  //             item.isSelected?{borderColor:'#FF303D',color:'#FF303D'}
  //                            :{borderColor:'black',color:'black'}]}>
  //           {item.name}
  //         </Text>
  //         </TouchableOpacity>
  //        )
  //   });
  // }
  _handleMinus(){
    let num=this.state.num;
    if(num!==0){
        num-=1;
        this.setState({
          num:num,
        });
    }
  }
  _handlePlus(){
    let num=this.state.num;
    num+=1;
    this.setState({
      num:num,
    });

  }
  // _getDefaultProdProps(data){
  //   let defaultProdProps='';
  //   let prodPropListParent=data.prodPropList;
  //   for(let ii=0;ii<prodPropListParent.length;ii++){
  //       let prodPropListChild=prodPropListParent[ii].prodPropValList;
  //       for(let jj=0;jj<prodPropListChild.length;jj++){
  //           if(prodPropListChild[jj].isSelected)defaultProdProps+=prodPropListChild[jj].name+'  ';
  //       }
  //   }
  //   return defaultProdProps;
  // }

  render() {
    // let dataSource=this.props.dataSource;
    let defaultProdProps='this._getDefaultProdProps(dataSource)';
    return (
      <ScrollView>
        <Swiper style={styles.wrapper} height={200}
                paginationStyle={styles.paginationStyle}
                loop={true}>
              <Image  source={require('./img/product_banner1_@2x.jpg')}/>
              <Image  source={require('./img/product_banner1_@2x.jpg')}/>
              <Image  source={require('./img/product_banner1_@2x.jpg')}/>
        </Swiper>

        <View style={styles.container1}>
           <Text style={styles.text1}>{'dataSource.name'}</Text>
           <Text style={[styles.text2,{marginTop:10,marginBottom:10}]}>{'¥'+'dataSource.cash'}</Text>
           <Text style={styles.text1}>{'原价：¥'+'dataSource.price'}</Text>
        </View>

        <View style={styles.container1}>
           <Text style={styles.text1}>{'已选  '+defaultProdProps}</Text>
           <View style={styles.container2}>
              <Text style={styles.text1}>数量</Text>
              <View style={styles.container3}>
                <Text style={[styles.text1,styles.border1]} onPress={()=>this._handleMinus()}>-</Text>
                <Text style={[styles.text1,styles.border1]}>{this.state.num}</Text>
                <Text style={[styles.text1,styles.border1]} onPress={()=>this._handlePlus()}>+</Text>
              </View>
           </View>
         </View>

         <View style={styles.container1}>
            <Text style={styles.text1}>送货至 广东广州市</Text>
            <Text style={[styles.text1,{marginTop:10,marginBottom:10}]}>现货，广州城区12:00前完成订单，预计当日（11月28日）送达</Text>
            <View style={[styles.container3,{marginLeft:0}]}>
              <View style={[styles.container4,styles.border,{marginLeft:0}]}>
                <Image source={require('./img/icon_commodity_cod.png')} style={styles.img}/>
                <Text style={[styles.text1,{marginLeft:5}]}>货到付款</Text>
              </View>
              <View style={[styles.container4,styles.border]}>
                <Image source={require('./img/icon_commodity_free.png')} style={styles.img}/>
                <Text style={[styles.text1,{marginLeft:5}]}>免运费</Text>
              </View>
            </View>
         </View>

        <View style={styles.container1}>
           <Text style={styles.text1}>主体</Text>
           <Text style={[styles.text1,{marginTop:10,marginBottom:10}]}>型号 VW510L</Text>
            <Text style={[styles.text1,{marginBottom:10}]}>颜色 黑色</Text>
           <Text style={styles.text1}>系统 Windows7</Text>
        </View>

        <View style={styles.container1}>
           <Text style={[styles.text1,{marginTop:10,marginBottom:10}]}>型号 VW510L\n 山东发送到发送到发送到 </Text>
        </View>

      </ScrollView>

    );
  }
}
const styles = StyleSheet.create({
  container1:{
    backgroundColor:'white',
    marginTop:10,
    padding:10,
  },
  container2:{
    flex:1,
    flexDirection:'row',
    marginTop:10,
    marginBottom:10,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  container3:{
    flex:1,
    flexDirection:'row',
    marginLeft:10,
    justifyContent:'flex-start',
    alignItems:'center',
  },
  container4:{
    flexDirection:'row',
    marginLeft:10,
    alignItems:'center',
  },
  wrapper: {
    flex:1,
    backgroundColor:'white',
    marginTop:10,
  },
  paginationStyle:{
    bottom: 5,
  },
  text2:{
    color:'#FF303D',
    fontWeight:'100',
    fontSize:10,
  },
  text1:{
    fontSize:10,
  },
  border:{
    borderWidth:0.5,
    padding:2,
    marginLeft:5,
    marginRight:5,
    borderRadius: 4,  // 设置圆角边
    borderColor:'#FF303D',
  },
  border1:{
    borderWidth:0.5,
    paddingLeft:12,
    paddingRight:12,
    paddingTop:3,
    paddingBottom:3,
    borderRadius: 2,  // 设置圆角边
    borderColor:'#DEDEDE',
  },
  img:{
    width:12,
    height:12,
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
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
  icon:{
    width:15,
    height:13,
  }
});
