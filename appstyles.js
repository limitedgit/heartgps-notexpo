import { StyleSheet, Dimensions } from "react-native";
const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width


const appStyles = StyleSheet.create({
    phoneTextInput:{
        borderWidth: 1,
        height: SCREEN_HEIGHT/15,
        fontSize: SCREEN_HEIGHT/30,
        borderRadius: 15,
        backgroundColor: "#FDFDFD",
      
    },
    container :{
        flex:1, 
        flexDirection: 'column',
        padding: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    code: {
        width: SCREEN_WIDTH *0.75,
        borderWidth: 1,
        height: SCREEN_HEIGHT/15,
        borderRadius: 15,
        color: "#FDFDFD"
    },
    input:{
        color: "#212121",
    },
    Title: {
        fontSize: SCREEN_WIDTH/20,
        color: "#FDFDFD"
    }, button: {
        padding: 10,
        borderRadius: 15, 
        borderWidth: 1,
        backgroundColor: "#4B4B4B",
        
    },
    buttonText: {
        fontSize: 15,
        color: '#D7D7D7',
    },
    text: {
        color: "#D7D7D7"
    },

})
export default appStyles;