import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import Styles from "./Styles";
import restClient from "@/src/shared/services/RestClient"; // Import your API client

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Verify">;
type VerifyScreenRouteProp = RouteProp<RootStackParamList, "Verify">;

const Verify = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const route = useRoute<VerifyScreenRouteProp>();
    const phoneNumber = route.params.phoneNumber; // Get phoneNumber from route.params

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

    const handlePasswordReset = async () => {
        if (!newPassword || !confirmNewPassword) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Alert.alert("Thông báo", "Mật khẩu mới và xác nhận mật khẩu không khớp.");
            return;
        }

        try {
            const result = await restClient.apiClient
                .service("auths/reset-password")
                .create({
                    phoneNumber,
                    newPassword,
                });

            if (result.success) {
                Alert.alert("Thành công", "Mật khẩu của bạn đã được đặt lại.");
                navigation.navigate("Login");
            } else {
                Alert.alert("Thông báo", result.message || "Đặt lại mật khẩu thất bại.");
            }
        } catch (error) {
            Alert.alert("Thông báo", "Đã xảy ra lỗi khi đặt lại mật khẩu.");
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={Styles.container}>
                <Image
                    source={require("../../../../assets/images/resetpass.png")}
                    style={Styles.logo}
                />

                <Text style={Styles.texttitle}>Đặt lại mật khẩu</Text>

                <Text style={Styles.textfield}>Mật khẩu mới:</Text>

                <View style={Styles.viewinput}>
                    <TextInput
                        style={Styles.textinput}
                        placeholder="Nhập mật khẩu mới"
                        secureTextEntry={!isPasswordVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={Styles.btnicon}
                    >
                        <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#888" />
                    </TouchableOpacity>
                </View>

                <Text style={Styles.textfield}>Nhập lại mật khẩu:</Text>

                <View style={Styles.viewinput}>
                    <TextInput
                        style={Styles.textinput}
                        placeholder="Nhập lại mật khẩu"
                        secureTextEntry={!isConfirmPasswordVisible}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                    />
                    <TouchableOpacity
                        onPress={toggleConfirmPasswordVisibility}
                        style={Styles.btnicon}
                    >
                        <Icon name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={20} color="#888" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={Styles.btn}
                    onPress={handlePasswordReset}
                >
                    <Text style={Styles.textbtn}>Xác nhận</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Verify;
