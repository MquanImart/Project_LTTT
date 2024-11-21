import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView} from "react-native";
import Styles from "./Styles";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { DatePickerModal } from "react-native-paper-dates";

interface UserDetailProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    birthDate: string;
    setBirthDate: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    address: { province: string; district: string; ward: string; street: string };
    setAddress: (value: { province: string; district: string; ward: string; street: string }) => void;
    password: string;
    setPassword: (value: string) => void;
    isEditable: boolean;
}

const UserDetail = ({
    firstName,
    setFirstName,
    lastName,
    setLastName,
    birthDate,
    setBirthDate,
    phoneNumber,
    setPhoneNumber,
    address,
    setAddress,
    password,
    setPassword,
    isEditable,
}: UserDetailProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleDateConfirm = (date: Date | undefined) => {
        if (date) {
            setBirthDate(date.toISOString().split("T")[0]);
        }
        setOpenDatePicker(false);
    };

    return (
        <View style={Styles.formContainer}>
            <View style={Styles.row}>
                <View style={Styles.inputGroup}>
                    <Text>Họ:</Text>
                    <TextInput
                        style={Styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                        editable={isEditable}
                        placeholder="Họ"
                        placeholderTextColor="#A9A9A9"
                    />
                </View>
                <View style={Styles.inputGroup}>
                    <Text>Tên:</Text>
                    <TextInput
                        style={Styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                        editable={isEditable}
                        placeholder="Tên"
                        placeholderTextColor="#A9A9A9"
                    />
                </View>
            </View>

            <Text>Ngày sinh:</Text>
            <TouchableOpacity
                onPress={() => setOpenDatePicker(true)}
                disabled={!isEditable}
                style={{
                    backgroundColor: isEditable ? "#4CAF50" : "#ccc",
                    padding: 10,
                    borderRadius: 5,
                    alignItems: "center",
                }}
            >
                <Text style={{ color: "white" }}>{birthDate || "Chưa chọn"}</Text>
            </TouchableOpacity>
            <DatePickerModal
                locale="vi" // Tiếng Việt
                mode="single"
                visible={openDatePicker}
                onDismiss={() => setOpenDatePicker(false)}
                date={birthDate ? new Date(birthDate) : undefined} // Hiển thị ngày từ database
                onConfirm={(params) => handleDateConfirm(params.date)}
                validRange={{ endDate: new Date() }}
            />

            <Text style={{ marginTop: 20 }}>Số điện thoại:</Text>
            <TextInput
                style={Styles.input}
                value={phoneNumber}
                editable={isEditable}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
            />

            <Text>Địa chỉ:</Text>
            <View style={Styles.column}>
                <TextInput
                    style={Styles.addressInput}
                    value={address.province}
                    onChangeText={(value) =>
                        setAddress({ ...address, province: value })
                    }
                    editable={isEditable}
                    placeholder="Tỉnh/TP"
                    placeholderTextColor="#A9A9A9"
                />
                <TextInput
                    style={Styles.addressInput}
                    value={address.district}
                    onChangeText={(value) =>
                        setAddress({ ...address, district: value })
                    }
                    editable={isEditable}
                    placeholder="Quận/Huyện"
                    placeholderTextColor="#A9A9A9"
                />
                <TextInput
                    style={Styles.addressInput}
                    value={address.ward}
                    onChangeText={(value) =>
                        setAddress({ ...address, ward: value })
                    }
                    editable={isEditable}
                    placeholder="Phường/Xã"
                    placeholderTextColor="#A9A9A9"
                />
                <TextInput
                    style={Styles.addressInput}
                    value={address.street}
                    onChangeText={(value) =>
                        setAddress({ ...address, street: value })
                    }
                    editable={isEditable}
                    placeholder="Số nhà"
                    placeholderTextColor="#A9A9A9"
                />
            </View>
            <View style={{ width: "100%", position: "relative", marginTop: 20 }}>
                <Text>Mật khẩu:</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={setPassword}
                    editable={isEditable}
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
        </View>
    );
};

export default UserDetail;
