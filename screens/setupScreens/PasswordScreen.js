import React from 'react'
import {Dimensions, Button, TouchableWithoutFeedback, View, Text, StyleSheet,TextInput, Keyboard } from 'react-native';


const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function PasswordScreen({navigation}) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {styles.container}>
        <Text>
            please set a password for your account
        </Text>
        <TextInput
        style = {styles.passwordText}
        secureTextEntry = {true}
        placeholder='enter your password'
        />

        <TextInput
        style = {styles.passwordText}
        secureTextEntry = {true}
        placeholder='please re-enter your password'
        />  
        <Button
        title = "confirm"
        onPress={()=> navigation.navigate("Age")}/>
        <Button
        title = "back"
        onPress={()=> navigation.goBack()}/>
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    passwordText: {
        width: SCREEN_WIDTH*0.8,
        height: SCREEN_HEIGHT* 0.05,
        borderWidth: 1,
        borderRadius: 10,
    }
})