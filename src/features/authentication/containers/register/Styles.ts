import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white"
    },
    texttitle: {
        fontSize: 30,
        marginBottom: 20,
        textAlign: "center",
        fontWeight:"bold"
    },
    textfield: {
        alignSelf: "flex-start",
        fontSize: 15,
        marginBottom: 5
    },
    textinput: {
        width: "100%",
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 15,
    },
    iconeye: {
        position: "absolute",
        right: 10,
        top: 10,
    },
    btn: {
        backgroundColor: "#4CAF50",
        padding: 10,
        borderRadius: 5,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    textbtn: {
        color: "#fff",
        fontSize: 16,
        fontWeight:"bold"
    },
    img: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        marginBottom: 20
    },
    selectimg:{
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        backgroundColor: "#ddd"
    },
    viewdc:{
        flexDirection: "row", 
        justifyContent: "space-between", 
        width: "100%"
    }
})

export default styles;