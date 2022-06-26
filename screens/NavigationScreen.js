import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

//screens
import MainScreen from './maintabs/MainScreen';
import AgeScreen from './setupScreens/AgeScreen';
import LandingScreen from './setupScreens/LandingScreen';
import RegisterScreen from './setupScreens/RegisterScreen';
import PasswordScreen from './setupScreens/PasswordScreen';
import VerifyScreen from './setupScreens/VerifyScreen';
import LoginScreen from './setupScreens/LoginScreen';
import MainSettings from './settings/MainSettings';
import DefaultMapScreen from './mapScreens/DefaultMapScreen';
import LoginVerifyScreen from './setupScreens/LoginVerify';
//location setup




//navigation manager screen
export default function NavigationScreen() {
  
  const Stack = createNativeStackNavigator();

  //redux state selector
  const user = useSelector((state) => state.user); 
  console.log("user", user)
  
  
    return (
        <NavigationContainer>
        <Stack.Navigator    
        // initialRouteName= {( isLoggedIn ? "Main" : "Landing")}
        initialRouteName= {( user.currentUser ? "Main" : "Landing")}
        screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Landing" component={LandingScreen} options={{gestureEnabled: false}}  />
          <Stack.Screen name="Register" component={RegisterScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Verify" component={VerifyScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Login" component={LoginScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Password" component={PasswordScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Main" component={MainScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="MainSettings" component={MainSettings} options={{gestureEnabled: false}}/>
          <Stack.Screen name="Age" component={AgeScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="DefaultMap" component={DefaultMapScreen} options={{gestureEnabled: false}}/>
          <Stack.Screen name="LoginVerify" component={LoginVerifyScreen} options={{gestureEnabled: false}}/>
        </Stack.Navigator>
        
      </NavigationContainer>
    );
}
