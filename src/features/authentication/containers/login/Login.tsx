import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Styles from "./Styles";
import restClient from "@/src/shared/services/RestClient";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState<string>("");

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const navigation = useNavigation<LoginScreenNavigationProp>();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                    onChange={() => {}}
                />

                <Text style={Styles.textfield}>Mật khẩu</Text>

                <View style={{ width: "100%", position: "relative" }}>
                    <TextInput
                        style={Styles.textinput}
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={!isPasswordVisible}
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
                    onPress={async () => {
                        const result = await restClient.apiClient.authentication(phoneNumber, "password");
                        if (result.success){
                            //Chuyeenr trang
                        } else {
                            // In thong bao
                        }
                    }}
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

                <TouchableOpacity onPress={() => navigation.navigate("HomeTabEmployee")} style={{ marginTop: 20 }}>
                    <Text style={{ color: "#4CAF50" }}>Employee</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("HomeTabCustomer")} style={{ marginTop: 10 }}>
                    <Text style={{ color: "#4CAF50" }}>Customer</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("HomeTabAdmin")} style={{ marginTop: 10 }}>
                    <Text style={{ color: "#4CAF50" }}>ADmin</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Login;
