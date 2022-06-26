import React, {useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions, Pressable} from 'react-native';
import { Keyboard } from 'react-native';
import {
	CognitoUserPool,
	CognitoUserAttribute,
	CognitoUser,
} from 'amazon-cognito-identity-js';
import PhoneInput from 'react-native-phone-input'

//cognito pool data
var poolData = {
	UserPoolId: 'us-east-1_ruYdvZa9g', // Your user pool id here
	ClientId: 'q62on7a2t5hac9l2re48kg2j6', // Your client id here
};
var userPool = new CognitoUserPool(poolData);
var attributeList = [];

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function RegisterScreen({navigation}) {

    const [phoneNumber, setPhoneNumber] = useState(null);
    const [password, setPassword] = useState("fsadf");
    const phone = useRef(null);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {styles.container}>

            <Text style = {styles.text}>
                Please enter your phone number
            </Text>
            <Text>
                (you will recieve a 6 digit verification text)
            </Text>
            
            {/* <View style = {{flexDirection: "row"}}> */}
            <PhoneInput 
                ref={phone}
                initialCountry={'ca'}
                onChangePhoneNumber={setPhoneNumber}
                style = {styles.phoneTextInput}
            />

            {/* </View> */}
            
            {/* spacer */}
            <View style = {{height: SCREEN_HEIGHT*0.05}}/>

            {/* sign up button */}
            <Pressable
                style = {styles.button}
                onPress={() => {
                    if (phoneNumber === null){
                        alert("please enter a valid phone number");
                        return
                    }
                    let dataPhoneNumber = {
                        Name: 'phone_number',
                        Value: phoneNumber,
                    };
                    let attributePhoneNumber = new CognitoUserAttribute(dataPhoneNumber);
                    attributeList.push(attributePhoneNumber);

                    userPool.signUp(phoneNumber, 'password', attributeList, null, function(
                        err,
                        result
                    ) {
                        if (err) {
                            if (err.name == "UsernameExistsException"){
                                let userData = {
                                    Username: phoneNumber,
                                    Pool: userPool,
                                };
                            let cognitoUser = new CognitoUser(userData);
                            cognitoUser.resendConfirmationCode(function(err, result) {
                                if (err) {
                                    if (err.message == "User is already confirmed."){
                                        dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]
                                        console.log("There is already an account associated with this Number, please login instead");
                                        navigation.navigate("Login")
                                    }
                                    console.log(err.stack);
                                    return;
                                }
                                console.log('call result: ' + result);
                                navigation.navigate("Verify")
                            });
                     } else{
                        alert(err);
                        return;
                     }
                } else{
                    let cognitoUser = result.user;   
                    dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]
                    navigation.navigate("Verify")
                }
                
                });
                }}>

                <Text style = {styles.buttonText}>
                    enter   
                </Text>

                </Pressable> 

            {/* spacer */}
            <View style = {{height: SCREEN_HEIGHT*0.02}}/>

            {/* back button */}

            <Pressable 
                style = {styles.button}
                onPress={() => navigation.goBack()}>
                <Text style = {styles.buttonText}>
                    back
                </Text>
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
    phoneTextInput:{
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,

    },
    // areaCodeInput: {
    //     flex: 0.2, 
    //     borderWidth: 1,
    //     fontSize: SCREEN_HEIGHT/30,
    //     borderRadius: 15,
    // },
    text: {
        fontSize: SCREEN_WIDTH/20,
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