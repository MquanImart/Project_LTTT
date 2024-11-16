import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

class RestClient {
  baseURL: string = "http://127.0.0.1:8080"; // Điều chỉnh URL khi build app
  path: string = "";
  token: string = "";

  public service(path: string): RestClient {
    const client = new RestClient();
    client.path = path;
    client.token = this.token;
    return client;
  }

  private async loadToken() {
    this.token = (await AsyncStorage.getItem("token")) || "";
  }

  private ErrorMessage(err: unknown, message: string){
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || "Lỗi kết nối với server";
      Toast.show({
        type: "error",
        text1: message,
        text2: errorMessage,
      });
      return {
        success: false,
        data: null,
        messages: errorMessage,
      };
    } else {
      // Nếu không phải AxiosError, trả về lỗi chung
      Toast.show({
        type: "error",
        text1: "Có lỗi xảy ra",
        text2: "Đã xảy ra lỗi không xác định",
      });
      return {
        success: false,
        data: null,
        messages: "Đã xảy ra lỗi không xác định",
      };
    }
  }

  public async authentication(phoneNumber: string, password: string) {
    try {
      const response = await axios.post(`${this.baseURL}/auths/login`, { phoneNumber, password });
      console.log('rs', response.data)
      if (response.data.success) {
        // Lưu thông tin người dùng
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("userId", response.data.resData.id);
        this.token = response.data.token;

        Toast.show({
          type: "success",
          text1: "Đăng nhập thành công",
        });

        return {
          success: true,
          data: response.data.resData,
          messages: response.data.messages,
        };
      } else {
        Toast.show({
          type: "error",
          text1: "Đăng nhập thất bại",
        });

        return {
          success: false,
          data: null,
          messages: "Tên đăng nhập hoặc mật khẩu không đúng",
        };
      }
    } catch (err) {
      return this.ErrorMessage(err, "Tên đăng nhập hoặc mật khẩu không đúng");
    }
  }

  public async get(id: string) {
    await this.loadToken();
    try {
      const response = await axios.get(`${this.baseURL}/${this.path}/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (err) {
      return {
        success: false,
        messages: "Lỗi xảy ra trong quá trình lấy dữ liệu",
      };
    }
  }

  public async find(filter: any) {
    await this.loadToken();
    try {
      const queryString = new URLSearchParams(filter).toString();
      const response = await axios.get(`${this.baseURL}/${this.path}?${queryString}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (err) {
      return this.ErrorMessage(err, "Lỗi trong quá trình lấy dữ liệu");
    }
  }

  public async create(object: any) {
    await this.loadToken();
    try {
      const response = await axios.post(`${this.baseURL}/${this.path}`, object, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (err) {
      return this.ErrorMessage(err, "Lỗi trong quá trình tạo dữ liệu");
    }
  }

  public async patch(id: string, object: any) {
    await this.loadToken();
    try {
      const response = await axios.patch(`${this.baseURL}/${this.path}/${id}`, object, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (err) {
      return this.ErrorMessage(err, "Lỗi trong quá trình thay đổi dữ liệu");
    }
  }

  public async remove(id: string) {
    await this.loadToken();
    try {
      const response = await axios.delete(`${this.baseURL}/${this.path}/${id}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      });
      return response.data;
    } catch (err) {
      return this.ErrorMessage(err, "Lỗi trong quá trình xóa dữ liệu");
    }
  }

  public async logout() {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!this.token) {
        Toast.show({
          type: "error",
          text1: "Token không tồn tại. Vui lòng đăng nhập lại.",
        });
        return { success: false, messages: "Token không tồn tại" };
      }

      const result = await axios.post(`${this.baseURL}/auths/logout/${userId}`, {}, {
        headers: { Authorization: `Bearer ${this.token}` },
      });

      if (result) {
        // Xóa token khỏi AsyncStorage
        await AsyncStorage.multiRemove(["token", "userId", "userName"]);
        Toast.show({
          type: "success",
          text1: "Đăng xuất thành công!",
        });
        return { success: true, messages: result.data.messages };
      } else {
        return { success: false, messages: "Đang xuất thất bại" };
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Đăng xuất thất bại",
      });
      return { success: false, messages: "Lỗi khi đăng xuất" };
    }
  }
}

const apiClient = new RestClient();

const customerClient = apiClient.service("users/customer");
const employeeClient = apiClient.service("users/employee");
const usersClient = apiClient.service("users");

const restClient = {
  apiClient,
  usersClient,
  customerClient,
  employeeClient,

}

export default restClient;

// const result = await customerClient.create({phoneNumber: ..., password: ...});
// const result = await usersClient.find({});
// const result = await usersClient.get("123");
// const result = await usersClient.patch("123", {avt: "fawf", personalInfo: { firstName, lastName, gender, birthDate }});
// const result = await usersClient.remove("123");
