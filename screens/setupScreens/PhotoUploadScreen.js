import React, {useState} from 'react'
import {ImageBackground, Image, View, Pressable, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native"
import appStyles from '../../appstyles'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Icon } from 'react-native-elements'

export default function PhotoUploadScreen({navigation}) {
const [imageSource, changeImageSource] = useState([]);


  //TODO FOR IOS ADD IMAGE PICKER KEYS TO INFOPLIST

  const deletePhoto = (i) => {
    console.log(i)
    let photos = [...imageSource];
    photos.splice(i,1)
    changeImageSource(photos)
    
  }
  const renderImage = (i) => {
    if ((imageSource)[i] != null) {
      console.log((imageSource) )
      return (
        <View style = {styles.imageContainer}>
          
            <ImageBackground style = {styles.image} source={(imageSource[i] != null ? { uri: String(imageSource[i]) } : require("../../images/placeholder.jpg") )}>
            <TouchableOpacity onPress={ () => {deletePhoto(i)}}>
            <Text style = {styles.text}> (X) </Text>
            </TouchableOpacity>
            </ImageBackground>
          
          </View>
          )
    } else {
      return (
        <View style = {styles.imageContainer}>
            <Image style = {styles.image} source={ require("../../images/placeholder.jpg") }/>
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
        onPress = {() => 
          {
            if (imageSource.length >=4) {
            alert("too many photos, delete one first to upload more")
            return
        }
            launchCamera({mediaType: "photo", maxHeight: 640, maxWidth: 640}, (response) => {
          if (response.errorCode){
            console.log(response.errorMessage)
          }  else if ( response.didCancel){
            return
          }else {
            if (imageSource.length >=4) {
              alert("too many photos, delete one first to upload more")
              return
          }
            changeImageSource([...imageSource, response.assets[0].uri])
          }
        })}}>
          <Text style = {styles.buttonText}>
            take photo with camera
          </Text>
        </Pressable>
        <View style = {{ flex: 0.1}}/>

        <Pressable style = {styles.button}
        onPress =  {() => {
          if (imageSource.length >=4) {
            alert("too many photos, delete one first to upload more")
            return
        }
          launchImageLibrary({mediaType: "photo", maxHeight: 640, maxWidth: 640}, (response) => {
          if (response.errorCode){
            console.log(response.errorMessage)
          }  else if ( response.didCancel){
            return
          }else {

            if (imageSource.length >=4) {
                alert("too many photos, delete one first to upload more")
                return
            }
            changeImageSource([...imageSource, response.assets[0].uri])
            console.log("done")
          }
        })}}>
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