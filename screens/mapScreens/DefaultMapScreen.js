import MapView, {Marker} from 'react-native-maps';
import {Image, SafeAreaView,Keyboard, TouchableWithoutFeedback, Button, Pressable, Text, StyleSheet, TextInput, View, Dimensions } from 'react-native';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import appStyles from '../../appstyles';
 
//import Geolocation from '@react-native-community/geolocation';

//navigator.geolocation = Geolocation;
// navigator.geolocation = require('@react-native-community/geolocation');
//ANDROID API KEY
const APIKEY = 'AIzaSyBPJ8ulV_4uTx9sp32WSlGowdwq8iQyZhw';
//IOS API KEY
const APIKEYIOS = "";

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
const latitudeDelta = 0.025;
const longitudeDelta = 0.025;

export default function DefaultMapScreen( {navigation}) {

 
//initial region

//49.26146588408733,
//longitude: -123.24044455940835
//TODO replace this with redux
  const [region, changeRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  }
  )

const state = useSelector((state)   => state); 
const pinImage = require("../../images/map-pin.png");


 
// const getAddress = (latitude, longitude) => {
//   //function to get address using current lat and lng
//   fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" 
//   + latitude+"," 
//   +longitude +"&key=" 
//   + APIKEY).then((response) => response.json()).then((responseJson) => {
//      changeRegion(
//        { address:         JSON.stringify(responseJson.results[0].formatted_address)
//         .replace(/"/g, "")
//        });
//      });
//   }

// const onRegionChange = (region) => {
//   changeRegion((region))
// }


 
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {styles.container}>

      
      {/* <View> */}
        <MapView style={styles.map}
        provider={MapView.PROVIDER_GOOGLE}
        showsUserLocation = {true} 
          region={region}
          // onRegionChange={onRegionChange}
          />
    

          <View style = {styles.searchbar}>
          <GooglePlacesAutocomplete
              //currentLocation = {true}
              GooglePlacesSearchQuery={{rankby: "distance"}}
              placeholder='Search'
              nearbyPlacesAPI = "GooglePlacesSearch"
              debounce={400}
              fetchDetails = {true}
              enablePoweredByContainer = {false}
              onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              
              changeRegion({
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              })
              
              
              }}
              query={{
              key: APIKEY,
              language: 'en',
          }}
          />
          </View>
          

       
          <View style={styles.centerMarker}>
          
            <Image style = {styles.marker} 
            source={ pinImage }/>
            
            </View>
           
            
          
     
      <View style = {{flex: 0.3}}>

        <Pressable style = {styles.button}>
          <Text style = {styles.buttonText}>
            send
          </Text>
          </Pressable>
        
        <Pressable style = {styles.button} onPress={() => {
          navigation.goBack()}}>
          <Text style = {styles.buttonText}>
          back
          </Text>
        </Pressable>
      </View>
     

       
    </View>
    </TouchableWithoutFeedback>)
}

const styles = StyleSheet.create( 
  {
    ...appStyles,
    
    container :{
      flex:1, 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',   
    },

    map: {
      
      flex: 1,
      width: "100%",
      height: "100%",
    },
    centerMarker:{
      
        left: '50%',
        marginLeft: -24,
        marginTop: -48,
        position: 'absolute',
        top: '50%'
      
    },
    marker: {
      height: 48,
      width: 48,
      resizeMode: "contain",
    },
    searchbar:{
      width: "100%",
      top: 20,
      position: "absolute",
    }
    
    }
  
)