import React, {useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
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
import GenderScreen from './setupScreens/GenderScreen';
import GenderPrefScreen from './setupScreens/GenderPrefScreen';
import NameScreen from './setupScreens/NameScreen';

//location setup




//navigation manager screen
export default function NavigationScreen() {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#212121'
    },
  };
  
  const Stack = createNativeStackNavigator();

  //redux state selector
  const user = useSelector((state) => state.user); 

  
  
    return (
        <NavigationContainer theme={MyTheme}>
        <Stack.Navigator    
        // initialRouteName= {( isLoggedIn ? "Main" : "Landing")}
        initialRouteName= {( user.currentUser ? "Main" : "Landing")}
        
        screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}>
          <Stack.Screen name="Landing" component={LandingScreen}  />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Verify" component={VerifyScreen} />
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Password" component={PasswordScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="MainSettings" component={MainSettings}/>
          <Stack.Screen name="Age" component={AgeScreen} />
          <Stack.Screen name="DefaultMap" component={DefaultMapScreen} />
          <Stack.Screen name="LoginVerify" component={LoginVerifyScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="GenderPref" component={GenderPrefScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
        </Stack.Navigator>
        
      </NavigationContainer>
    );
}
