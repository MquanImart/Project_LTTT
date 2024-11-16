import Toast from "react-native-toast-message";
import restClient from "@/src/shared/services/RestClient";

export const handleRegister = async (phoneNumber, password, navigation) => {
    try {
        const result = await restClient.customerClient.create({phoneNumber,password});
        if (result.success) {
          navigation.navigate("RegisterInfomation", { userId: result.resData._id });
        } else {
            Toast.show({
                type: "error",
                text1: "Đăng ký thất bại",
                text2: result.messages || "Vui lòng thử lại sau.",
            });
        }
    } catch (error) {
        console.error("Register error:", error);

        if (error.response) {
            console.error("Error response:", error.response.data);
            Toast.show({
                type: "error",
                text1: "Đã có lỗi server xảy ra khi đăng ký",
                text2: error.response.data.message || "Vui lòng thử lại sau.",
            });
        } else {
            Toast.show({
                type: "error",
                text1: "Lỗi kết nối với server",
                text2: "Vui lòng kiểm tra kết nối mạng và thử lại.",
            });
        }
        return { success: false, message: "Đã có lỗi xảy ra khi đăng ký" };
    }
};

export const handleUpdateUserInfo = async (userId, userInfo, navigation) => {
  try {
      const { firstName, lastName, gender, birthDate, province, district, ward, street, avatar } = userInfo;

      const dataUpdate = {
          personalInfo: {
              firstName,
              lastName,
              gender,
              birthDate, // Giữ nguyên giá trị chuỗi
          },
          address: {
              province,
              district,
              ward,
              street,
          },
          avatar: avatar || "",
      };

      console.log("Payload gửi lên server:", dataUpdate); // Debug để kiểm tra dữ liệu

      const result = await restClient.usersClient.patch(userId, dataUpdate);

      if (result.success) {
          Toast.show({
              type: "success",
              text1: "Cập nhật thành công",
              text2: "Thông tin cá nhân đã được cập nhật.",
          });

          navigation.goBack();
      } else {
          Toast.show({
              type: "error",
              text1: "Cập nhật thất bại",
              text2: result.messages || "Vui lòng thử lại sau.",
          });
      }
  } catch (error) {
      console.error("Error updating user:", error);

      Toast.show({
          type: "error",
          text1: "Lỗi hệ thống",
          text2: "Vui lòng kiểm tra lại kết nối mạng.",
      });
  }
};
