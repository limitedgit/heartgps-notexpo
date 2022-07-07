import React, {useState} from 'react';
import { TouchableOpacity , Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const storeProfileToDb = () => {
    //construct json from redux variables
    //send to dynamodb
    return null;
}

export default function GenderPrefScreen({navigation}) {
    const [checked, setChecked] = React.useState(null);
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile);


    
    return (

        // keyboard dismisser
        

        <View style = {styles.container}>

            <Text style = {styles.Title}>
                What kind of profiles would you like to see?
            </Text>
            <Text style = {styles.Title}>
                show me:
            </Text>

            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            <Text>men</Text>
            <RadioButton
                    value="men"
                    status={ checked === 'men' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('men')}
                />

            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            <Text>
                women
            </Text>

            <RadioButton
                value="women"
                status={ checked === 'women' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('women')}
            />

            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            <Text>both</Text>
            
            <RadioButton
                value="both"
                status={ checked === 'both' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('both')}
            />    
            
            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            

            

            {/* enter button */}
            <Pressable 
                style = {styles.button}
                onPress={
                    

                    async () => {
                        if (checked == null){
                            alert("please select an option")
                            return
                        }
                        await dispatch({type: "setGenderPref", payload: checked}),[dispatch]
                        storeProfileToDb();
                        console.log(JSON.stringify(profile))
                        // navigation.navigate("Main")
                    }}
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