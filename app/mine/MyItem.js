
'use strict';

import React,{ Component,PropTypes } from 'react';
import  {
  View,
  Text,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const ITEMS = [{
  img : require('./img/icon_my_comments.png'),
  txt1 : '我的评价',
  txt2 : '',
},{
  img : require('./img/icon_recommend.png'),
  txt1 : '最新推荐',
  txt2 : '',
},{
  img : require('./img/icon_help.png'),
  txt1 : '问题咨询',
  txt2 : '',
},{
  img : require('./img/icon_feedback.png'),
  txt1 : '意见反馈',
  txt2 : '',
}
];


export default class MyItem extends Component {

    static propTypes = {
        data: PropTypes.object,  // Tag
    };

    constructor(props) {
        super(props);
    }

    _onClickItem(){

    }

    _renderItems(data){
      return data.map((item,i)=>{
        let top=0;
        if(i==0||i==2)top=6;
        return (
              <View key={i}>
                <TouchableHighlight underlayColor='#E8E8E8'>
                    <View style={[styles.container,{marginTop:top}]}>
                       <View style={styles.container1}>
                        <Image source={item.img} style={styles.image}/>
                        <Text style={styles.text1}>
                          {item.txt1}
                        </Text>
                       </View>
                       <View style={styles.container2}>
                        <Text style={styles.text2}>
                          {item.txt2}
                        </Text>
                        <Image source={require('./img/icon_arrow_right.png')} style={styles.litleImage}/>
                       </View>
                     </View>
                 </TouchableHighlight>
                 <View style={styles.separate}/>
               </View>
           )
      });
    }

    render() {
        return (
          <View style={{flex:1}}>
            {this._renderItems(ITEMS)}
          </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    paddingTop:8,
    paddingBottom:8,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:'white'
  },
  container1:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start',
  },
  container2:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end',
  },
  separate:{
    height:0.5,
    backgroundColor:'#F0F0F0',
  },
  image:{
    width:15,
    height:15,
  },
  litleImage:{
    width:8,
    height:6,
  },
  text1:{
    marginLeft:5,
    fontSize:12,
    color:'#6C656C',
  },
  text2:{
    marginRight:5,
    fontSize:12,
    color:'#6C656C',
  },
});
