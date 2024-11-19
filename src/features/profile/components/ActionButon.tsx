import { View, TouchableOpacity, Text } from "react-native";
import Styles from "./Styles";

interface ActionButtonsProps {
    onEditOrSave: () => void;
    buttonText: string;
    onLogout: () => void; 
}

const ActionButtons = ({ onEditOrSave, buttonText, onLogout }: ActionButtonsProps) => {
    return (
        <View style={Styles.buttonContainer}>
            <TouchableOpacity style={Styles.updateButton} onPress={onEditOrSave}>
                <Text style={Styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.logoutButton} onPress={onLogout}>
                <Text style={Styles.buttonText}>Đăng xuất</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ActionButtons;
