import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import Styles from "./Styles";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

const ResetPassword = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    const handleSendOtp = () => {
        if (!phoneNumber) {
            Alert.alert("Thông báo", "Vui lòng nhập số điện thoại.");
            return;
        }
        Alert.alert("Thông báo", `OTP đã được gửi tới sdt ${phoneNumber}`);
    };

    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleVerifyOtp = () => {
        if (otp.some((digit) => digit === "")) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ mã OTP.");
            return;
        }
        navigation.navigate("Verify");
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={Styles.container}>
                <Image
                    source={require("../../../../assets/images/resetpass.png")}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />

                <Text style={Styles.texttitle}>Quên mật khẩu</Text>

                <Text style={Styles.textfield}>Số điện thoại:</Text>
                <TextInput
                    style={Styles.textinput}
                    placeholder="Nhập số điện thoại"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <TouchableOpacity
                    style={Styles.btnotp}
                    onPress={handleSendOtp}
                >
                    <Text style={{ color: "#888", fontSize: 16 }}>Gửi mã OTP</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 14, marginBottom: 10 }}>
                    Một đoạn mã OTP đã được gửi tới <Text style={{ color: "#4CAF50" }}>{phoneNumber}</Text>
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={Styles.inputotp}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={Styles.btn}
                    onPress={handleVerifyOtp}
                >
                    <Text style={{ color: "#fff", fontSize: 16 }}>Xác nhận</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSendOtp} style={{ marginTop: 10 }}>
                    <Text>
                        Chưa nhận được mã OTP? <Text style={{ color: "#4CAF50" }}>Gửi lại</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ResetPassword;
