import React, {useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

//screens
import LandingScreen from './LandingScreen';
import RegisterScreen from './RegisterScreen';
import VerifyScreen from './VerifyScreen';
import LoginScreen from './LoginScreen';
import PasswordScreen from './PasswordScreen';
import MainScreen from '../MainScreen';
import AgeScreen from './AgeScreen';
import MainSettings from '../settings/MainSettings';
import DefaultMapScreen from '../mapScreens/DefaultMapScreen';


//location setup




//navigation manager screen
export default function SetupScreen() {
  
  const Stack = createNativeStackNavigator();

  //redux state selector
  const isLoggedIn = useSelector((state) => state.login); 
  
    return (
        <NavigationContainer>
        <Stack.Navigator    
        // initialRouteName= {( isLoggedIn ? "Main" : "Landing")}
        initialRouteName= {"Main"}
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
        </Stack.Navigator>
        
      </NavigationContainer>
    );
}
