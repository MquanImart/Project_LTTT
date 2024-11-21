import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Styles from "./Styles";
import { handleLogin } from "./handleLogin";
import { ScrollView } from "react-native-gesture-handler";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const navigation = useNavigation<LoginScreenNavigationProp>();

    const handlePhoneNumberChange = (text: string) => {
        const filteredText = text.replace(/[^0-9]/g, "");
        setPhoneNumber(filteredText);
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
        
                    <Text style={Styles.titletext}>Đăng nhập</Text>
        
                    <Text style={Styles.textfield}>Số điện thoại</Text>
                    <TextInput
                        style={Styles.textinput}
                        placeholder="Nhập số điện thoại"
                        keyboardType="phone-pad"
                        value={phoneNumber}
                        onChangeText={handlePhoneNumberChange} // Use the new function here
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
                            style={Styles.togglepass}
                        >
                            <Icon
                                name={isPasswordVisible ? "eye-off" : "eye"}
                                size={20}
                                color="#888"
                            />
                        </TouchableOpacity>
                    </View>
        
                    <TouchableOpacity
                        style={Styles.btn}
                        onPress={() => handleLogin(phoneNumber, password, navigation)}
                    >
                        <Text style={Styles.textLogin}>Đăng nhập</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ResetPassword")}
                        style={Styles.btnForgot}
                    >
                        <Text style={Styles.textpass}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
        
                    <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                        <Text>
                            Bạn chưa có tài khoản? <Text style={{ color: "#4CAF50" }}>Đăng ký</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );    
};

export default Login;
