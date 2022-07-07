import React, {useState} from 'react';
import {Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width



export default function NameScreen({navigation}) {
    const [Name, setName] = useState(null);
    const dispatch  = useDispatch();

    
    return (

        // keyboard dismisser
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>

            
            <Text style = {styles.Title}>
                Please enter your preferred name (will be displayed on your profile)
            </Text>
            <TextInput style = {styles.code} 
            onChangeText = {setName}
            />
            

            {/* enter button */}
            <Pressable 
                style = {styles.button}
                onPress={

                    () => {
                        if (Name == null || Name == ""){
                            alert("please enter a name")
                            return
                        }
                    
                        dispatch({type: "setName", payload: Name}), [dispatch]

                        
                        navigation.navigate("Gender")}}
                > 
                <Text style = {styles.buttonText}> enter </Text>
            </Pressable>
            
            {/* divider */}
            <View style = {{flex: 0.05}}/> 


            
            {/* <Pressable 
                style = {styles.button}
                > 
                <Text style = {styles.buttonText}>Next</Text>
            </Pressable> */}


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
        fontSize: 20,
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