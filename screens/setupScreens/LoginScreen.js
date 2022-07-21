import React, {useState, useRef} from 'react';
import {Modal, Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions, Alert} from 'react-native';
import { Keyboard } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {CognitoUserPool,CognitoUserAttribute,CognitoUser,AuthenticationDetails,} from 'amazon-cognito-identity-js';
import { useSelector, useDispatch } from 'react-redux';
import EncryptedStorage from 'react-native-encrypted-storage';
import appStyles from '../../appstyles';
//import Prompt from 'react-native-prompt';


//THIS SCREEN ACCOUNTS FOR BOTH LOGIN AND SIGNUP
// OTHER SIGNUP/LOGIN SCREENS ARE CURRENTLY UNUSED
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
    const [modalVisible, setModalVisible] = useState(false); //pop up for code
    const [verifyCode, changeVerifyCode] = useState(null); //code
    const [signUp, setSignUp] = useState(false); //sign up or log in
    var attributeList = [];


    //This function should retrieve the data of an authorized user from the db
    const getUserdata = () => {
        //TODO
        //fetch userdata from db
        return null;
    }

    //stores access tokens
    const storeUserAuthData= async (idToken, accessToken, refreshToken, username) => {
        try {
            await EncryptedStorage.setItem(
                "user_session",
                JSON.stringify({
                    idToken : idToken,
                    accessToken : accessToken,
                    refreshToken: refreshToken,
                    username : username,
                })
            );
        } catch (error) {
            // There was an error on the native side
        }
    }

    //callback function for amazon cognito user login
    const cognitoCallbacks = {
        mfaRequired: function(err) {
          setModalVisible(true)
        },
        onSuccess: async function(result) {
            console.log("success")
        
            let idToken = result.getIdToken().getJwtToken();
            let accessToken = result.getAccessToken().getJwtToken();
            let refreshToken = result.refreshToken.token;
            storeUserAuthData(idToken, accessToken, refreshToken, phoneNumber);
            dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]
            let userData = await getUserdata();
            setModalVisible(false)
            if (userData == null){ 
                navigation.navigate("Age")
            } else {
                navigation.navigate("Main")
            }
            
        },
        onFailure: function(err) {
            
            if (err.name == "UserNotFoundException" || err.name == "UserNotConfirmedException"){
                setSignUp(true);
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
                ){
                if (err) {
                        if (err.name == "UsernameExistsException" ){
                            let userData = {
                                Username: phoneNumber,
                                Pool: userPool,
                            };
                        cognitoUser = new CognitoUser(userData);
                        cognitoUser.resendConfirmationCode(function(err, result) {
                            if (err) {
                                if (err.message == "User is already confirmed."){
                                   //this should be unreachable 
                                   //unless very strange actions are taken
                                    setSignUp(false);
                                    alert("something went wrong, please try again")
                                }
    
                                return;
                            }
                            // navigation.navigate("Verify")
                            setModalVisible(!modalVisible)
                        });
                        } else{
                            alert(err);
                            console.log(err.name)
                            return;
                         }
            } else{
                cognitoUser = result.user;   
                dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]
                setModalVisible(!modalVisible)
            }
            
            })

            } else if (err.name == "CodeMismatchException"){
                alert("Incorrect code entered")
            }else{
                alert(err)
            }
            return
        },
    }

    //callback function for amazon cognito user sign up confirmation
    const cognitoCallbacksSignUp = {
        onSuccess: async function(result) {
            
            let idToken = result.getIdToken().getJwtToken();
            let accessToken = result.getAccessToken().getJwtToken();
            let refreshToken = result.refreshToken.token;

            var smsMfaSettings = {
                PreferredMfa: true,
                Enabled: true,
            };
            
            cognitoUser.setUserMfaPreference(smsMfaSettings, null, function(err, result) {
                if (err) {
                    alert(err.message || JSON.stringify(err));
                }
            });
            storeUserAuthData(idToken, accessToken, refreshToken, phoneNumber);

            dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]
            setModalVisible(false)
            navigation.navigate("Age")
    },
        onFailure: function(err) {
            alert(err.message || JSON.stringify(err));
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
                {/* POP UP FOR CODE */}
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

                                            //if the user didnt enter their phone number
                                            if (cognitoUser == null){
                                                alert("please enter a valid phone number")
                                                return
                                            }
                                            
                                            if (!signUp){
                                                //if the user already has an account
                                                cognitoUser.sendMFACode(verifyCode, cognitoCallbacks)
                                            } else {
                                                //if the user does not have an account
                                                setSignUp(false);
                                                cognitoUser.confirmRegistration(verifyCode, true, function(err, result) {
                                                    if (err) {
                                                        alert(err.message || JSON.stringify(err));
                                                        return;
                                                    }
                                                    var authenticationData = {
                                                        Username: phoneNumber,
                                                        Password: 'password',
                                                    };
                                                    var authenticationDetails = new AuthenticationDetails(authenticationData);
                                                    cognitoUser.authenticateUser(authenticationDetails,  cognitoCallbacksSignUp);
                                                    });

                                            }
                                        }}
                            >

                            <Text style={styles.buttonText}>enter</Text>
                            </Pressable>
                            <Pressable style = {styles.button} onPress={() => {
                                setModalVisible(!modalVisible)
                            }}>
                            <Text style = {styles.buttonText}>back</Text>
                            </Pressable>
                        </View>
                        </View>
                    </Modal>

                
                

                {/* The ENTER button */}
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

                {/* another divider */}
                <View style = {{height: SCREEN_HEIGHT*0.02}}/>
            
                
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
      

        
})