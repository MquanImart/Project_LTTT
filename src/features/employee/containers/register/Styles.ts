import Colors from "@/src/styles/Color";
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
    chooseItem: {
        backgroundColor: Colors.mainColor2
    }
})

export default styles;