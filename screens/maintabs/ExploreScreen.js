import { View, Button, Pressable, SafeAreaView, Image, Text, StyleSheet, Dimensions, PanResponder, Animated} from 'react-native';
import   React, { useRef, useState} from 'react';
import { Icon } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width

//example images
//should be replaced by a list of images retrieved from server
const Users = [ 
    { id: "1", image: require("../../images/smile-person.jpeg") },
    { id: "2", image: require("../../images/smile-person2.jpeg")},
    { id: "3", image: require("../../images/heartGPS-logo.png") },
    { id: "4", image: require("../../images/heartGPS-logo.png")},
] 


export default function ExploreScreen({navigation}) {
//initialize pan position
const pan = useRef(new Animated.ValueXY()).current;


//changes position so that cards rotate downwards
const rotate = pan.x.interpolate({
    inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH /2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
})

const rotateTranslate = {
  transform: [{
    rotate: rotate, 
  },
  ...pan.getTranslateTransform(),]
}

//keeps track of when yes and no should be visible
const yesOpacity = pan.x.interpolate({
  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  outputRange: [0, 0, 1],
  extrapolate: 'clamp'
})

const nopeOpacity = pan.x.interpolate({
  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  outputRange: [1, 0, 0],
  extrapolate: 'clamp'
})

// const nextCardOpacity = pan.x.interpolate({
//   inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
//   outputRange: [1, 0, 1],
//   extrapolate: 'clamp'
// })


const nextCardScale = pan.x.interpolate({
  inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
  outputRange: [1, 0.8, 1],
  extrapolate: 'clamp'
})


//keeps track of current card
const [count, setCount] = useState(0);
//const [panResponderEnabled, enablePanResponder] = useState(true);




//initilize panResponder
const panResponder = useRef(
    PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            //return true if user is swiping, return false if it's a single click
                        return !(gestureState.dx === 0 && gestureState.dy === 0)                  
        },
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onPanResponderMove: (evt, gestureState) => {
        //   if(panResponderEnabled){
        //     pan.setValue( { x: 0, y: 0 } ); 
        //  }
            pan.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (evt, gestureState) => {
          if (gestureState.dx > 120) {
            //enablePanResponder((panResponderEnabled)=> false);
          Animated.spring(pan, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(() => {
            pan.setValue({x:0, y:0})
            setCount( (count) => count + 1)})
            //enablePanResponder((panResponderEnabled)=> true);
        } else if (gestureState.dx < -120) {
          //enablePanResponder((panResponderEnabled)=> false);
          Animated.spring(pan, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true
          }).start(
            () => {
              pan.setValue({x:0, y:0})
              setCount( (count) => count + 1)
              //enablePanResponder((panResponderEnabled)=> true);
            })
          }      
          else {
            Animated.spring(pan, {
               toValue: { x: 0, y: 0 },
               useNativeDriver: true,
               friction: 8
               }).start()
            }    
        }
    })
).current;





//function to render the multiple user images and which images should move
const renderUsers = ()=> {
    return Users.map((item, i) => {
      if (i < count) {
          //if the current card is under 
          return null;
      } else if (i === count) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
                key={item.id}
                style={
                [rotateTranslate, 
                styles.animated]
              }>
              <Pressable 
                style = {styles.image} >
                <Image
                quality= {0.5}
                style={styles.image}
                source={ item.image}
                  />
              </Pressable>
              <Animated.View
                style={ [{opacity: yesOpacity},
                styles.yesRotate]}
              >
                <Icon name = "thumb-up"
                color={"green"}
                size = {50}/>
                {/* <Text
                  style={styles.yesText}
                >
                  Yes
                </Text> */}
              </Animated.View>
              <Animated.View
                style={[{opacity: nopeOpacity},styles.noRotate]}
              >
                <Icon name = "thumb-down"
                color={"red"}
                size = {50}/>
              </Animated.View> 
            </Animated.View>
            );
    } else {
      return (
        <Animated.View
          {...panResponder.panHandlers}
          key={item.id}
          style={[
          {//opacity: nextCardOpacity,
          transform: [{ scale: nextCardScale }]},
                        styles.animated] }>
          <Pressable 
            style = {styles.image} >
            <Image
             quality= {0.5}
              style={styles.image}
              source={ item.image}
            />
          </Pressable>
        </Animated.View>
      );}}).reverse(); // if not reversed it will move everything under instead
 };





 // render the screen
    return(
        <SafeAreaView style={styles.container}>

      
          {renderUsers()}
      
          
      </SafeAreaView>
      );
}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    image: {    
        flex: 1,
        height: null,
        width: null,
        resizeMode: "cover",
        borderRadius: 20,
      },
    animated: {   
            height: SCREEN_HEIGHT - 120,
            width: SCREEN_WIDTH,
            padding: 10,
            position:'absolute',    
    },
    yesRotate: {
      transform: [{ rotate: "-30deg" }],
        position: "absolute",
        top: 50,
        left: 40,
        zIndex: 10,
        top: 50,
        left: 40,
    },
    yesText: { 
        color: "green",
        fontSize: 32,
        fontWeight: "800",
        padding: 10,     
    },
    noRotate: {
      transform: [{ rotate: "30deg" }],
      position: "absolute",
      top: 50,
      right: 40,
      zIndex: 10,
    },
    noText: {
      color: "red",
      fontSize: 32,
      fontWeight: "800",
      padding: 10,
     
    }
  });

