/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Curtain from './components/curtain';



export default class App extends Component<{}> {
  _renderCurtainData = () => {
    return <View><Text>Your Data gos here!</Text></View>
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
        React Native bottom curtain
        </Text>
        <Curtain 
        teamColor={'#E40027'}
        textStyle={{paddingTop:5,paddingBottom:5,fontSize:18}}
        headerStyle={{paddingTop:10}}
        topBodyBorder={10}
        iconActionNameUp={'angle-up'}
        iconActionNameDown={'angle-down'}
        iconName={'suitcase'}
        iconSize={26}
        iconColor={'#fff'}
        headerText={"whats app"}
        bodyStyle={{backgroundColor:'transparent'}}
        >
         {this._renderCurtainData()}
        </Curtain>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
};
