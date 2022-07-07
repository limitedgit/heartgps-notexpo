import React from 'react';
import {Pressable, View, Text, Linking, StyleSheet, Dimensions, Image} from 'react-native';
import appStyles from '../../appstyles';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

export default function LandingScreen({navigation}) {
    return (
        <View style = {styles.container}>

            {/* logo image */}
            <Image  style = {styles.logo}source={require("../../images/heartGPS-logo.png")}/>

            <View style = {styles.signInOptions}>

                {/* sign up button */}
                <Pressable style = {styles.button} onPress={() => navigation.navigate("Register")}>
                    <Text style = {styles.buttonText}>Sign Up with Phone Number</Text>
                </Pressable>

                {/* divider */}
                <View style = {{height: SCREEN_HEIGHT*0.05}}/>

            

                {/* log in button */}
                <Text style = {styles.text}>
                    Already have an account?
                </Text>
                <Pressable style = {styles.button} onPress={() => navigation.navigate("Login")}>
                    <Text style = {styles.buttonText}>Log in</Text>
                </Pressable>


                {/* terms and conditions */}
                <Text style = {styles.text}> by using our services you agree to our</Text>
                <Text style={{color: 'blue'}}
                    onPress={() => Linking.openURL('http://google.com')}>
                    terms and conditions
                </Text>

            </View>
        
        </View>
    );
}

const styles = StyleSheet.create({
    ...appStyles,
    
    logo:{
        width : SCREEN_WIDTH * 0.5,
        height : SCREEN_HEIGHT * 0.2,
    },
    signInOptions:{
        flex: 0.2,
        top: SCREEN_HEIGHT * 0.2,
        alignItems: 'center',
    },
   
        
})