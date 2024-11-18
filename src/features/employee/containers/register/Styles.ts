import { StyleSheet } from "react-native";
import Colors from "@/src/styles/Color";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white",
    },
    texttitle: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: "center",
        fontWeight: "bold",
        color: Colors.mainColor1,
    },
    listContainer: {
        flexGrow: 1,
    },
    item: {
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        backgroundColor: Colors.grey,
        justifyContent: "center",
    },
    itemText: {
        fontSize: 16,
        color: Colors.lightGrey,
        fontWeight: "500",
    },
    chooseItem: {
        backgroundColor: Colors.mainColor2,
        borderWidth: 2,
        borderColor: Colors.mainColor1,
    },
    itemTextChosen: {
        color: "white",
    },
    submitButton: {
        padding: 15,
        borderRadius: 8,
        backgroundColor: Colors.mainColor1,
        alignItems: "center",
    },
    submitButtonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "600",
    },
});

export default styles;
