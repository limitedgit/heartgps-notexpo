import React, {useState} from 'react';
import {Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import appStyles from '../../appstyles';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width



export default function AgeScreen({navigation}) {
    const [Age, setAge] = useState(null);
    const dispatch  = useDispatch();

    
    return (

        // keyboard dismisser
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>

            
            <Text style = {styles.Title}>
                Please enter your age
            </Text>
            <TextInput style = {styles.code} 
            autoComplete='tel'   
            keyboardType={'phone-pad'} 
            maxLength={6}
            onChangeText = {setAge}
            />
            

            {/* enter button */}
            <Pressable 
                style = {styles.button}
                onPress={

                    () => {
                        if (parseInt(Age) < 18){
                            alert("you must be 18 or older to use this app, please come back later")
                            return
                        }
                        dispatch({type: "setAge", payload: Age}), [dispatch]

                        
                        navigation.navigate("Name")}}
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
    ...appStyles
        
})