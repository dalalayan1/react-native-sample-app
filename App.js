/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import HomePageComponent from './src/components/HomePage';

export default class App extends Component {
  render() {
    return ( 
        <HomePageComponent/>
    );
  }
}