import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        padding: 20, 
        backgroundColor: "white"
    },
    texttitle:{
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 20
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
    btnotp:{
        backgroundColor: "#ddd",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    inputotp:{
        borderColor: "#4CAF50",
        borderBottomWidth: 2,
        width: 40,
        textAlign: "center",
        fontSize: 18,
        marginHorizontal: 5,
    },
    btn:{
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
    },
    viewinput:{
        width: "100%", 
        position: "relative", 
        marginBottom: 10
    }, 
    logo:{
        width: 150, 
        height: 150, 
        marginBottom: 20
    },
    btnicon:{
        position: "absolute", 
        right: 10, 
        top: 10
    },
    textbtn:{
        color: "#fff", 
        fontSize: 16,
        fontWeight:'bold'
    }
})

export default styles;