import Toast from 'react-native-toast-message';
import { UserRole } from "@/src/interface/interface";
import restClient from "@/src/shared/services/RestClient";

export const handleLogin = async (phoneNumber, password, navigation) => {
    const result = await restClient.apiClient.authentication(phoneNumber, password);
    console.log('userRole', result);

    if (result.success) {
        const userRole = result.data.role;
        console.log('userRole', userRole);

        if (userRole === UserRole.Employee) {
            navigation.navigate("HomeTabEmployee");
        } else if (userRole === UserRole.Customer) {
            navigation.navigate("HomeTabCustomer");
        } else if (userRole === UserRole.Admin) {
            navigation.navigate("HomeTabAdmin");
        } else {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Không xác định được quyền người dùng",
            });
        }
    } else {
        Toast.show({
            type: "error",
            text1: "Đăng nhập thất bại",
            text2: result.messages,
        });
    }
};

export const validatePhoneNumer = async() => {
    
}