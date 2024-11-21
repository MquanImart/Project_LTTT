import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import Styles from "./Styles";
import { handleRegister } from "./handleRegister";
import Toast from "react-native-toast-message";
import { ScrollView } from "react-native-gesture-handler";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;
const Register = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
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
    
        if (password.length < 8) {
            Toast.show({
                type: "error",
                text1: "Lỗi mật khẩu",
                text2: "Mật khẩu phải có ít nhất 8 ký tự.",
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
    
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            Toast.show({
                type: "error",
                text1: "Lỗi mật khẩu",
                text2: "Ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 số và 1 ký tự đặc biệt.",
            });
            return;
        }
        await handleRegister(phoneNumber, password, navigation);
    };    

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined} // On iOS, we use padding to avoid the keyboard covering inputs
            >
                <ScrollView>
                <View style={Styles.container}>
                    <Image
                        source={require("../../../../assets/images/login.png")}
                        style={{ width: 150, height: 150, marginBottom: 20, alignContent: "center" }}
                    />
                    <Text style={Styles.texttitle}>Đăng ký</Text>
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
                            placeholderTextColor="#A9A9A9"
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
                            placeholderTextColor="#A9A9A9"
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
                        <Text style={Styles.textbtn}>Đăng ký</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
                        <Text>
                            Bạn đã có tài khoản? <Text style={{ color: "#4CAF50" }}>Đăng nhập</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default Register;
