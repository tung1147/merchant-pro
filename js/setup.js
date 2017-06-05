import * as Expo from 'expo';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {StyleProvider, Text, Button} from 'native-base';
import {View} from 'react-native';
import AppNavigatorWrap from './AppNavigatorWrap';
import store, {configureStore} from './configureStore';
import getTheme from '../native-base-theme/components';
import variables from '../native-base-theme/variables/commonColor';

export default class Setup extends Component {

  constructor() {
    super();
    this.state = {
      isLoading: false,
      // store: configureStore(() => this.setState({ isLoading: false })),
      store: store,
      isReady: false,
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          <AppNavigatorWrap />
        </Provider>
      </StyleProvider>
    );
  }

  // render() {
  //   if (!this.state.isReady) {
  //     return <Expo.AppLoading />;
  //   }
  //   return (
  //     <StyleProvider style={getTheme(variables)}>
  //       <Provider store={this.state.store}>
  //         <AppNavigatorWrap />
  //       </Provider>
  //     </StyleProvider>
  //   );
  // }
}
