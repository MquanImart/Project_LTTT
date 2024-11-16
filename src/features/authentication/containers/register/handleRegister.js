import Toast from "react-native-toast-message";
import restClient from "@/src/shared/services/RestClient";

export const handleRegister = async (phoneNumber, password, navigation) => {
    try {
        const result = await restClient.customerClient.create(phoneNumber,password);

        console.log("result:", result);

        if (result.success) {
            navigation.navigate("RegisterInfomation");
        } else {
            Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: result.messages || "Vui lòng thử lại sau.",
            });
        }
    } catch (error) {
        console.error("Register error:", error);

        // Kiểm tra lỗi chi tiết
        if (error.response) {
            // Lỗi từ server
            console.error("Error response:", error.response.data);
            Toast.show({
                type: "error",
                text1: "Đã có lỗi server xảy ra khi đăng ký",
                text2: error.response.data.message || "Vui lòng thử lại sau.",
            });
        } else {
            // Lỗi không phải từ server
            Toast.show({
                type: "error",
                text1: "Lỗi kết nối với server",
                text2: "Vui lòng kiểm tra kết nối mạng và thử lại.",
            });
        }

        return { success: false, message: "Đã có lỗi xảy ra khi đăng ký" };
    }
};
