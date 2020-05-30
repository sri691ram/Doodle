
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack'

import Menu from './../../Pages/Menu';
import MyCart from './../../Pages/MyCart';
const Stack = createStackNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      animationEnabled: false,
      gestureEnabled: false
    })
  },
  MyCart: {
    screen: MyCart,
    navigationOptions: ({ navigation }) => ({
      animationEnabled: false,
      gestureEnabled: false
    })
  }
},
  {
    initialRouteName: 'Menu',
    headerMode:"none",
    navigationOptions: {
      gesturesEnabled: false,
      
    },
    defaultNavigationOptions: {
      ...TransitionPresets.SlideFromRightIOS,
    }
  }
);

const AppContainer = createAppContainer(Stack);

import React, { PureComponent } from 'react';

import { setCurrentScreenName } from './../../Asset/Libraries/index';

function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  
  return route.routeName;
}


export default class StackNavigation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentRouteName: "SplashScreen"
    }
    setCurrentScreenName("SplashScreen")
  }

  render() {
    return (
      <AppContainer
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = getActiveRouteName(currentState);
          if (currentRouteName != "Retry") {
            setCurrentScreenName(currentRouteName)
          }
          this.setState({
            currentRouteName: currentRouteName
          })
        }}
      />
    );
  }
}