import React from 'react';
import {Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


export default function AgeScreen({navigation}) {
    return (

        // keyboard dismisser
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>

            
            <Text style = {styles.Title}>
                Please enter your age
            </Text>
            <TextInput style = {styles.code} autoComplete='tel'   keyboardType={'phone-pad'} maxLength={6}/>
            

            {/* enter button */}
            <Pressable 
                style = {styles.button}
                onPress={() => navigation.navigate("Main")}
                > 
                <Text style = {styles.buttonText}> enter </Text>
            </Pressable>
            
            {/* divider */}
            <View style = {{flex: 0.05}}/> 


            {/* next button */}
            <Pressable 
                style = {styles.button}
                > 
                <Text style = {styles.buttonText}>Next</Text>
            </Pressable>


            {/* back button */}
            <Pressable 
            style = {styles.button}
            onPress={() => navigation.goBack()}
            > 
                <Text style = {styles.buttonText}> back </Text>
            </Pressable>


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
    code: {
        width: SCREEN_WIDTH *0.75,
        borderWidth: 1,
        height: SCREEN_HEIGHT/15,
        fontSize: SCREEN_WIDTH* 0.18,
        borderRadius: 15,
    },
    Title: {
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