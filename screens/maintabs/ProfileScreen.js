import React, {useState} from 'react';
import {View, Pressable, TouchableOpacity, SafeAreaView, Text, Button, StyleSheet, Image, Dimensions, Modal} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'

export default function ProfileScreen({navigation}) {
    imageSource =  require("../../images/smile-person2.jpeg");

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaView style = {styles.container}>
            
            {/* settings button */}
            <TouchableOpacity style = {styles.settings}
            onPress = {() => navigation.navigate("MainSettings")}>
                <Icon
                color= {"#FDFDFD"}
                name = "settings"/>
            </TouchableOpacity>


            {/* profile picture */}
            {/* <TouchableOpacity style = {styles.imageContainer}
            onPress={() => setModalVisible(!modalVisible)}> */}
            <Pressable style = {styles.imageContainer}>
                <Image source = {imageSource} style = {styles.image}/>
            </Pressable>
            {/* </TouchableOpacity> */}

            {/* profile picture close up*/}
            {/* <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
               
                    <TouchableOpacity style = {styles.largeImageContainer}
                        onPress={() => setModalVisible(!modalVisible)}>
                            <Image source = {imageSource}/>
                        </TouchableOpacity>
              
            </Modal> */}
            

    
          
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container :{
        flex:1, 
        flexDirection: 'column',
        padding: 44,
        alignItems: "center",
        justifyContent: 'center',
    },
    imageContainer: {
        overflow: "hidden", 
        borderRadius: 100,
        width: SCREEN_WIDTH /4,
        height: SCREEN_WIDTH /4,
        resizeMode: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    image:{
    },
    largeImageContainer: {
        overflow: "visible", 
        width: SCREEN_WIDTH - 10,
        height: SCREEN_WIDTH - 10,
        resizeMode: "contain",
        position: "absolute",
        alignItems: "center"   
        
    },
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 0,
        padding: 0,
        alignItems: "center",
        elevation: 5
      },
      centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 0,
      },
      settings:{
        position: "absolute",
          top: 60,
          right :60,
      }

        
})