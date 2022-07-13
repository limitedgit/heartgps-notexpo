import React, {useState} from 'react'
import {ImageBackground, Image, View, Pressable, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native"
import appStyles from '../../appstyles'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Icon } from 'react-native-elements'
import EncryptedStorage from 'react-native-encrypted-storage';

export default function PhotoUploadScreen({navigation}) {
const [imageSource, changeImageSource] = useState([]);
const uploadLink = "https://ez7z5iatzl.execute-api.us-east-1.amazonaws.com/Prod/uploads";

  //TODO FOR IOS ADD IMAGE PICKER KEYS TO INFOPLIST

  const deletePhoto = (i) => {
    let photos = [...imageSource];
    photos.splice(i,1)
    changeImageSource(photos)
  }

  const upLoadPhotoURI =  async (blob, i) => {
    //TODO 
    //upload blob data to dynamodb through api call
    const session = await EncryptedStorage.getItem("user_session");
    const idToken = (JSON.parse(session).idToken);
    // console.log(String(idToken));
    
    let bodyData = {
      uid : "fakeuser",
      photoNum : 1
    }
    let result = await fetch(uploadLink, {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'text/plain',
        "Authorization": idToken
      },
      body: JSON.stringify(bodyData)
    })
    result = await result.json()
    console.log("result: ", result)
    let signedURL = result.uploadURL;
    console.log("url ", signedURL)

    let blobData = blob;
    const result2 = await fetch(signedURL, {
      method: 'PUT',
      body: blobData
    })


    
  }
  const uploadProfile = () => {
    //TODO
    //upload profile from redux
  }

  //renders each of the photos on display or a placeholder image
  const renderImage = (i) => {
    if ((imageSource)[i] != null) {
      return (
        <View style = {styles.imageContainer}>  
            <ImageBackground style = {styles.image} source={ { uri: String(imageSource[i]) }  }>
            <TouchableOpacity onPress={ () => {deletePhoto(i)}}>
              <Icon style = {{top: 0  , left: 0, height: 30, width: 30, }} name = "delete" backgroundColor={"#ff0D0D"}/>
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
              alert("too many photos, delete a photo first to upload more \n (to delete tap red icon on photo)")
              return
            }
              launchCamera({mediaType: "photo", maxHeight: 640, maxWidth: 640}, (response) => {
            if (response.errorCode){
              console.log(response.errorMessage)
            }  else if ( response.didCancel){
              return
            }else {
              if (imageSource.length >=4) {
                return
              }
              changeImageSource([...imageSource, response.assets[0].uri])
            }
            })
          }}>
          <Text style = {styles.buttonText}>
            take photo with camera
          </Text>
        </Pressable>
        <View style = {{ flex: 0.1}}/>

        <Pressable style = {styles.button}
        onPress =  {() => {
            if (imageSource.length >=4) {
              alert("too many photos, delete a photo first to upload more \n (to delete tap red icon on photo)")
              return
            }
            launchImageLibrary({mediaType: "photo", maxHeight: 640, maxWidth: 640}, (response) => {
            if (response.errorCode){
              console.log(response.errorMessage)
            }  else if ( response.didCancel){
              return
            }else {

              if (imageSource.length >=4) {
                  return
              }
              changeImageSource([...imageSource, response.assets[0].uri])
              console.log("done")
            }
        })}}>
          <Text style = {styles.buttonText}>
            choose from image library
          </Text>
        </Pressable>
        <View style = {{ flex: 0.1}}/>

        <View style = {{flex: 0.2}}/>
        
        <Pressable style = {styles.button} onPress = {() => {
          if (imageSource.length > 0) {
          imageSource.forEach( async (uri, i) => {
            try {
              const result = await fetch(uri);
              const blob = await result.blob(); 
              await upLoadPhotoURI(blob, i);
              await uploadProfile();

            } catch (err){
              alert("something went wrong, please try again later")
              console.log(err)
            }
           
          })
        } else {
          alert("please choose at least one photo to upload")
        }
        }}>
          <Text style = {styles.buttonText}> continue</Text>
           
        </Pressable>

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