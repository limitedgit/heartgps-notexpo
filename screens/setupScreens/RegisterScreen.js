import React from 'react';
import {View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function RegisterScreen({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>
            <Text style = {styles.text}>
            Please enter your phone number
            </Text>
          
            <Text>
            (you will recieve a 6 digit verification text)
            </Text>
            
            <View style = {{flexDirection: "row"}}>
           
            <TextInput style = {styles.areaCodeInput} placeholder = "+1" keyboardType = {"phone-pad"} maxLength = {3}/>
            <View style = {{flex: 0.005}}/> 
            <TextInput style = {styles.phoneTextInput} placeholder = "999999999" keyboardType={'phone-pad'} maxLength={15}/>
            </View>
            <View style = {{height: SCREEN_HEIGHT*0.05}}>

</View>
        <Button title='enter'
         onPress={() => navigation.navigate("Verify")}
        /> 
        <Button title = "back"
        onPress={() => navigation.navigate("Landing")}/>
            
        </View>
        </TouchableWithoutFeedback>
    );


    
}

const styles = StyleSheet.create({
    container :{
        flex:1, 
        flexDirection: 'column',
        padding: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phoneTextInput:{

        flex: 0.8,
        borderWidth: 1,
        height: SCREEN_HEIGHT/15,
        fontSize: SCREEN_HEIGHT/30,
        borderRadius: 15,

    },
    areaCodeInput: {
        flex: 0.2, 
        borderWidth: 1,
        fontSize: SCREEN_HEIGHT/30,
        borderRadius: 15,
    },
    text: {
        fontSize: SCREEN_WIDTH/20,
    }, button: {
        padding: 10,
        borderRadius: 15, 
        borderWidth: 2,
        backgroundColor: "black",
        
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    }
        
})