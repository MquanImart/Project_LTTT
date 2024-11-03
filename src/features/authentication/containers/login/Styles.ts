import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20, 
        backgroundColor: "white"
    },
    titletext:{
        fontSize: 30, 
        marginBottom: 20, 
        textAlign: "center",
        fontWeight:"bold"
    },
    textfield:{
        alignSelf: "flex-start", 
        fontSize: 15, 
        marginBottom: 5
    },
    textinput:{
        width: "100%",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    btn:{
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    togglepass:{
        position: "absolute",
        right: 10,
        top: 10,
    },
    textLogin:{
        color: "#fff", 
        fontSize: 16,
        fontWeight:"bold"
    },
    textpass:{
        color: "red", 
        marginBottom: 20
    },
    btnForgot:{
        width: "100%", 
        alignItems: "flex-start", 
        marginTop: 10
    }
})

export default styles;