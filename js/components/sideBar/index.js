import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, Icon, List, ListItem, Content, Left, Body, Right, Thumbnail, Badge} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {closeDrawer} from '../../actions/drawer';
import {logout} from '../../actions/auth';
import styles from './style';
import {NavigationActions} from 'react-navigation';
import HomeNavigation from '../../scenes/home';


import NumberFormater from '../numberFormatter';

const logo = require('../../../images/logo.png');

class SideBar extends Component {

  changeNavigation(target) {
    var targetNavigation  = HomeNavigation.router.getActionForPathAndParams(target);
    this.props.changeNavigation(targetNavigation);
    this.props.appNavigation.navigate("DrawerClose");
  }
  logout(){
    this.props.logout();
    this.props.appNavigation.navigate("DrawerClose");
  }

  render() {
    const { username, money} = this.props;
    return (
      <Content style={{backgroundColor: '#165980'}}>
        <Thumbnail
          style={{alignSelf: 'center', height: 200, width: 200, marginTop: 20, marginBottom: 15, resizeMode: 'contain'}}
          square
          source={logo}
        />


        <ListItem button onPress={() => {
          this.changeNavigation.call(this, "news")
        }} icon style={styles.links}>
          <Left>
            <Icon name="ios-person"/>
          </Left>
          <Body>
          <Text numberOfLines={1} ellipsizeMode="tail" style={{color: '#c4e1ff',}}>{username}</Text>
          </Body>
          <Right />
        </ListItem>

        <ListItem button onPress={() => {
          this.changeNavigation.call(this, "news")
        }} icon style={styles.links}>
          <Left>
            <Icon name="logo-bitcoin"/>
          </Left>
          <Body>
          <NumberFormater numberOfLines={1} ellipsizeMode="tail" style={{color: '#ffde00',}} format="0,0">{money}V</NumberFormater>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => {
          this.changeNavigation.call(this, "news")
        }} icon style={styles.links}>
          <Left>
            <Icon name="ios-paper"/>
          </Left>
          <Body>
          <Text >Tin tức</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => {
          this.changeNavigation.call(this, "otp")
        }} icon style={styles.links}>
          <Left>
            <Icon active name="unlock"/>
          </Left>
          <Body>
          <Text>OTP</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => {
          this.changeNavigation.call(this, "cashOutHistory")
        }} icon style={styles.links}>
          <Left>
            <Icon name="ios-basket"/>
          </Left>
          <Body>
          <Text>Ưu đãi</Text>
          </Body>
          <Right />
        </ListItem>
        <ListItem button onPress={() => this.logout.call(this)} icon style={styles.links}>
          <Left>
            <Icon name="ios-power"/>
          </Left>
          <Body>
          <Text>Logout</Text>
          </Body>
          <Right />
        </ListItem>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    closeDrawer: () => dispatch(closeDrawer()),
    logout: () => dispatch(logout()),
    changeNavigation: (targetNavigation) => dispatch(targetNavigation),
  };
}

const mapStateToProps = state => {
  const {loginInfo} = state.auth;
  const {appNavigation} = state;
  return {
    appNavigation,
    username: loginInfo.username,
    money: loginInfo.money || 0,
  }
};

export default connect(mapStateToProps, bindAction)(SideBar);
