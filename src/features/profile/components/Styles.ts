
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        padding: 20
    },
    headerContainer: {
        alignItems: "center",
        marginBottom: 20,
        flexDirection:"row",
        justifyContent:"space-around"
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 100,
        marginBottom: 10,
    },
    profileImagePlaceholder: {
        width: 150,
        height: 150,
        borderRadius: 75, 
        backgroundColor: "#ddd",
        marginBottom: 10,
        justifyContent: "center", 
        alignItems: "center",
    },    
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10
    },
    phoneNumber: {
        color: "green",
        fontSize: 18
    },
    formContainer: {
        marginBottom: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    column: {
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 10,
    },
    inputGroup: {
        flex: 1,
        marginRight: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        borderRadius: 5,
        marginBottom: 20,
    },
    addressInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 16,
        borderRadius: 5,
        marginRight: 5,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    updateButton: {
        backgroundColor: "green",
        padding: 10,
        borderRadius: 5,
    },
    logoutButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
    userInfoContainer: {
        alignItems: "flex-start",
        marginTop: 10,
    },
    userInfoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    icon: {
        marginRight: 8, 
    },
    pass:{
        marginTop: 20
    },
    togglepass:{
        position: "absolute",
        right: 10,
        top: 25,
    }
});

