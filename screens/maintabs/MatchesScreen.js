import React from 'react';
import {View, ScrollView ,TouchableOpacity, SafeAreaView, Text, Button, StyleSheet, Image, Dimensions} from 'react-native';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

const Matches = [ 
    { id: "1", image: require("../../images/smile-person.jpeg")},
    { id: "2", image: require("../../images/smile-person2.jpeg")},
    // { id: "3", image: {uri: "https://reactjs.org/logo-og.png"} },
    // { id: "4", image: {uri: "https://reactjs.org/logo-og.png"} },
    // { id: "5", image: {uri: "https://reactjs.org/logo-og.png"} },  
] 


const getMatches = async () =>{
  //TODO 
  //get matches from backend and load into Matches
}

export default function ProfileScreen({navigation}) {
  
  console.log("")

const renderMatches =  Matches.map( (item, i) => {

  return (

    <TouchableOpacity 
    style = {styles.topacity} 
    key = {i} 
    activeOpacity = {0.9}
    onPress = {() => {
      navigation.navigate("DefaultMap");
    }}>
      <Image style = {styles.image} source = {item.image}/>
    </TouchableOpacity>

    

  );


 })


    imageSource =  {uri: "https://reactjs.org/logo-og.png"};
    return (
        <SafeAreaView style = {styles.container}>
          <ScrollView style = {styles.scrollView}>
          {renderMatches}
          </ScrollView>
           
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container :{
        flex:1, 
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: 'center',
    },
    image : {

        resizeMode: "cover",  
        width: SCREEN_WIDTH *0.2,   
        height: SCREEN_HEIGHT*0.1,
        right: 0,
    },
    topacity:{
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT*0.1,
        borderWidth: 1, 
        borderRadius: 15,

    },
    scrollView: {
    
   
    },
    filler: {
      flex: 1,
    }

        
})