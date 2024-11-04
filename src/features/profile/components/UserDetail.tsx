import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Styles from "./Styles";
import { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface UserDetailProps {
    firstName: string;
    setFirstName: (value: string) => void;
    lastName: string;
    setLastName: (value: string) => void;
    birthDate: string;
    setBirthDate: (value: string) => void;
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    address: { province: string; city: string; street: string; number: string };
    setAddress: (value: { province: string; city: string; street: string; number: string }) => void;
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

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
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
                    />
                </View>
            </View>

            <Text>Ngày sinh:</Text>
            <TextInput
                style={Styles.input}
                value={birthDate}
                onChangeText={setBirthDate}
                editable={isEditable} 
                placeholder="Ngày sinh"
            />

            <Text>Số điện thoại:</Text>
            <TextInput
                style={Styles.input}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                editable={isEditable}
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
            />

            <Text>Địa chỉ:</Text>
            <View style={Styles.row}>
                <TextInput
                    style={Styles.addressInput}
                    value={address.province}
                    onChangeText={(value) =>
                        setAddress({ ...address, province: value })
                    }
                    editable={isEditable} 
                    placeholder="Tỉnh/TP"
                />
                <TextInput
                    style={Styles.addressInput}
                    value={address.city}
                    onChangeText={(value) =>
                        setAddress({ ...address, city: value })
                    }
                    editable={isEditable} 
                    placeholder="Quận/Huyện"
                />
                <TextInput
                    style={Styles.addressInput}
                    value={address.street}
                    onChangeText={(value) =>
                        setAddress({ ...address, street: value })
                    }
                    editable={isEditable} 
                    placeholder="Phường/Xã"
                />
                <TextInput
                    style={Styles.addressInput}
                    value={address.number}
                    onChangeText={(value) =>
                        setAddress({ ...address, number: value })
                    }
                    editable={isEditable} 
                    placeholder="Số nhà"
                />
            </View>
            <View style={{ width: "100%", position: "relative", marginTop: 20 }}>
                <Text>Mật khẩu:</Text>
                <TextInput
                    style={Styles.input}
                    placeholder="Mật khẩu"
                    value={password}
                    secureTextEntry={!isPasswordVisible}
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
