import { View, Text, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import Styles from "./Styles";
import Icon from "react-native-vector-icons/Ionicons";

interface HeaderProfileProps {
    userName: string;
    phoneNumber: string;
    isEditable: boolean; 
}

const HeaderProfile = ({ userName, phoneNumber, isEditable }: HeaderProfileProps) => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleChooseImage = async () => {
        if (!isEditable) return; 

        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") return;

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets?.length) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={Styles.headerContainer}>
            <TouchableOpacity onPress={handleChooseImage}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={Styles.profileImage} />
                ) : (
                    <View style={Styles.profileImagePlaceholder} />
                )}
            </TouchableOpacity>

            <View style={Styles.userInfoContainer}>
                <View style={Styles.userInfoRow}>
                    <Icon name="person-circle-outline" size={20} color="black" style={Styles.icon} />
                    <Text style={Styles.userName}>{userName}</Text>
                </View>
                <View style={Styles.userInfoRow}>
                    <Icon name="call-outline" size={20} color="green" style={Styles.icon} />
                    <Text style={Styles.phoneNumber}>{phoneNumber}</Text>
                </View>
            </View>
        </View>
    );
};

export default HeaderProfile;
