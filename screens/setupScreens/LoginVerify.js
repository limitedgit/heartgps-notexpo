import React from 'react';
import { useState} from 'react';
import {CognitoUserPool,CognitoUserAttribute,CognitoUser,AuthenticationDetails,} from 'amazon-cognito-identity-js';
import {Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions} from 'react-native';
import { Keyboard } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
var poolData = {
	UserPoolId: 'us-east-1_ruYdvZa9g', // Your user pool id here
	ClientId: 'q62on7a2t5hac9l2re48kg2j6', // Your client id here
};

var userPool = new CognitoUserPool(poolData);
const region = "us-east-1";


export default function LoginVerifyScreen({ route, navigation }) {
    const {cognitoCallback} = route.params
    const user = useSelector((state) => state.user.currentUser)
    console.log("login verify user: ", user)
    const [verifyCode, changeVerfiyCode] = useState(null);
    var userData = {
        Username: user,
        Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    




    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>
            <Text style = {styles.Title}>
                verify your login
            Please enter the 6 digit code you recieved through SMS
            </Text>

            <TextInput style = {styles.code} 
            autoComplete='tel'   
            keyboardType={'phone-pad'} 
            maxLength={6}
            onChangeText = {changeVerfiyCode}/>

            <Pressable 
            style = {styles.button}
            onPress={() => {
                if (verifyCode == null){
                    alert("please enter the code you recieved through SMS")
                    return
                }
                cognitoUser.sendMFACode(verifyCode, cognitoCallback)
                
   

                
                // var smsMfaSettings = {
                //     PreferredMfa: true,
                //     Enabled: true,
                // };
                // cognitoUser.setUserMfaPreference(smsMfaSettings, null, function(err, result) {
                // if (err) {
                //     alert(err.message || JSON.stringify(err));
                // }
                // console.log('call result ' + result);
                // });
                
                
                }}
            > 
                <Text style = {styles.buttonText}> enter </Text>
            </Pressable>
        <View style = {{flex: 0.05}}/> 

        <Text> Didn't recieve a code?</Text>



            <Pressable 
                style = {styles.button}
                onPress = {() => {
                    cognitoUser.resendConfirmationCode(function(err, result) {
                        if (err) {
                            alert(err.message || JSON.stringify(err));
                            return;
                        }
                        console.log('call result: ' + result);
                    });
                }}
                > 
                <Text style = {styles.buttonText}>send again</Text>
            </Pressable>

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