import React from 'react';
import {Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function LoginScreen({navigation}) {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>
            <Text>
            Enter your phone number
            </Text>
            <View style = {{flexDirection: "row"}}>
           
            <TextInput style = {styles.areaCodeInput} placeholder = "+1" keyboardType = {"phone-pad"} maxLength = {3}/>
            <View style = {{flex: 0.005}}/> 
            <TextInput style = {styles.phoneTextInput} placeholder = "999999999" keyboardType={'phone-pad'} maxLength={15}/>
            </View>
            <View style = {{height: SCREEN_HEIGHT*0.05}}>

            </View>
            <View style = {{flex: 0.005}}/>

            
            <View style = {{alignItems: "center", justifyContent: "center"}}>
                <Pressable 
                style = {styles.button}
                onPress={() => navigation.navigate("Verify")}
                > 
                <Text style = {styles.buttonText}> enter </Text>
                </Pressable>

                <Pressable 
                style = {styles.button}
                onPress={() => navigation.navigate("Landing")}
                > 
                    <Text style = {styles.buttonText}> back </Text>
                </Pressable>
            </View>
    
            
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
    }, button: {
        padding: 5,
        borderRadius: 15, 
        borderWidth: 2,
        backgroundColor: "black",
        
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    }

        
})