import React, { PureComponent } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    Image,
    StyleSheet,
    FlatList,
   } from 'react-native';

import { hp, wp, debounce, colors, connect } from './../Asset/Libraries/index';
import { MenuAction } from './../Redux/Actions/MenuAction';
class MyCart extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuPopup: false,
            starter: false,
            mainCourse: false,
            dessert: false,
            drinks: false
        }
        this._didFocusSubscription = props.navigation.addListener(
            'didFocus',
            payload =>
                BackHandler.addEventListener(
                    'hardwareBackPress',
                    this.onBackButtonPressAndroid
                )
        );
    }

    componentDidMount() {
        this.props.MenuAction('getList')
        this._willBlurSubscription = this.props.navigation.addListener(
            'willBlur',
            payload =>
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    this.onBackButtonPressAndroid
                )
        );

    }

    addItems() {
        alert('add')
    }
    removeItems() {
        alert('remove')
    }
    myCart() {
        this.props.navigation.navigate('MyCart')
    }
    onBackButtonPressAndroid = () => {
        BackHandler.exitApp()
        // this.props.navigation.goBack()
        // return true;
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    render() {
        const { menuList } = this.props.CommonReducer
        return (

            <View style={{flex: 1, backgroundColor: colors.white}}>
                <View style={{ height: hp('30%'), width: wp('100%'), alignSelf: 'center', backgroundColor: colors.theme }}>
                    <View style={{ height: hp('8%'), flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'trasparent' }}>
                            <Image source={require('./../Asset/Images/left-arrow.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.white }} />
                        </TouchableOpacity>
                        <View style={{ flex: 9, justifyContent: 'center' }}>
                            <Text style={{ fontSize: hp('3%'), color: colors.white, fontWeight: 'bold', paddingLeft: wp('6%') }}>My Cart</Text>
                        </View>
                    </View>
                    <View style={{ height: hp('21%'), justifyContent: 'center' }}>
                        <View style={{ height: hp('12%'), width: wp('40%'), alignSelf: 'center', borderRadius: 3, backgroundColor: colors.white }}>
                            <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: hp('2.6%'), color: colors.secondaryColor }}>Total Cost</Text>
                            </View>
                            <View style={{ flex: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Image source={require('./../Asset/Images/euro.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.black }} />
                                <Text style={{ fontSize: hp('3%'), color: colors.black }}>36.00</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1, width: wp('95%'), alignSelf: 'center', marginBottom: hp('1%') }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontSize: hp('3%'), color: colors.black, fontWeight: 'bold', paddingLeft: wp('2%') }}>Starter</Text>
                    </View>
                    <View style={{ flex: 8 }}>
                        <FlatList
                            data={menuList}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: hp('1%'), borderBottomColor: colors.theme, borderBottomWidth: hp('0.1%') }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <View style={{ height: hp('4%'), width: wp('5%'), justifyContent: 'center', alignItems: 'center', borderWidth: wp('0.4%'), borderColor: colors.theme, marginTop: hp('2%'), borderRadius: wp('1%') }}>
                                            <Text style={{ fontSize: hp('2.6%'), color: colors.theme }}>N</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center', paddingLeft: wp('2%') }}>
                                        <View style={{ height: hp('4%'), justifyContent: 'center' }}>
                                            <Text style={{ fontSize: hp('2.6%'), color: colors.theme }}>{item.title}</Text>
                                        </View>
                                        <View style={{ height: hp('6%'), justifyContent: 'center' }}>
                                            <Text style={{ fontSize: hp('2.4%'), color: colors.theme }}>{item.items}</Text>
                                        </View>
                                        <View style={{ height: hp('5%'), flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <Image source={require('./../Asset/Images/euro.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.secondaryColor }} />
                                            <Text style={{ fontSize: hp('2.6%'), color: colors.secondaryColor }}>{item.price}</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 3, alignItems: 'center' }}>
                                        <View style={{ height: hp('5%'), width: wp('24%'), flexDirection: 'row', borderWidth: hp('0.2%'), borderColor: colors.secondaryColor }}>
                                            <TouchableOpacity onPress={() => this.addItems()} style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ height: hp('2.2%'), width: hp('2.2%') }} source={require('./../Asset/Images/add.png')}></Image>
                                            </TouchableOpacity>
                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: hp('2.6%'), color: colors.black }}>10</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.removeItems()} style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ height: hp('2.3%'), width: hp('2.3%') }} source={require('./../Asset/Images/subtraction.png')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ height: hp('6'), width: wp('24%'), justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                            <Image source={require('./../Asset/Images/comment.png')} style={{ height: hp('4%'), width: hp('4%'), tintColor: colors.theme }} />
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>
                <TouchableOpacity onPress={() => this.myCart()} style={{ height: hp('8%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.theme }}>
                    <Text style={{ color: colors.white, fontSize: hp('2.5%'), paddingLeft: wp('2%') }}>PLACE ORDER</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        CommonReducer: state.CommonReducer
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        MenuAction: (list) => {
            dispatch(MenuAction(list));
        },
        AddAction: (action) => {
            dispatch(AddAction(action));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCart);
