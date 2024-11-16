import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import Styles from "./Styles";
import { handleRegister } from "./handleRegister";

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

    return (
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
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
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
                    onPress={()=> handleRegister(phoneNumber, password, navigation)}
                >
                    <Text style={Styles.textbtn}>Đăng ký</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
                    <Text>
                        Bạn đã có tài khoản? <Text style={{ color: "#4CAF50" }}>Đăng nhập</Text>
                    </Text>
                </TouchableOpacity>
            </View>
    );
};

export default Register;
