import Header from "@/src/shared/components/header/Header";
import { ScrollView, View, Image, Text, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styleDetail";
import TabDetail from "../../components/TabDetail";
import { CompositeNavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ManageEmployeeStackParamList } from "@/src/shared/routes/ManageEmployeeNav";
import Colors from "@/src/styles/Color";
import { useEffect, useState } from "react";
import restClient from "@/src/shared/services/RestClient";
import ServiceEmployee from "./ServiceEmployee";
import ReviewEmployee from "./ReviewEmployee";

type DetailEmployeeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ManageEmployeeStackParamList, 'Details'>,
  NativeStackNavigationProp<any>
>;

const DetailEmployee = () => {
  const [tab, setTab] = useState<number>(0);
  const [employeeDetail, setEmployeeDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [rating, setRating] = useState<number>(0);
  const navigation = useNavigation<DetailEmployeeNavigationProp>();
  const route = useRoute();
  const { employeeId } = route.params as { employeeId: string };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const deleteEmployee = async (employeeId: string) => {
    try {
      const employeeService = restClient.apiClient.service("/employees");
      const updateResult = await employeeService.patch(employeeId, { status: "OnLeave" });
  
      if (updateResult.success) {
        const userService = restClient.apiClient.service("/users");
        const deleteResult = await userService.patch(employeeId, { deletedAt: new Date().toISOString() });
  
        if (deleteResult.success) {
          navigation.reset({
            index: 0, 
            routes: [{ name: 'Employee' }],
          });
          
        } else {
          console.error("Xóa người dùng thất bại:", deleteResult.message);
        }
      } else {
        console.error("Cập nhật trạng thái nhân viên thất bại:", updateResult.message);
      }
    } catch (error) {
      console.error("Lỗi khi sa thải nhân viên:", error);
    }
  };  

  const fetchServices = async (jobIds: string[]) => {
    try {
      if (!jobIds || jobIds.length === 0) {
        console.warn("Danh sách jobIds rỗng.");
        return [];
      }

      const serviceService = restClient.apiClient.service("/services");
      const result = await serviceService.find({ ids: jobIds.join(",") });

      if (result.success) {
        console.log("Danh sách dịch vụ:", result.resData);
        return result.resData;
      } else {
        console.error("Failed to fetch services:", result.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      return [];
    }
  };

  const fetchReviews = async (employeeId: string) => {
    try {
      const reviewService = restClient.apiClient.service("/reviews");
      const result = await reviewService.find({ employeeId });
      if (result.success) {
        console.log("Danh sách đánh giá:", result.resData);
        return result.resData;
      } else {
        console.error("Failed to fetch reviews:", result.message);
        return [];
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      return [];
    }
  };

  const fetchEmployeeDetail = async () => {
    setLoading(true);
    try {
      // Bước 1: Lấy thông tin user từ employeeId
      const userService = restClient.apiClient.service("/users");
      const userResult = await userService.get(employeeId);

      if (userResult.success) {
        const userDetail = userResult.resData; // Thông tin user

        // Bước 2: Lấy thông tin employee từ userId
        const employeeService = restClient.apiClient.service("/employees");
        const employeeResult = await employeeService.find({ userId: userDetail._id });

        if (employeeResult.success && employeeResult.resData.length > 0) {
          const employeeDetail = employeeResult.resData[0]; // Thông tin employee

          const listServices = employeeDetail.jobIds;

          // Bước 3: Lấy danh sách dịch vụ từ jobIds
          const services = await fetchServices(listServices);

          // Bước 4: Lấy danh sách đánh giá từ employeeId
          const reviews = await fetchReviews(employeeId);

          // Cập nhật state với thông tin user, employee, và services
          setEmployeeDetail({
            ...userDetail,
            ...employeeDetail,
            services,
            reviews,
          });

          // Tính rating nếu cần
          setRating(calculateAverageRating(userDetail.reviews || []));
        } else {
          console.error("Employee not found for userId:", userDetail._id);
        }
      } else {
        console.error("Failed to fetch user detail:", userResult.message);
      }
    } catch (error) {
      console.error("Error fetching employee detail:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateAverageRating = (reviews: any[]): number => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return totalRating / reviews.length;
  };

  const addressHome = () => {
    const address = employeeDetail?.address || {};
    return [
      address.street || "",
      address.ward || "",
      address.district || "",
      address.province || "",
    ]
      .filter((item) => item.trim() !== "") // Loại bỏ các trường rỗng
      .join(", ") || "Không có địa chỉ";
  };

  useEffect(() => {
    console.log("Employee ID:", employeeId);
    fetchEmployeeDetail();
  }, [employeeId]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải thông tin chi tiết nhân viên...</Text>
      </View>
    );
  }

  if (!employeeDetail) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text>Không thể tải thông tin chi tiết nhân viên.</Text>
      </View>
    );
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Header title={"Chi tiết công việc"} onBackPress={handleBackPress} />
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          <ScrollView>
            <View style={styles.infoOrder}>
              <Image
                source={{
                  uri: employeeDetail.avatar || 'https://via.placeholder.com/150',
                }}
                style={styles.img}
              />
              <View style={styles.boxInfo}>
                <Text style={styles.textTitle}>
                  {employeeDetail.personalInfo?.firstName || "Chưa có"}{" "}
                  {employeeDetail.personalInfo?.lastName || "Tên"}
                </Text>
                <View style={styles.cardLabel}>
                  <Icon name="star" size={24} color="#000" style={{ marginHorizontal: 5 }} />
                  <Text>{rating.toFixed(1)} sao</Text>
                </View>
                <View style={styles.cardLabel}>
                  <Icon name="phone" size={24} color="#000" style={{ marginHorizontal: 5 }} />
                  <Text>{employeeDetail.account?.phoneNumber || "Không có số điện thoại"}</Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => console.log("Chat pressed")}
                  style={{ backgroundColor: Colors.mainColor1 }}
                >
                  Chat
                </Button>
              </View>
            </View>
            <View style={styles.mainContainer}>
              <View style={styles.cardLabel}>
                <Icon name="place" size={24} color="#000" style={{ marginHorizontal: 5 }} />
                <Text>Địa chỉ: {addressHome()}</Text>
              </View>
            </View>
            <TabDetail tab={tab} setTab={setTab} />
            {tab === 0 && <ServiceEmployee services={employeeDetail?.services || []} />}
            {tab === 1 && <ReviewEmployee reviews={employeeDetail?.reviews || []} />}
          </ScrollView>
        </KeyboardAwareScrollView>
        <View style={styles.buttonDelete}>
          <Button
            style={{ backgroundColor: "#ff5c5c", alignSelf: "center" }}
            labelStyle={{ color: "#fff" }}
            mode="contained"
            onPress={() => deleteEmployee(employeeId)}
          >
            Sa thải
          </Button>
        </View>
      </View>
    </Provider>
  );
};

export default DetailEmployee;
