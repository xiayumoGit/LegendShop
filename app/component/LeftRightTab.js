'use strict';

import React,{ Component,PropTypes } from 'react';
import  {
    View,
    Text,
    Image,
    TouchableOpacity,
    Platform,
    ListView,
    ProgressBarAndroid,
    TouchableHighlight,
    ActivityIndicator,
    ScrollView,
    StyleSheet,
} from 'react-native';

import UIConfigure from '../common/UIConfigure';


export default class LeftRightTab extends Component {

    constructor(props) {
        super(props);0

        let getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.state= {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
        };
        this.renderSectionHeader=this.renderSectionHeader.bind(this);
        this.renderRow=this.renderRow.bind(this);
    }

    _renderTab(data){
        const {tabIndex} =this.props;
        return data.map((item,i)=>{
            let picUri= 'http://react.legendshop.cn/photoserver/photo/'+item.pic;
            return (
                <TouchableOpacity key={i} activeOpacity={0.7} onPress = {()=> this._tabItemSelected(i)}>
                    <View style={styles.tabContainer}>
                        <Image style={styles.icon} source={{uri: picUri}}/>
                        <Text style={[styles.showText,tabIndex==i?styles.selectText:null]}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    _tabItemSelected(tabIndex:string){
        const {tabChanged}=this.props;
        tabChanged(tabIndex);
    }

    _itemPress(){

    }

    _renderItem(rowData: Array){
        return rowData.map((item,i)=>{
            return (
                <TouchableOpacity key={i} onPress={()=>this._itemPress()} activeOpacity={0.7}>
                    <View>
                        <View style={styles.row}>
                            <Image style={styles.icon} source={require('../image/icon_home_center_tag1_@2x.png')} />
                            <Text style={{marginTop:5,fontSize:12,}}>
                                {rowData[i].name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    renderRow(rowData: Array, sectionID: string, rowID: string){
        return (
           <View style={{flexDirection:'row',backgroundColor:'white'}}>
               {this._renderItem(rowData)}
           </View>
        );
    }


    renderSectionHeader(sectionData: string, sectionID: string) {
        return (
            <View style={{padding:8,backgroundColor:UIConfigure.home.defaultBgColor}}>
                <Text style={styles.text}>
                    {sectionData}
                </Text>
            </View>
        );
    }

    _getDataSource(resultDto: Array<any>,tabIndex:number): ListView.DataSource {
        let dataBlob = {};
        let sectionIDs = [];
        let rowIDs = [];
        for (let ii = 0; ii < resultDto[tabIndex].childrenList.length; ii++) {
            let sectionName = resultDto[tabIndex].childrenList[ii].name;
            sectionIDs.push(sectionName);
            dataBlob[sectionName] = sectionName;
            rowIDs[ii] = [];
            let rowData=[];
            let sectionArray= resultDto[tabIndex].childrenList[ii];
            for (let jj = 0; jj <sectionArray.childrenList.length; jj++) {
                rowData.push(sectionArray.childrenList[jj]);
                if(jj!==0&&(jj+1)%3===0||jj==sectionArray.childrenList.length-1){
                    let rowName = ii+sectionName+jj;
                    rowIDs[ii].push(rowName);
                    dataBlob[rowName] = rowData;
                    rowData=[];
                }
            }
        }
        return this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    }

    render() {
        let {tabIndex,resultDto}=this.props;
        if(resultDto.length>0){
            return (
                <View style={styles.parent}>
                    <View style={styles.separate}/>
                    <View style={styles.container}>
                        <ScrollView style={styles.scroll}>
                            {this._renderTab(resultDto,tabIndex)}
                        </ScrollView>
                        <ListView
                            style={{flex:3,paddingLeft:10,paddingRight:10}}
                            dataSource={this._getDataSource(resultDto,tabIndex)}
                            renderSectionHeader={this.renderSectionHeader}
                            renderRow={this.renderRow}
                            initialListSize={10}
                            pageSize={4}
                            scrollRenderAheadDistance={500}
                        />
                    </View>
                </View>
            );
        }else{
            return <ActivityIndicator style={styles.scrollSpinner}/>;
        }
    }
}

const styles = StyleSheet.create({

    parent:{
        flex:1,
        backgroundColor:'#F1F2F6',
    },
    container:{
        flex:1,
        flexDirection:'row',
    },
    separate:{
        height:0.5,
        backgroundColor:'#F0F0F0',
    },
    tabContainer:{
        alignItems:'center',
        flex:1,
        paddingTop:5,
        paddingBottom:5,
        borderRightWidth:0.5,
        borderBottomWidth:0.5,
        borderColor:'#F0F0F0',
        backgroundColor:'#ffff',
    },
    row: {
        flex:1,
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width: 85,
        height: 85,
        alignItems: 'center',
    },
    scroll:{
        flex:1,
    },
    icon: {
        width: 48,
        height: 48,
    },
    showText: {
        fontSize: 12,
        color:UIConfigure.category.categoryTabColor,
    },
    selectText:{
        fontSize: 12,
        color:UIConfigure.category.categoryTabSelectColor,
    },
    scrollSpinner: {
        marginVertical: 20,
    },
});
