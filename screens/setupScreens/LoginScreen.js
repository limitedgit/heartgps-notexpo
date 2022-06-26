import React, {useState, useRef} from 'react';
import {Modal, Pressable, View, Text, Button, StyleSheet, TextInput, TouchableWithoutFeedback, Dimensions, Alert} from 'react-native';
import { Keyboard } from 'react-native';
import PhoneInput from 'react-native-phone-input'
import {CognitoUserPool,CognitoUserAttribute,CognitoUser,AuthenticationDetails,} from 'amazon-cognito-identity-js';
import { useSelector, useDispatch } from 'react-redux';
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
    const cognitoCallbacks = {
        mfaRequired () {
          // Implement you functionality to show UI for MFA form
          //navigation.navigate("LoginVerify", {cognitoCallbacks});
          setModalVisible(!modalVisible)
        },
        onSuccess: function(result) {
            console.log("success")
            let accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken)
            dispatch({type: "setUser", payload: cognitoUser.getUsername()}), [dispatch]
            navigation.navigate("Main")
            
        },
        onFailure: function(err) {
            alert(err);
        },
      }
    return (
        // keyboard dismisser
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <View style = {styles.container}>
            
            <Text>
            Enter your phone number
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
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>please enter the verification code  you received through sms</Text>
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
                    setModalVisible(true)
                   
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
    container :{
        flex:1, 
        flexDirection: 'column',
        padding: 44,
        justifyContent: 'center',
    },
    phoneTextInput:{

        borderWidth: 1,
        height: SCREEN_HEIGHT/15,
        fontSize: SCREEN_HEIGHT/30,
        borderRadius: 15,

    },
    // areaCodeInput: {
    //     flex: 0.2, 
    //     borderWidth: 1,
    //     fontSize: SCREEN_HEIGHT/30,
    //     borderRadius: 15,
    // }, 
    button: {
        padding: 5,
        borderRadius: 15, 
        borderWidth: 2,
        backgroundColor: "black", 
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
    },

        
})