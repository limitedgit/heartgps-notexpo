import React, {useState, useRef} from 'react';
import {Modal, Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions, Alert} from 'react-native';
import { Keyboard } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {CognitoUserPool,CognitoUserAttribute,CognitoUser,AuthenticationDetails,} from 'amazon-cognito-identity-js';
import { useSelector, useDispatch } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import appStyles from '../../appstyles';
//import Prompt from 'react-native-prompt';

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const poolData = {
    UserPoolId: 'us-east-1_ruYdvZa9g', // Your user pool id here
    ClientId: 'q62on7a2t5hac9l2re48kg2j6', // Your client id here
};
const userPool = new CognitoUserPool(poolData);
var cognitoUser = null;

export default function LoginScreen({navigation}) {

    const [phoneNumber, ChangePhoneNumber] = useState(null);
    const phone = useRef(null);
    const dispatch = useDispatch()
    const  [promptVisible, setPromptVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [verifyCode, changeVerifyCode] = useState(null);

    const getUserdata = () => {

        //TODO
        //fetch userdata from db
        return null;
    }

    //callback function for amazon cognito user login
    const cognitoCallbacks = {
        mfaRequired: function(err) {
          // Implement you functionality to show UI for MFA form
          //navigation.navigate("LoginVerify", {cognitoCallbacks});
          setModalVisible(!modalVisible)
        },
        onSuccess: async function(result) {
            console.log("success")
            let idToken = result.getIdToken().getJwtToken();
            let accessToken = result.getAccessToken().getJwtToken();
            console.log(`result: ${JSON.stringify(result)}`)
            console.log(`myAccessToken: ${JSON.stringify(result.getAccessToken())}`)
            

            try {
                await EncryptedStorage.setItem(
                    "user_session",
                    JSON.stringify({
                        idToken : idToken,
                        accessToken : accessToken,
                        username : phoneNumber,
                    })
                );
        
                // Congrats! You've just stored your first value!
            } catch (error) {
                // There was an error on the native side
            }
            console.log(accessToken)
            dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]

            let userData = await getUserdata();
            if (userData == null){
                navigation.navigate("Age")
            } else {
                navigation.navigate("Main")
            }
            
        },
        onFailure: function(err) {
            
            if (err.name == "UserNotFoundException"){
                alert("That user doesn't exist, please sign up instead")
                navigation.navigate("Landing")
            } else if (err.name == "CodeMismatchException"){
                alert("Incorrect code entered")
            }else{
                alert(err)
            }
            return
        },
      }
      
    return (
        // keyboard dismisser
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style = {styles.container}>
            
            <Text style = {styles.text}>
            Enter your phone number (you will recieve a confirmation code)
            </Text>

            

            {/* phone number input */}
            <PhoneInput 
                ref = {phone}
                style = {styles.phoneTextInput} 
                initialCountry = {"ca"} 
                onChangePhoneNumber = {ChangePhoneNumber}/>

            
            <View style = {{height: SCREEN_HEIGHT*0.05}}/>

            <View style = {{flex: 0.005}}/>

            

            <View style = {{alignItems: "center", justifyContent: "center"}}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.text}>please enter the verification code  you received through sms</Text>
                            <TextInput style = {styles.code} 
                                autoComplete='tel'   
                                keyboardType={'phone-pad'} 
                                maxLength={6}
                                onChangeText = {changeVerifyCode}/>
                            <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                            if (cognitoUser == null){
                                                alert("please enter a valid phone number")
                                                return
                                            }
                                            cognitoUser.sendMFACode(verifyCode, cognitoCallbacks)}}
                            >

                            <Text style={styles.buttonText}>enter</Text>
                            </Pressable>
                            <Pressable style = {styles.button} onPress={() => {
                                setModalVisible(false)
                            }}>
                            <Text style = {styles.buttonText}>back</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>

                
                

                {/* login button */}
                <Pressable 
                    style = {styles.button}
                    onPress={() => {
                        if (phoneNumber == null){
                            alert("please enter a valid phone number")
                            return
                        }
                    let userData = {
                        Username: phoneNumber,
                        Pool: userPool,
                    };
                    cognitoUser = new CognitoUser(userData);

                    let authenticationData = {
                        Username: phoneNumber,
                        Password: 'password',
                    };
                   
                    let authenticationDetails = new AuthenticationDetails(authenticationData); 
                    dispatch({type: "setUser", payload: phoneNumber}), [dispatch]
                    cognitoUser.authenticateUser(authenticationDetails, cognitoCallbacks);
                   
                   
                }}
                > 


                
                    <Text style = {styles.buttonText}> enter </Text>
                </Pressable>

                <View style = {{height: SCREEN_HEIGHT*0.02}}/>

                {/* <Prompt
                    title="Enter Verification code sent to SMS"
                    placeholder="999999"
                    defaultValue=""
                    visible={ promptVisible }
                    onCancel={() => setPromptVisible()}
                    onSubmit={ () => setPromptVisible() }/> */}
            
                
                {/* back button */}
                <Pressable 
                    style = {styles.button}
                    onPress={() => navigation.goBack()}
                    > 
                    <Text style = {styles.buttonText}> back </Text>
                </Pressable>
            </View>
    
            
        </View>
        </TouchableWithoutFeedback>
    );



    
}

const styles = StyleSheet.create({
    ...appStyles,
    
    // areaCodeInput: {
    //     flex: 0.2, 
    //     borderWidth: 1,
    //     fontSize: SCREEN_HEIGHT/30,
    //     borderRadius: 15,
    // }, 
 

    modalView: {
        margin: 20,
        backgroundColor: "#212121",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      code: {
        width: SCREEN_WIDTH *0.75,
        borderWidth: 1,
        height: SCREEN_HEIGHT/15,
        borderRadius: 15,
        color: "#FDFDFD",
    },

        
})