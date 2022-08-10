import React, {useState} from 'react'
import {ImageBackground, Image, View, Pressable, StyleSheet, Text, Dimensions, TouchableOpacity} from "react-native"
import appStyles from '../../appstyles'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import Icon from 'react-native-vector-icons/AntDesign';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CognitoUserPool,CognitoUserAttribute,CognitoUser,AuthenticationDetails,} from 'amazon-cognito-identity-js';
import { useDispatch } from 'react-redux';

export default function PhotoUploadScreen({navigation}) {
const [imageSource, changeImageSource] = useState([]);
const uploadLink = "https://ez7z5iatzl.execute-api.us-east-1.amazonaws.com/Prod/uploads";
const poolData = {
  UserPoolId: 'us-east-1_ruYdvZa9g', // Your user pool id here
  ClientId: 'q62on7a2t5hac9l2re48kg2j6', // Your client id here
};
const userPool = new CognitoUserPool(poolData);

  //TODO FOR IOS ADD IMAGE PICKER KEYS TO INFOPLIST NSPhotoLibraryUsageDescription

  const deletePhoto = (i) => {
    let photos = [...imageSource];
    photos.splice(i,1)
    changeImageSource(photos)
  }

  const upLoadPhotoBlob =  async (blob, i) => {

    console.log("uploading blob")

    let bodyData = {
      photoNum : i,
      fileType: blob._data.type,
    }
    let session = await EncryptedStorage.getItem("user_session");
    if (session == null) {
      console.log("null user sesssion")
      alert("please log in again")
        navigation.navigate("Landing");
        return 
    }
    let idToken = await (JSON.parse(session).idToken);
    console.log("waiting for upload link")
    let result = await fetch(uploadLink, {
      method: 'POST',
      // mode: 'cors',
      headers: {
        'Content-Type': 'text/plain',
        "Authorization": idToken
      },
      body: JSON.stringify(bodyData)
    })

    
    const resultStatusCode  = result.status;
    result = await result.json()
    console.log("status code: ", resultStatusCode)
    if (resultStatusCode != 401){
      
      let signedURL = result.uploadURL;
      let blobData = blob;
      let result2 = await fetch(signedURL, {
        method: 'PUT',
        body: blobData
      })
      console.log("uploaded photos")

    } else {


      console.log("token expired")
      //await refreshTokens(blob, i);
      
      const session = await EncryptedStorage.getItem("user_session");
      //if there is no session user needs to re-login
      const refresh_token = (JSON.parse(session).refreshToken);
  
      if (refresh_token == null){
        console.log("null refresh token")
        alert("please log in again")
        navigation.navigate("Landing");
        return 
      }
      //get idtoken stored in session
      //use built in check needs Refresh function
      
      const refreshTokenGetter = {
        getToken: function(){
          return refresh_token;
        }
      }
      const username = (JSON.parse(session).username);
      let userData = {
        Username: username,
        Pool: userPool,
      };
      const cognitoUser = new CognitoUser(userData);
      cognitoUser.refreshSession(refreshTokenGetter, async (err, result) => {
        var accessToken = result.getAccessToken().getJwtToken();
        var idToken = result.getIdToken().getJwtToken();
  
        if (err) {
          console.log("err getting result: ", err);
        } else if (accessToken != null) {
          //refresh the token and store it in user_session
          console.log(result)
          await EncryptedStorage.setItem(
            "user_session",
            JSON.stringify({
                idToken : idToken,
                accessToken : accessToken,
                refreshToken: refresh_token,
                username : username,
            })
          );

          let result = await fetch(uploadLink, {
            method: 'POST',
            // mode: 'cors',
            headers: {
              'Content-Type': 'text/plain',
              "Authorization": idToken
            },
            body: JSON.stringify(bodyData)
            })
            
            result = await result.json();
            console.log("uploading using link")
            let signedURL = result.uploadURL;
            let blobData = blob;
            let result2 = await fetch(signedURL, {
                method: 'PUT',
                body: blobData
                
            })
            console.log("uploaded photos")
          
        } else {
          alert("login has expired, please login again")
          navigation.navigate("Landing");
          return
        }
      });

    } 

    


    
  }
  const uploadProfile = async () => {
    //TODO
    //upload profile from redux
    console.log("uploading profile")

  }

  //renders each of the photos on display or a placeholder image
  const renderImage = (i) => {
    if ((imageSource)[i] != null) {
      return (
        <View style = {styles.imageContainer}>  
            <ImageBackground style = {styles.image} source={ { uri: String(imageSource[i]) }  }>
            <TouchableOpacity onPress={ () => {deletePhoto(i)}}>
              <Icon  
              name = "delete" 
              color={"#ff0D0D"}
              style = {{top: 0  , left: 0, height: 30, width: 30, }}/>
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
        
        <Pressable style = {styles.button} onPress = {async () => {
          console.log('pressed continue')
          if (imageSource.length > 0) {
          imageSource.forEach( async (uri, i) => {
            try {
              console.log("getting photo details")
              const result = await fetch(uri);
              console.log("getting photo data")
              const blob = await result.blob(); 
              console.log("uploading photos")
              await upLoadPhotoBlob(blob, i);
            } catch (err){
              alert("something went wrong, please try again later")
              console.log(err)
            }})
          try {
            await uploadProfile();
            navigation.navigate("Main")
          } catch (err){
            alert("something went wrong, please try again later")
            console.log(err)
          }
          
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