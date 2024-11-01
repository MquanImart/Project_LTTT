import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";

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
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "white" }}>
                <Image
                    source={require("../../../../assets/images/resetpass.png")}
                    style={{ width: 150, height: 150, marginBottom: 20 }}
                />

                <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Quên mật khẩu</Text>

                <Text style={{ alignSelf: "flex-start", fontSize: 15, marginBottom: 5 }}>Số điện thoại:</Text>
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
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                />

                <TouchableOpacity
                    style={{
                        backgroundColor: "#ddd",
                        padding: 10,
                        borderRadius: 5,
                        width: "100%",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                    onPress={handleSendOtp}
                >
                    <Text style={{ color: "#888", fontSize: 16 }}>Gửi mã OTP</Text>
                </TouchableOpacity>

                <Text style={{ fontSize: 14, marginBottom: 10 }}>
                    Một đoạn mã OTP đã được gửi tới sdt <Text style={{ color: "#4CAF50" }}>{phoneNumber}</Text>
                </Text>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={{
                                borderColor: "#4CAF50",
                                borderBottomWidth: 2,
                                width: 40,
                                textAlign: "center",
                                fontSize: 18,
                                marginHorizontal: 5,
                            }}
                            keyboardType="numeric"
                            maxLength={1}
                            value={digit}
                            onChangeText={(value) => handleOtpChange(value, index)}
                        />
                    ))}
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#4CAF50",
                        padding: 10,
                        borderRadius: 5,
                        width: "100%",
                        alignItems: "center",
                    }}
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
