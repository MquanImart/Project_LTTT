import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

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
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white" }}>
            <View
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    marginBottom: 10
                }}
            >
                <TouchableOpacity onPress={handleChooseImage}>
                    <Image
                        source={imageUri ? { uri: imageUri } : require('../../../../assets/images/login.png')}
                        style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: "#ddd" }}
                    />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign: "center" }}>Thông tin cá nhân</Text>

            <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Họ:</Text>
            <TextInput
                style={{
                    width: "100%",
                    borderColor: "#ddd",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                }}
                placeholder="Nhập họ của bạn"
            />

            <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Tên:</Text>
            <TextInput
                style={{
                    width: "100%",
                    borderColor: "#ddd",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                }}
                placeholder="Nhập tên của bạn"
            />

            <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Ngày sinh:</Text>
            <TextInput
                style={{
                    width: "100%",
                    borderColor: "#ddd",
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 10,
                    marginBottom: 10,
                }}
                placeholder="Nhập ngày sinh của bạn"
            />

            <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Địa chỉ:</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <TextInput
                    style={{
                        width: "48%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Tỉnh/TP"
                />
                <TextInput
                    style={{
                        width: "48%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Quận/Huyện"
                />
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
                <TextInput
                    style={{
                        width: "48%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Phường/Xã"
                />
                <TextInput
                    style={{
                        width: "48%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Số nhà"
                />
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "#4CAF50",
                    padding: 10,
                    borderRadius: 5,
                    width: "100%",
                    alignItems: "center",
                    marginTop: 20,
                }}
                onPress={() => { /* Handle sign up */ }}
            >
                <Text style={{ color: "#fff", fontSize: 16 }}>Đăng ký thông tin cá nhân</Text>
            </TouchableOpacity>
        </View>
    );
};

export default RegisterInfomation;
