import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    Button,
    Image
  } from 'react-native';
import { Provider } from 'react-redux';

import StackNavigation from './Router/Stack/navigationConfiguration'
import configureStore from './Redux/configureStore';

class Roots extends Component {

  constructor(props) {
    super(props);
    // console.reportErrorsAsExceptions = false;
    console.disableYellowBox=true
    this.state = {
      store: configureStore(),
    };
  }

  render() {
    const { store } = this.state;

    return (
      <Provider store={store}>   
        <StackNavigation />
       </Provider>
    );
  }
}
export default Roots;