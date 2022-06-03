import   React, { useRef, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MatchesScreen from './MatchesScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
const Tab = createMaterialBottomTabNavigator();

export default function MainScreen() {
  return (
   // <NavigationContainer>
    <Tab.Navigator  
    initialRouteName='Explore'
    activeColor="#ffffff"
    inactiveColor="#000000"
    barStyle={{ backgroundColor: '#333333' }}
    labeled = {false}
    
    >
      <Tab.Screen name="Matches" component={MatchesScreen}
       options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          )
        }}/>
      <Tab.Screen name="Explore" component={ExploreScreen} 
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
        ),
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} 
      options={{
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="account" color={color} size={26} />
        ),
      }}/>
      
    </Tab.Navigator>
    //</NavigationContainer>
  );
}