'use strict';

import React, {Component, PropTypes} from 'react';
import  {
    View,
    Text,
    Image,
    TouchableOpacity,
    ListView,
    ActivityIndicator,
    InteractionManager,
    ScrollView,
    StyleSheet,
} from 'react-native';

import UIConfigure from '../../common/UIConfigure';
import Utils from '../../common/Utils';
import Constant from '../../common/Constant';

import ProductSearchContainer from '../../product/ProductSearchContainer';

export default class GridSectionListView extends Component {

    constructor(props) {
        super(props);

        let getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        };
        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[rowID];
        };
        this.state = {
            dataSource: new ListView.DataSource({
                getRowData: getRowData,
                getSectionHeaderData: getSectionData,
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            }),
        };
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    _pressItem(title: string, categoryId: number) {
        InteractionManager.runAfterInteractions(() => {
            const {navigator} = this.props;
            navigator.push({
                name: title,
                component: ProductSearchContainer,
                params: {
                    title: title,
                    categoryId: categoryId,
                }
            })
        });
    }

    _renderItem(rowData: Array) {
        return rowData.map((item, i)=> {
            return (
                <TouchableOpacity key={i} onPress={()=>this._pressItem('搜索',item.id)} activeOpacity={0.7}>
                    <View>
                        <View style={styles.row}>
                            <Image style={styles.icon} source={{uri:Constant.httpKeys.IMAGE_API_HOST+item.pic}}/>
                            <Text style={{marginTop:5,fontSize:12,}}>
                                {item.name}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });
    }

    renderRow(rowData: Array, sectionID: string, rowID: string) {
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

    _getDataSource(resultDto: Object): ListView.DataSource {
        let dataBlob = {};
        let sectionIDs = [];
        let rowIDs = [];

        if (!Utils.isEmptyObject(resultDto.childrenList)) {
            for (let ii = 0; ii < resultDto.childrenList.length; ii++) {
                let sectionName = resultDto.childrenList[ii].name;
                sectionIDs.push(sectionName);
                dataBlob[sectionName] = sectionName;
                rowIDs[ii] = [];
                let rowData = [];
                let sectionArray = resultDto.childrenList[ii];
                if (!Utils.isEmptyObject(sectionArray.childrenList)) {
                    for (let jj = 0; jj < sectionArray.childrenList.length; jj++) {
                        rowData.push(sectionArray.childrenList[jj]);
                        if (jj !== 0 && (jj + 1) % 3 === 0 || jj == sectionArray.childrenList.length - 1) {
                            let rowName = ii + sectionName + jj;
                            rowIDs[ii].push(rowName);
                            dataBlob[rowName] = rowData;
                            rowData = [];
                        }
                    }
                }
            }
        }
        return this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
    }

    render() {
        let {resultDto}=this.props;
        if (!Utils.isEmptyObject(resultDto)) {
            return (
                <View style={styles.parent}>
                    <View style={styles.separate}/>
                    <ListView
                        style={{flex:3,paddingLeft:10,paddingRight:10}}
                        dataSource={this._getDataSource(resultDto)}
                        renderSectionHeader={this.renderSectionHeader}
                        renderRow={this.renderRow}
                        initialListSize={10}
                        pageSize={4}
                        scrollRenderAheadDistance={500}/>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    parent: {
        flex: 1,
        backgroundColor: '#F1F2F6',
    },
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    separate: {
        height: 0.5,
        backgroundColor: '#F0F0F0',
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        width: 85,
        height: 85,
        alignItems: 'center',
    },
    icon: {
        width: 48,
        height: 48,
    },

});
