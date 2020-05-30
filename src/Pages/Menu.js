import React, { PureComponent } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    BackHandler,
    Image,
    Modal,
    TouchableWithoutFeedback,
    StyleSheet,
    FlatList,
    TouchableHighlight
} from 'react-native';

import { MenuAction } from './../Redux/Actions/MenuAction';
import { AddAction } from './../Redux/Actions/AddAction';
import { hp, wp, debounce, colors, connect } from './../Asset/Libraries/index';

class Menu extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            menuPopup: false,
            starter: true,
            mainCourse: false,
            dessert: false,
            drinks: false,
            count: 0
        }
        this.myCart = debounce(this.myCart.bind(this), 1000, {
            leading: true,
            trailing: false,
        });
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
    menuOptions = () => {
        //function to handle click on floating Action Button
        // Alert.alert('Floating Button Clicked');
        this.setState({
            menuPopup: true
        })
    }

    selectOption(options) {
        // alert(options)
        if (options == 'Starter') {
            this.setState({
                starter: true,
                mainCourse: false,
                dessert: false,
                drinks: false
            })
        } else if (options == 'MainCourse') {
            this.setState({
                starter: false,
                mainCourse: true,
                dessert: false,
                drinks: false
            })

        } else if (options == 'Dessert') {
            this.setState({
                starter: false,
                mainCourse: false,
                dessert: true,
                drinks: false
            })
        } else {
            this.setState({
                starter: false,
                mainCourse: false,
                dessert: false,
                drinks: true
            })
        }
    }

    addItems(action) {
        // this.props.AddAction('increment')
        // console.error(this.state.count)
        this.setState({
            count: ++this.state.count
        })
    }
    removeItems(action) {
        this.props.AddAction(action)
    }
    myCart() {
        this.props.navigation.navigate('MyCart')
    }
    onBackButtonPressAndroid = () => {
        BackHandler.exitApp()
    };

    componentWillUnmount() {
        this._didFocusSubscription && this._didFocusSubscription.remove();
        this._willBlurSubscription && this._willBlurSubscription.remove();
    }

    render() {
        const { menuList } = this.props.CommonReducer
        return (

            <View style={{flex: 1, backgroundColor: colors.white}}>
                <View style={{ height: hp('25%'), width: wp('100%'), alignSelf: 'center' }}>
                    <Image source={require('./../Asset/Images/hotel.png')} style={{ height: hp('25%'), width: wp('100%'), position: 'absolute' }} />
                    <View style={{ height: hp('8%'), flexDirection: 'row' }}>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'trasparent' }}>
                            <Image source={require('./../Asset/Images/left-arrow.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.white }} />
                        </TouchableOpacity>
                        <View style={{ flex: 7, backgroundColor: 'trasparent' }}></View>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'trasparent' }}>
                            <Image source={require('./../Asset/Images/upload.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.white }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'trasparent' }}>
                            <Image source={require('./../Asset/Images/information.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.white }} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ height: hp('20%') }}></View>

                <View style={{ flex: 1, width: wp('95%'), alignSelf: 'center', marginBottom: hp('2%') }}>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ fontSize: hp('3%'), color: colors.black, fontWeight: 'bold', paddingLeft: wp('2%') }}>{this.state.starter == true ? 'Starter' : this.state.mainCourse == true ? 'Main Course' : this.state.dessert == true ? 'Dessert' : 'Drinks'}</Text>
                    </View>
                    <View style={{ flex: 8 }}>
                        <FlatList
                            data={menuList}
                            renderItem={({ item, index }) => (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <View style={{ height: hp('4%'), width: wp('5%'), justifyContent: 'center', alignItems: 'center', borderWidth: wp('0.4%'), borderColor: colors.theme, marginTop: hp('2%'), borderRadius: wp('1%') }}>
                                            <Text style={{ fontSize: hp('2.6%'), color: colors.theme }}>N</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 7, justifyContent: 'center', paddingLeft: wp('2%') }}>
                                        <View style={{ height: hp('4%'), justifyContent: 'center' }}>
                                            <Text style={{ fontSize: hp('2.4%'), color: colors.theme }}>{item.title}</Text>
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
                                            <TouchableOpacity onPress={() => this.addItems('increment')} style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ height: hp('2.2%'), width: hp('2.2%') }} source={require('./../Asset/Images/add.png')}></Image>
                                            </TouchableOpacity>
                                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontSize: hp('2.6%'), color: colors.black }}>{this.state.count}</Text>
                                            </View>
                                            <TouchableOpacity onPress={() => this.removeItems('decrement')} style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                                <Image style={{ height: hp('2.3%'), width: hp('2.3%') }} source={require('./../Asset/Images/subtraction.png')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            )}
                        />
                    </View>
                </View>

                <View style={{ height: hp('25%'), width: wp('92%'), alignSelf: 'center', zIndex: 0, top: hp('20%'), position: 'absolute', backgroundColor: '#fff', elevation: 5, shadowColor: '#000' }}>
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: colors.theme, fontSize: hp('3.4%') }}>Inka Restaurant</Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../Asset/Images/star.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.theme }} />
                        <Text style={{ color: colors.theme, fontSize: hp('2.2%'), paddingLeft: wp('2%') }}>5.0 [200+] | All days : 09:00 Am - 06:00 Pm </Text>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Image source={require('./../Asset/Images/phone-ringing.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.theme }} />
                        <Text style={{ color: colors.theme, fontSize: hp('2.2%'), paddingLeft: wp('2%') }}>Reach us at : 9854598545</Text>
                    </View>
                    <View style={{ flex: 3, justifyContent: 'flex-start' }}>
                        <TouchableOpacity style={{ height: hp('6%'), width: wp('38%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.theme, borderRadius: 5 }}>
                            <Text style={{ color: colors.white, fontSize: hp('2.6%') }}>BOOK A TABLE</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={() => this.props.skipDebounce ? this.props.myCart : this.myCart()} style={{ height: hp('8%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.theme }}>
                    <Image source={require('./../Asset/Images/shopping-cart.png')} style={{ height: hp('3%'), width: hp('3%'), tintColor: colors.white }} />
                    <Text style={{ color: colors.white, fontSize: hp('2.5%'), paddingLeft: wp('2%') }}>VIEW CART [ 3 ITEMS ]</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.menuOptions}
                    style={{ height: hp('6%'), width: wp('27%'), alignSelf: 'center', flexDirection: 'row', backgroundColor: colors.secondaryColor, bottom: hp('9%'), position: 'absolute', borderRadius: wp('1.5%') }}>
                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./../Asset/Images/dine.png')} style={{ height: hp('4%'), width: hp('4%'), tintColor: colors.theme }} />
                    </View>
                    <View style={{ flex: 6, justifyContent: 'center' }}>
                        <Text style={{ color: colors.theme, fontSize: hp('2.8%'), fontWeight: 'bold' }}>MENU</Text>
                    </View>
                </TouchableOpacity>


                <Modal
                    visible={this.state.menuPopup}
                    animationType={"none"}
                    transparent
                    onRequestClose={() => { this.setState({ menuPopup: false }) }}>
                    <TouchableOpacity activeOpacity={0} onPressOut={() => this.setState({ menuPopup: false })} style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: hp('4%') }}>
                        <View style={{ height: hp("28%"), width: wp("70%"), backgroundColor: "#fff", borderRadius: hp("1.5%"), overflow: "hidden" }}>
                            <TouchableOpacity onPress={() => this.selectOption('Starter')} style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), fontWeight: this.state.starter == true ? 'bold' : 'normal', paddingLeft: wp('2%') }}>Starter</Text>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), color: colors.secondaryColor }}>0</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.selectOption('MainCourse')} style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), fontWeight: this.state.mainCourse == true ? 'bold' : 'normal', paddingLeft: wp('2%') }}>Main Course</Text>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), color: colors.secondaryColor }}>0</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.selectOption('Dessert')} style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), fontWeight: this.state.dessert == true ? 'bold' : 'normal', paddingLeft: wp('2%') }}>Dessert</Text>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), color: colors.secondaryColor }}>0</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.selectOption('Drinks')} style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 8, justifyContent: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), fontWeight: this.state.drinks == true ? 'bold' : 'normal', paddingLeft: wp('2%') }}>Drinks</Text>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ fontSize: hp('2.8%'), color: colors.secondaryColor }}>0</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(Menu);


