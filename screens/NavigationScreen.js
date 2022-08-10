import React, {useEffect} from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';

//screens
import MainScreen from './maintabs/MainScreen';
import AgeScreen from './setupScreens/AgeScreen';
import LandingScreen from './setupScreens/LandingScreen';
import LoginScreen from './setupScreens/LoginScreen';
import MainSettings from './settings/MainSettings';
import DefaultMapScreen from './mapScreens/DefaultMapScreen';
import GenderScreen from './setupScreens/GenderScreen';
import GenderPrefScreen from './setupScreens/GenderPrefScreen';
import NameScreen from './setupScreens/NameScreen';
import PhotoUploadScreen from './setupScreens/PhotoUploadScreen';

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
        //initialRouteName= {"PhotoUpload"}  
        // initialRouteName= {( isLoggedIn ? "Main" : "Landing")}
        //initialRouteName= {( user.currentUser ? "Main" : "Landing")}
        initialRouteName={"Main"}
        //initialRouteName={"DefaultMap"}
        
        screenOptions={{
            headerShown: false,
            gestureEnabled: false
          }}>
          <Stack.Screen name="Landing" component={LandingScreen}  />
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="MainSettings" component={MainSettings}/>
          <Stack.Screen name="Age" component={AgeScreen} />
          <Stack.Screen name="DefaultMap" component={DefaultMapScreen} />
          <Stack.Screen name="Gender" component={GenderScreen} />
          <Stack.Screen name="GenderPref" component={GenderPrefScreen} />
          <Stack.Screen name="Name" component={NameScreen} />
          <Stack.Screen name="PhotoUpload" component={PhotoUploadScreen}/>

        </Stack.Navigator>
        
      </NavigationContainer>
    );
}
