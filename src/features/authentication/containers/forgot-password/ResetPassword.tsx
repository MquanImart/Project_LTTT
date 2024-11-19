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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import Styles from "./Styles";
import restClient from "@/src/shared/services/RestClient";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "ResetPassword">;

const ResetPassword = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);

    // Chuẩn hóa số điện thoại
    const formatPhoneNumber = (phone: string): string => {
        if (phone.startsWith("0")) {
            return "+84" + phone.substring(1); // Thay "0" bằng "+84"
        }
        return phone; // Giữ nguyên nếu đã đúng định dạng
    };

// Handle sending OTP
const handleSendOtp = async () => {
    if (!phoneNumber) {
        Alert.alert("Lỗi", "Bạn chưa nhập số điện thoại. Vui lòng nhập số điện thoại của bạn để tiếp tục.");
        return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber); // Chuẩn hóa số điện thoại

    try {
        const result = await restClient.apiClient
            .service("auths/send-otp")
            .create({ phoneNumber: formattedPhone });

        if (result.success) {
            Alert.alert(
                "Thành công",
                `Mã OTP đã được gửi tới số điện thoại ${formattedPhone}. Vui lòng kiểm tra tin nhắn và nhập mã OTP để tiếp tục.`
            );
        } else {
            Alert.alert(
                "Lỗi",
                result.message || "Hệ thống gặp sự cố khi gửi OTP. Vui lòng thử lại sau."
            );
        }
    } catch (error: unknown) {
        // Kiểm tra nếu lỗi là một đối tượng
        if (error && typeof error === "object" && "response" in error) {
            const serverError = error as { response: { data: { message: string } } };
            if (serverError.response?.data?.message) {
                // Lấy thông báo lỗi từ server
                Alert.alert("Lỗi", serverError.response.data.message);
                return;
            }
        }
        // Lỗi mặc định nếu không lấy được thông báo từ server
        Alert.alert("Lỗi", "Đã xảy ra lỗi không xác định khi gửi OTP. Vui lòng thử lại.");
    }
};

    
    

    // Handle OTP input changes
    const handleOtpChange = (value: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    // Handle OTP verification
    const handleVerifyOtp = async () => {
        if (otp.some((digit) => digit === "")) {
            Alert.alert("Thông báo", "Vui lòng nhập đầy đủ mã OTP.");
            return;
        }
    
        const formattedPhone = formatPhoneNumber(phoneNumber); // Chuẩn hóa số điện thoại
        const otpCode = otp.join(""); // Kết hợp các chữ số OTP thành chuỗi
    
        try {
            const result = await restClient.apiClient
                .service("auths/verify-otp")
                .create({ phoneNumber: formattedPhone, otp: otpCode });
    
            if (result.success) {
                Alert.alert("Thông báo", "Xác thực OTP thành công.");
                navigation.navigate("Verify", { phoneNumber });
            } else {
                Alert.alert("Thông báo", result.messages || "OTP không chính xác hoặc đã hết hạn.");
            }
        } catch (error) {
            Alert.alert("Thông báo", "Đã xảy ra lỗi khi xác thực OTP.");
        }
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
                    Một đoạn mã OTP đã được gửi tới{" "}
                    <Text style={{ color: "#4CAF50" }}>{phoneNumber}</Text>
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 20,
                    }}
                >
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
