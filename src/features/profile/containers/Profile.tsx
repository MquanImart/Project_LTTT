import { useState, useEffect } from 'react';
import { View } from 'react-native';
import Header from '@/src/shared/components/Header';
import HeaderProfile from '../components/HeaderProfile';
import UserDetail from '../components/UserDetail';
import Styles from '../components/Styles';
import ActionButtons from '../components/ActionButon';

const Profile = () => {
    const [firstName, setFirstName] = useState("Phan");
    const [lastName, setLastName] = useState("Minh Quân");
    const [userName, setUserName] = useState(`${firstName} ${lastName}`);
    const [phoneNumber, setPhoneNumber] = useState("0765058830");
    const [birthDate, setBirthDate] = useState("11/11/2003");
    const [address, setAddress] = useState({
        province: "Đồng Tháp",
        city: "Cao Lãnh",
        street: "XYZ",
        number: "123",
    });
    const [password, setPassword] = useState("123");

    // State để kiểm soát chế độ chỉnh sửa
    const [isEditable, setIsEditable] = useState(false);

    // State để kiểm soát văn bản nút
    const [buttonText, setButtonText] = useState("Sửa thông tin");

    // useEffect để cập nhật userName khi firstName hoặc lastName thay đổi
    useEffect(() => {
        setUserName(`${firstName} ${lastName}`);
    }, [firstName, lastName]);

    const handleEditOrSave = () => {
        if (isEditable) {
            // Khi bấm "Lưu", lưu thông tin và không cho chỉnh sửa
            setIsEditable(false);
            setButtonText("Sửa thông tin");
            // Thêm logic lưu thông tin nếu cần (như gửi thông tin lên server)
        } else {
            // Khi bấm "Sửa thông tin", cho phép chỉnh sửa
            setIsEditable(true);
            setButtonText("Lưu");
        }
    };

    return (
        <View>
            <Header title="Profile" onBackPress={() => { /* Xử lý khi nhấn nút quay lại */ }} />
            <View style={Styles.container}>
                {/* Truyền trạng thái isEditable vào HeaderProfile */}
                <HeaderProfile userName={userName} phoneNumber={phoneNumber} isEditable={isEditable} />
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
                <ActionButtons onEditOrSave={handleEditOrSave} buttonText={buttonText} />
            </View>
        </View>
    );
}

export default Profile;
