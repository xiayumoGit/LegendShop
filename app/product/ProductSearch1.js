'use strict';

import React,{ Component } from 'react';
import {
    StyleSheet,
    View,
    Platform,
    TextInput,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import ProductSearchContainer from './ProductSearchContainer';
import UIConfigure from '../common/UIConfigure';

let currentKeyword='';

export default class ProductSearch1 extends Component{

    componentDidMount() {
       const {getKeywords} =this.props;
        getKeywords();
    }

    _onSearch(){
        this._addSearchKeyword(currentKeyword);
    }

    _onBackPress() {
        this.props.navigator.pop();
    }

    /**
     * 保存搜索纪录
     * @param keyword
     * @private
     */
    _addSearchKeyword(keyword:String){
            const {navigator} = this.props;
            navigator.push({
                component: ProductSearchContainer,
                params: {keyword:keyword},
            })
            if(keyword.length>0){
                const {addKeywords} =this.props;
                addKeywords(keyword);
            }
    }

    _itemPress(keyword:String){
        const {navigator} = this.props;
            navigator.push({
            component: ProductSearchContainer,
            params: {keyword:keyword},
        })
    }

    _renderItem(data:Array){
        return data.map((item,i)=>{
            return (
                <TouchableOpacity key={i} onPress={()=>this._itemPress(item)} activeOpacity={0.7}>
                    <View style={styles.itemContainer}>
                        <Text>{item}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    _clearSearchKeywords(){
        const {clearKeywords} =this.props;
        clearKeywords();
    }

    render(){
        const {keywords}=this.props;
        return (
            <ScrollView style={{flex:1,backgroundColor:UIConfigure.search.defaultBgColor}}
                        keyboardShouldPersistTaps={false}>
            <View style={{flex: 1,backgroundColor:UIConfigure.search.defaultBgColor}}>
                <View style={styles.container}>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onBackPress()}>
                        <View >
                            <Image source={require('../image/ic_arrow_back_black_@2x.png')}/>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.searchBox}>
                        <Image source={require('../image/lib_story_img_search_bt_@2x.png')} style={styles.searchIcon}/>
                        <TextInput
                            keyboardType='web-search'
                            onEndEditing={(event) =>{
                            currentKeyword=event.nativeEvent.text;
                                }
                            }
                            onSubmitEditing={(event) =>{
                            console.log('tag','word='+event.nativeEvent.text);
                            this._addSearchKeyword(event.nativeEvent.text);
                                }
                            }
                            multiline={false}
                            placeholder='搜索...'
                            style={styles.inputText}/>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this._onSearch()}>
                        <Text style={{fontSize:13,marginRight:5}}>
                            搜索
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.separate}/>
                <View style={styles.historyContainer}>
                    <Text style={{color:'black',fontSize:15}}>搜索历史</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={()=>this._clearSearchKeywords()}>
                        <Text style={{color:'rgb(75,184,248)',fontSize:14}}>清除</Text>
                    </TouchableOpacity>
                </View>

                <View style={{height:75,flexDirection:'row',flexWrap:'wrap',paddingTop:15,paddingBottom:15,}}>
                    {this._renderItem(keywords)}
                 </View>
            </View>
                </ScrollView>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent:'space-between',
        paddingTop: UIConfigure.search.statusBarHeight,
        height: UIConfigure.search.navigationBarHeight,
        alignItems: 'center'
    },
    historyContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'white',
        padding:10,
    },
    itemContainer:{
        height:UIConfigure.search.searchRecodeItemHeight,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:10,
        paddingRight:10,
        marginLeft:10
    },
    searchBox: {
        height:  UIConfigure.search.searchBoxHeight,
        flexDirection: 'row',
        flex: 1,
        borderRadius: 3,
        backgroundColor: 'white',
        borderWidth:0.5,
        borderColor:'#DEDEDE',
        alignItems:'center',
        marginLeft: 10,
        marginRight: 10,
    },
    scanIcon: {
        height: 17,
        width: 17,
        resizeMode: 'stretch'
    },
    searchIcon: {
        marginLeft: 6,
        marginRight: 6,
        width: 10,
        height: 10,
        resizeMode: 'stretch'
    },
    separate:{
        height:1,
        backgroundColor:'#A7A7AA',
    },
    inputText: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: 12
    },

});
