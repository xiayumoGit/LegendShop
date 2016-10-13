'use strict';

import {Set} from 'immutable';
import React, {PropTypes} from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text,
    ScrollView,
} from 'react-native';
import IndicatorNavigatorItem from './IndicatorNavigatorItem';

export default class IndicatorNavigator extends React.Component {

    static propTypes = {
        ...View.propTypes,
        sceneStyle: View.propTypes.style,
        tabBarStyle: View.propTypes.style,
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            renderedSceneKeys: this._updateRenderedSceneKeys(props.children),
        };

        this._renderTab = this._renderTab.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        console.log('tag', 'componentWillReceiveProps');
        let {renderedSceneKeys} = this.state;
        this.setState({
            renderedSceneKeys: this._updateRenderedSceneKeys(
                nextProps.children,
                renderedSceneKeys,
            ),
        });
    }

    _getSceneKey(item, index): string {
        return `scene-${(item.key !== null) ? item.key : index}`;
    }

    _updateRenderedSceneKeys(children, oldSceneKeys = Set()): Set {
        let newSceneKeys = Set().asMutable();
        React.Children.forEach(children, (item, index) => {
            let key = this._getSceneKey(item, index);
            if (oldSceneKeys.has(key) || item.props.selected) {
                newSceneKeys.add(key);
            }
        });
        return newSceneKeys.asImmutable();
    }

    render() {
        console.log('tag', 'render');
        let {style, children, tabBarStyle, sceneStyle, ...props} = this.props;
        let scenes = [];
        React.Children.forEach(children, (item, index) => {
            let sceneKey = this._getSceneKey(item, index);
            if (!this.state.renderedSceneKeys.has(sceneKey)) {
                return;
            }
            let {selected} = item.props;
            let scene =
                <SceneContainer key={sceneKey} selected={selected} style={sceneStyle}>
                    {item}
                </SceneContainer>;
            scenes.push(scene);
        });

        return (
            <View {...props} style={[styles.container, style]}>
                {scenes}
                <View style={[styles.tabContainer,tabBarStyle]}>
                    {React.Children.map(children, this._renderTab)}
                </View>
            </View>
        );
    }

    _renderTab(item) {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={item.props.onPress}>
                <View style={{alignItems:'center',paddingTop:15}}>
                    <Text style={[styles.defaultText,item.props.selected?
                        item.props.selectedTitleStyle:item.props.titleStyle]}>{item.props.title}</Text>
                    <View style={[styles.defaultLine,item.props.selected?
                    item.props.selectLineStyle:item.props.lineStyle]}/>
                </View>
            </TouchableOpacity>
        );
    }
}
/**
 * 控制透明度，所以每次都执行render
 */
class SceneContainer extends React.Component {
    static propTypes = {
        ...View.propTypes,
        selected: PropTypes.bool,
    };

    render() {
        /**
         * 通过选中和未选中来实现当前容器的显示和不显示
         */
        let {selected, ...props} = this.props;
        return (
            <View
                {...props}
                pointerEvents={selected ? 'auto' : 'none'}
                removeClippedSubviews={!selected}
                style={[
          styles.sceneContainer,
          selected ? null : styles.hiddenSceneContainer,
          props.style,
        ]}>
                <StaticContainer shouldUpdate={selected}>
                    {this.props.children}
                </StaticContainer>
            </View>
        );
    }
}
/**
 * 做为真正的内容载体，可以根据shouldComponentUpdate来决定是否渲染以及缓存
 * 如果类似分类页面的静态加载，这里可以直接返回false，数据由父组件获取后直接传递
 * 如果类似搜索页面的本页面可能修改state，则返回!!nextProps.shouldUpdate来
 * 决定是否对自身进行render来重绘改动后的页面，这一点非常非常重要，可以对页面的
 * 渲染机制和缓存机制进行掌握
 */
class StaticContainer extends React.Component {

    static propTypes = {
        shouldUpdate: PropTypes.bool,
    };

    shouldComponentUpdate(nextProps: Object): boolean {
        return !!nextProps.shouldUpdate;
    }

    render() {
        let {children} = this.props;
        return children ? React.Children.only(children) : null;
    }

}


let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    sceneContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    hiddenSceneContainer: {
        overflow: 'hidden',
        opacity: 0,
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white'
    },
    defaultText: {
        fontSize: 16,
        color: '#6E6E6E',
    },
    defaultLine: {
        backgroundColor: 'transparent',
        height: 2,
        marginTop: 10,
        width: 75,
    },
});

IndicatorNavigator.Item = IndicatorNavigatorItem;
