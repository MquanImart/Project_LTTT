import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { handleUpdateUserInfo } from "./handleRegister";
import { useNavigation, useRoute } from "@react-navigation/native";
import Styles from "./Styles";
import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { StackNavigationProp } from "@react-navigation/stack";
import { RadioButton, Button } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import * as FileSystem from "expo-file-system";

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const RegisterInformation = () => {
    const navigation = useNavigation<RegisterScreenNavigationProp>();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        gender: true, // true: Nam, false: Nữ
        birthDate: "",
        province: "",
        district: "",
        ward: "",
        street: "",
        avatar: null as string | null,
    });

    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [date, setDate] = useState<CalendarDate>(undefined);
    const route = useRoute();
    const { userId } = route.params as { userId: string };

    const handleChooseImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            Toast.show({
                type: "error",
                text1: "Không có quyền truy cập",
                text2: "Vui lòng cấp quyền truy cập thư viện ảnh.",
            });
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const imageUri = result.assets[0].uri;

            try {
                const base64Image = await FileSystem.readAsStringAsync(imageUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });

                setUserInfo((prevUserInfo) => ({
                    ...prevUserInfo,
                    avatar: `data:image/jpeg;base64,${base64Image}`,
                }));

                setImageUri(imageUri);
            } catch (error) {
                console.error("Error converting image to Base64:", error);
                Toast.show({
                    type: "error",
                    text1: "Lỗi khi chuyển đổi ảnh",
                    text2: "Không thể chuyển đổi ảnh sang Base64.",
                });
            }
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setUserInfo({ ...userInfo, [field]: value });
    };

    const onConfirmDate = (selectedDate: Date | null) => {
        if (selectedDate) {
            handleInputChange("birthDate", selectedDate.toISOString().split("T")[0]);
        }
        setOpenDatePicker(false);
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            await handleUpdateUserInfo(userId, userInfo, navigation);
            Toast.show({
                type: "success",
                text1: "Thành công",
                text2: "Cập nhật thông tin cá nhân thành công!",
            });
        } catch (error) {
            console.error("Error updating user info:", error);
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Không thể cập nhật thông tin. Vui lòng thử lại.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : undefined} // On iOS, we use padding to avoid the keyboard covering inputs
            >
                <ScrollView>
                    <View style={Styles.container}>
                        <View style={Styles.img}>
                            <TouchableOpacity onPress={handleChooseImage}>
                                {imageUri ? (
                                    <Image source={{ uri: imageUri }} style={Styles.selectimg} />
                                ) : (
                                    <View style={Styles.selectimg} />
                                )}
                            </TouchableOpacity>
                        </View>
                        <Text style={Styles.texttitle}>Thông tin cá nhân</Text>

                        <Text style={Styles.textfield}>Họ:</Text>
                        <TextInput
                            style={Styles.textinput}
                            placeholder="Nhập họ của bạn"
                            value={userInfo.firstName}
                            onChangeText={(value) => handleInputChange("firstName", value)}
                        />

                        <Text style={Styles.textfield}>Tên:</Text>
                        <TextInput
                            style={Styles.textinput}
                            placeholder="Nhập tên của bạn"
                            value={userInfo.lastName}
                            onChangeText={(value) => handleInputChange("lastName", value)}
                        />

                        <Text style={Styles.textfield}>Giới tính:</Text>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <RadioButton
                                value="Nam"
                                status={userInfo.gender ? "checked" : "unchecked"}
                                onPress={() => handleInputChange("gender", true)}
                            />
                            <Text>Nam</Text>
                            <RadioButton
                                value="Nu"
                                status={!userInfo.gender ? "checked" : "unchecked"}
                                onPress={() => handleInputChange("gender", false)}
                            />
                            <Text>Nữ</Text>
                        </View>

                        <Text style={Styles.textfield}>Ngày sinh:</Text>
                        <Button
                            mode="contained"
                            onPress={() => setOpenDatePicker(true)}
                            contentStyle={{ backgroundColor: "#4CAF50" }}
                        >
                            Chọn Ngày: {userInfo.birthDate ? userInfo.birthDate : "Chưa chọn"}
                        </Button>
                        <DatePickerModal
                            locale="vi"
                            mode="single"
                            visible={openDatePicker}
                            onDismiss={() => setOpenDatePicker(false)}
                            date={date}
                            onConfirm={(params) => onConfirmDate(params.date ?? null)} // Chuyển undefined thành null
                            validRange={{ endDate: new Date() }}
                        />
                        <Text style={Styles.textfield}>Địa chỉ:</Text>
                        <TextInput
                            style={Styles.textinput}
                            placeholder="Tỉnh/TP"
                            value={userInfo.province}
                            onChangeText={(value) => handleInputChange("province", value)}
                        />
                        <TextInput
                            style={Styles.textinput}
                            placeholder="Quận/Huyện"
                            value={userInfo.district}
                            onChangeText={(value) => handleInputChange("district", value)}
                        />
                        <TextInput
                            style={Styles.textinput}
                            placeholder="Phường/Xã"
                            value={userInfo.ward}
                            onChangeText={(value) => handleInputChange("ward", value)}
                        />
                        <TextInput
                            style={Styles.textinput}
                            placeholder="Số nhà"
                            value={userInfo.street}
                            onChangeText={(value) => handleInputChange("street", value)}
                        />
                        <TouchableOpacity
                            style={[
                                Styles.btn,
                                isSubmitting && { backgroundColor: "#ccc" }, // Đổi màu nếu đang xử lý
                            ]}
                            onPress={handleSubmit}
                            disabled={isSubmitting} // Vô hiệu hóa nút nếu đang xử lý
                        >
                            <Text style={{ color: "#fff", fontSize: 16 }}>
                                {isSubmitting ? "Đang xử lý..." : "Cập nhật thông tin cá nhân"}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );
};

export default RegisterInformation;
