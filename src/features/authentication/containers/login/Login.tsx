import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login = () => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const navigation = useNavigation<LoginScreenNavigationProp>();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white" }}>
                <Image
                    source={require("../../../../assets/images/login.png")}
                    style={{ width: 150, height: 150, marginBottom: 20, alignContent: "center" }}
                />

                <Text style={{ fontSize: 30, marginBottom: 20, textAlign: "center" }}>Đăng nhập</Text>

                <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Số điện thoại</Text>
                <TextInput
                    style={{
                        width: "100%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        borderRadius: 5,
                        padding: 10,
                        marginBottom: 10,
                    }}
                    placeholder="Nhập số điện thoại"
                    keyboardType="phone-pad"
                />

                <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5, marginTop: 10 }}>Mật khẩu</Text>

                <View style={{ width: "100%", position: "relative" }}>
                    <TextInput
                        style={{
                            width: "100%",
                            borderColor: "#ddd",
                            borderWidth: 1,
                            borderRadius: 5,
                            padding: 10,
                            paddingRight: 40,
                            marginBottom: 10,
                        }}
                        placeholder="Nhập mật khẩu"
                        secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={{
                            position: "absolute",
                            right: 10,
                            top: 10,
                        }}
                    >
                        <Icon
                            name={isPasswordVisible ? "eye-off" : "eye"}
                            size={20}
                            color="#888"
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#4CAF50",
                        padding: 10,
                        borderRadius: 5,
                        width: "100%",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                    onPress={() => {
                        // Handle sign in
                    }}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Đăng nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("ResetPassword")}
                    style={{ width: "100%", alignItems: "flex-start", marginTop: 10 }}
                >
                    <Text style={{ color: "red", marginBottom: 20 }}>Quên mật khẩu?</Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, width: "100%" }}>
                    <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
                    <Text style={{ marginHorizontal: 10 }}>hoặc đăng nhập với</Text>
                    <View style={{ flex: 1, height: 1, backgroundColor: "#ddd" }} />
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-around", width: "100%", marginTop: 15 }}>
                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <Image
                            source={require("../../../../assets/images/facebook.png")}
                            style={{ width: 40, height: 40 }}
                        />
                        <Text>Facebook</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: "center" }}>
                        <Image
                            source={require("../../../../assets/images/google.png")}
                            style={{ width: 40, height: 40 }}
                        />
                        <Text>Google</Text>
                    </TouchableOpacity>
                </View>

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
