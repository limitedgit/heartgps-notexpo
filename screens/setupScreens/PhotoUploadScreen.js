import React, {useState} from 'react'
import {Image, View, Pressable, StyleSheet, Text, Dimensions} from "react-native"
import appStyles from '../../appstyles'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function PhotoUploadScreen({navigation}) {
const [imageSource, changeImageSource] = useState([null,null,null]);
  //TODO FOR IOS ADD IMAGE PICKER KEYS TO INFOPLIST
  const renderImage = (i) => {
    if (imageSource[i] != null) {
      return (
        <View style = {styles.imageContainer}>
            <Image style = {styles.image} source={{ uri: 'data:image/jpeg;base64,' + imageSource }}/>
          </View>
          )
    } else {
      return (
        <View style = {styles.imageContainer}>
            <Image style = {styles.image} source={require("../../images/placeholder.jpg")}/>
          </View>
          )
    }
  }


  return (

    <View style = {styles.container}>

        <Text style = {styles.Title}>
          Please upload a few photos of yourself
        </Text>
        <View style = {{ flex: 0.2}}/>
        <View style = {styles.imageContainerContainer}>
          {renderImage(0)}
          {renderImage(1)}
        </View>

        <View style = {styles.imageContainerContainer}>
          {renderImage(2)}
          {renderImage(3)}
        </View>
        <View style = {{ flex: 0.1}}/>

        <Pressable style = {styles.button}
        onPress = {() => launchCamera()}>
          <Text style = {styles.buttonText}>
            take photo with camera
          </Text>
        </Pressable>
        <View style = {{ flex: 0.1}}/>

        <Pressable style = {styles.button}
        onPress = {() => launchImageLibrary()}>
          <Text style = {styles.buttonText}>
            choose from photos
          </Text>
        </Pressable>
        <View style = {{ flex: 0.1}}/>
        


        <Pressable style = {styles.button} onPress = {() => {
          console.log(imageSource)
            navigation.goBack();
        }}>
          <Text style = {styles.buttonText}> back</Text>
           
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    ...appStyles,
    image:{
      height:150,
      width:150,
    },
    imageContainer: {
 
        resizeMode: "center",
        padding: 20,


    },
    imageContainerContainer:{
      flexDirection: "row",
      flex: 0,
    }

})