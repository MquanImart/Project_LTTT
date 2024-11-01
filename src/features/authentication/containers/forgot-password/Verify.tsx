import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Verify'>;

const Verify = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handlePasswordReset = () => {
        if (!newPassword || !confirmNewPassword) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert("Thông báo", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        Alert.alert("Thành công", "Mật khẩu của bạn đã được đặt lại.");
        navigation.navigate("Login");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white" }}>
                <Image
                    source={require("../../../../assets/images/resetpass.png")}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />

                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Quên mật khẩu</Text>

                <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Mật khẩu mới:</Text>
                <View style={{ width: "100%", position: "relative", marginBottom: 10 }}>
                    <TextInput
                        style={{
                            width: "100%",
                            borderColor: "#ddd",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            paddingRight: 40,
                        }}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={!isPasswordVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{ position: "absolute", right: 10, top: 10 }}
                    >
                        <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#888" />
                    </TouchableOpacity>
                </View>

                <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Nhập lại mật khẩu:</Text>
                <View style={{ width: "100%", position: "relative", marginBottom: 20 }}>
                    <TextInput
                        style={{
                            width: "100%",
                            borderColor: "#ddd",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            paddingRight: 40,
                        }}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!isConfirmPasswordVisible}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                    />
                    <TouchableOpacity
                        onPress={toggleConfirmPasswordVisibility}
                        style={{ position: "absolute", right: 10, top: 10 }}
                    >
                        <Icon name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={20} color="#888" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#4CAF50",
                        padding: 10,
                        borderRadius: 5,
                        width: "100%",
                        alignItems: "center",
                    }}
                    onPress={handlePasswordReset}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Verify;
