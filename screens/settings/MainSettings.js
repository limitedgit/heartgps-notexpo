import React from 'react';
import {View, Button, StyleSheet} from 'react-native';

export default function MainSettings({navigation}) {
  return (

    <View style = {styles.container}>
         <Button  title='edit pictures'/>
            <Button title='log out'  onPress={() => navigation.navigate("Landing")}/>
            <Button title='back'  onPress={() => navigation.navigate("Profile")}/>
    </View>

    
  )
}

const styles = StyleSheet.create({
    container :{
        flex:1, 
        flexDirection: 'column',
        padding: 44,
        justifyContent: 'center',
        alignItems: 'center',
    }
        
})