import React, {useState} from 'react';
import { TouchableOpacity , Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


export default function GenderScreen({navigation}) {
    const [checked, setChecked] = React.useState(null);
    const dispatch = useDispatch();


    
    return (

        // keyboard dismisser
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>

            
            <Text style = {styles.Title}>
                I am a
            </Text>

{/* divider */}
<View style = {{flex: 0.05}}/> 
<Text>man</Text>
        <RadioButton
                value="man"
                status={ checked === 'man' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('man')}
            />

{/* divider */}
<View style = {{flex: 0.05}}/> 

        <Text>
            woman
        </Text>
        <RadioButton
            value="woman"
            status={ checked === 'woman' ? 'checked' : 'unchecked' }
            onPress={() => setChecked('woman')}
        />

{/* divider */}
<View style = {{flex: 0.05}}/> 
<Text>other</Text>
    <RadioButton
        value="other"
        status={ checked === 'other' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('other')}
      />    
            
            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            

            

            {/* enter button */}
            <Pressable 
                style = {styles.button}
                onPress={
                    

                    () => {
                        if (checked == null){
                            alert("please select an option")
                            return
                        }
                        dispatch({type: "setGender", payload: checked}),[dispatch]
                        navigation.navigate("GenderPref")}}
                > 
                <Text style = {styles.buttonText}> Next </Text>
            </Pressable>
            
            {/* divider */}
            <View style = {{flex: 0.05}}/> 


          
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
    },
    clearButton:{
        padding: 10,
        borderRadius: 15, 
        borderWidth: 2,

    },
        
})