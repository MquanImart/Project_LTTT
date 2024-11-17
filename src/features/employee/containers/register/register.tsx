import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Styles from "../board/Styles";
import { handleRegister } from "./handleRegister";
import Toast from "react-native-toast-message";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ManageEmployeeStackParamList } from "@/src/shared/routes/ManageEmployeeNav";

type DetailEmployeeNavigationProp = NativeStackNavigationProp<ManageEmployeeStackParamList, 'Employee'>;
const Register = () => {
    const navigation = useNavigation<DetailEmployeeNavigationProp>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const handleRegisterWithValidation = async () => {
        if (phoneNumber.length !== 10) {
            Toast.show({
                type: "error",
                text1: "Lỗi số điện thoại",
                text2: "Số điện thoại phải có đúng 10 chữ số.",
            });
            return;
        }

        if (password.length < 6) {
            Toast.show({
                type: "error",
                text1: "Lỗi mật khẩu",
                text2: "Mật khẩu phải có ít nhất 6 ký tự.",
            });
            return;
        }

        if (password !== confirmPassword) {
            Toast.show({
                type: "error",
                text1: "Lỗi mật khẩu",
                text2: "Mật khẩu và nhập lại mật khẩu không khớp.",
            });
            return;
        }

        await handleRegister(phoneNumber, password, navigation);
    };

    return (
        <View style={Styles.container}>
            <Image
                source={require("../../../../assets/images/login.png")}
                style={{ width: 150, height: 150, marginBottom: 20, alignContent: "center" }}
            />
            <Text style={Styles.texttitle}>Tạo tài khoản Nhân viên</Text>
            <Text style={Styles.textfield}>Số điện thoại</Text>
            <TextInput
                style={Styles.textinput}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={phoneNumber}
                onChangeText={(value) => {
                    if (/^\d*$/.test(value) && value.length <= 10) {
                        setPhoneNumber(value);
                    }
                }}
                onBlur={() => {
                    if (phoneNumber.length !== 10) {
                        Toast.show({
                            type: "error",
                            text1: "Lỗi số điện thoại",
                            text2: "Số điện thoại phải có đúng 10 chữ số.",
                        });
                    }
                }}
            />
            <Text style={Styles.textfield}>Mật khẩu</Text>
            <View style={{ width: "100%", position: "relative" }}>
                <TextInput
                    style={Styles.textinput}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={!isPasswordVisible}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    onPress={togglePasswordVisibility}
                    style={Styles.iconeye}
                >
                    <Icon name={isPasswordVisible ? "eye-off" : "eye"} size={20} color="#888" />
                </TouchableOpacity>
            </View>
            <Text style={Styles.textfield}>Nhập lại mật khẩu</Text>
            <View style={{ width: "100%", position: "relative" }}>
                <TextInput
                    style={Styles.textinput}
                    placeholder="Nhập lại mật khẩu"
                    secureTextEntry={!isConfirmPasswordVisible}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
                <TouchableOpacity
                    onPress={toggleConfirmPasswordVisibility}
                    style={Styles.iconeye}
                >
                    <Icon name={isConfirmPasswordVisible ? "eye-off" : "eye"} size={20} color="#888" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={Styles.btn}
                onPress={handleRegisterWithValidation} 
            >
                <Text style={Styles.textbtn}>Tạo</Text>
            </TouchableOpacity>

        </View>
    );
};

export default Register;
