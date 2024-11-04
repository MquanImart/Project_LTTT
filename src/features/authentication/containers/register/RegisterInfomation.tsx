import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Styles from "./Styles";

const RegisterInfomation = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

    const handleChooseImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            setImageUri(result.assets[0].uri);
        }
    };

    return (
        <View style={Styles.container}>
            <View
                style={Styles.img}
            >
                <TouchableOpacity onPress={handleChooseImage}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={Styles.selectimg}/>
                    ) : (
                        <View style={Styles.selectimg}/>
                    )}
                </TouchableOpacity>
            </View>
            <Text style={Styles.texttitle}>Thông tin cá nhân</Text>

            <Text style={Styles.textfield}>Họ:</Text>
            <TextInput
                style={Styles.textinput}
                placeholder="Nhập họ của bạn"
            />

            <Text style={Styles.textfield}>Tên:</Text>
            <TextInput
                style={Styles.textinput}
                placeholder="Nhập tên của bạn"
            />

            <Text style={Styles.textfield}>Ngày sinh:</Text>
            <TextInput
                style={Styles.textinput}
                placeholder="Nhập ngày sinh của bạn"
            />

            <Text style={Styles.textfield}>Địa chỉ:</Text>
                <TextInput
                    style={Styles.textinput}
                    placeholder="Tỉnh/TP"
                />
                <TextInput
                    style={Styles.textinput}
                    placeholder="Quận/Huyện"
                />

                <TextInput
                    style={Styles.textinput}
                    placeholder="Phường/Xã"
                />
                <TextInput
                    style={Styles.textinput}
                    placeholder="Số nhà"
                />

            <TouchableOpacity
                style={Styles.btn}
                onPress={() => { /* Handle sign up */ }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>Đăng ký thông tin cá nhân</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterInfomation;
