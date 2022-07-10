import React, {useState} from 'react';
import { TouchableOpacity , Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import appStyles from '../../appstyles';


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

            <Text style = {styles.text}>men</Text>
            <RadioButton
                    value="men"
                    status={ checked === 'men' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('men')}
                />

            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            <Text style = {styles.text}>
                women
            </Text>

            <RadioButton
                value="women"
                status={ checked === 'women' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('women')}
            />

            {/* divider */}
            <View style = {{flex: 0.05}}/> 

            <Text style = {styles.text}>both</Text>
            
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
                         navigation.navigate("PhotoUpload")
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
    
    ...appStyles
        
})