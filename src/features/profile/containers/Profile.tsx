import { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import HeaderProfile from '../components/HeaderProfile';
import UserDetail from '../components/UserDetail';
import Styles from '../components/Styles';
import ActionButtons from '../components/ActionButon';
import Header from '@/src/shared/components/header/Header';
import restClient from '@/src/shared/services/RestClient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/shared/routes/LoginNavigation';
import { useNavigation } from '@react-navigation/native';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

const Profile = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [address, setAddress] = useState({
        province: "",
        city: "",
        street: "",
        number: "",
    });
    const [avatar, setAvatar] = useState("");
    const [password, setPassword] = useState("");
    const [isEditable, setIsEditable] = useState(false);
    const [buttonText, setButtonText] = useState("Sửa thông tin");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem("userId");
                if (!userId) {
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi',
                        text2: 'Không tìm thấy ID người dùng!',
                    });
                    setLoading(false);
                    return;
                }

                const userService = restClient.apiClient.service("/users");
                const result = await userService.get(userId);

                if (result.success) {
                    const user = result.resData;
                    setFirstName(user.personalInfo?.firstName || "");
                    setLastName(user.personalInfo?.lastName || "");
                    setUserName(`${user.personalInfo?.firstName || ""} ${user.personalInfo?.lastName || ""}`);
                    setPhoneNumber(user.account?.phoneNumber || "");
                    setBirthDate(user.personalInfo?.birthDate || "");
                    setAddress({
                        province: user.address?.province || "",
                        city: user.address?.city || "",
                        street: user.address?.street || "",
                        number: user.address?.number || "",
                    });
                    setAvatar(user.avatar || "");
                    setPassword(user.account?.password || "");
                    Toast.show({
                        type: 'success',
                        text1: 'Thành công',
                        text2: 'Dữ liệu người dùng đã được tải.',
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi',
                        text2: `Không thể tải dữ liệu người dùng: ${result.message}`,
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Có lỗi xảy ra khi lấy dữ liệu người dùng.',
                });
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        setUserName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

    const handleEditOrSave = async () => {
        if (isEditable) {
            try {
                const userId = await AsyncStorage.getItem("userId");
                if (!userId) {
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi',
                        text2: 'Không tìm thấy ID người dùng!',
                    });
                    return;
                }

                const userService = restClient.apiClient.service("/users");
                const updateResult = await userService.patch(userId, {
                    personalInfo: {
                        firstName,
                        lastName,
                        birthDate,
                    },
                    account: {
                        phoneNumber,
                        password,
                    },
                    address,
                    avatar,
                });

                if (updateResult.success) {
                    Toast.show({
                        type: 'success',
                        text1: 'Thành công',
                        text2: 'Thông tin đã được cập nhật.',
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Lỗi',
                        text2: `Cập nhật thất bại: ${updateResult.message}`,
                    });
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: 'Lỗi',
                    text2: 'Có lỗi xảy ra khi cập nhật thông tin.',
                });
                console.error("Error updating user data:", error);
            }

            setIsEditable(false);
            setButtonText("Sửa thông tin");
        } else {
            // Khi bấm "Sửa thông tin", cho phép chỉnh sửa
            setIsEditable(true);
            setButtonText("Lưu");
        }
    };

    const handleLogout = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const logoutResponse = await restClient.apiClient.logout({ userId });
        if (logoutResponse.success) {
            navigation.navigate("Login");
        }
    };

    if (loading) {
        return (
            <View>
                <Text>Đang tải...</Text>
            </View>
        );
    }

    return (
        <View>
            <Header title="Hồ sơ" showBackButton={false} />
            <View style={Styles.container}>
                <HeaderProfile userName={userName} phoneNumber={phoneNumber} isEditable={isEditable} avatar={avatar} setAvatar={setAvatar} />
                <UserDetail
                    firstName={firstName}
                    setFirstName={isEditable ? setFirstName : () => {}}
                    lastName={lastName}
                    setLastName={isEditable ? setLastName : () => {}}
                    birthDate={birthDate}
                    setBirthDate={isEditable ? setBirthDate : () => {}}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={isEditable ? setPhoneNumber : () => {}}
                    address={address}
                    setAddress={isEditable ? setAddress : () => {}}
                    password={password}
                    setPassword={isEditable ? setPassword : () => {}}
                    isEditable={isEditable}
                />
                <ActionButtons
                    onEditOrSave={handleEditOrSave}
                    buttonText={buttonText}
                    onLogout={handleLogout} // Truyền hàm logout
                />            </View>
            <Toast />
        </View>
    );
};

export default Profile;
