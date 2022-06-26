/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import store from "./state/store";
import {Provider} from "react-redux";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications


import NavigationScreen from './screens/NavigationScreen';

export default function App()  {

  return (

    <Provider store = {store}>
    <NavigationScreen/>
    </Provider>
      
 
  );
};




