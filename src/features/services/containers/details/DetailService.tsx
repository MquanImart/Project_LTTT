import Header from "@/src/shared/components/header/Header";
import { HomeEmployeeStackParamList } from "@/src/shared/routes/HomeEmployeeNavigation";
import { CompositeNavigationProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Image, Text, ScrollView } from "react-native";
import { ActivityIndicator, Button, Dialog, Portal, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect } from "react";
import TabDetail from "../../components/TabDetail";
import DetailCard from "./DetailCard";
import BillCard from "./BillCard";
import Colors from "@/src/styles/Color";
import styles from "./styleDetail";
import { JobDetail, Order, Service, UserRole } from "@/src/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import restClient from "@/src/shared/services/RestClient";

type DetailServiceNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeEmployeeStackParamList, "DetailService">,
  NativeStackNavigationProp<any>
>;

const DetailService = () => {
  const route = useRoute();
  const navigation = useNavigation<DetailServiceNavigationProp>();
  const { order, service } = route.params as { order: Order; service: Service };
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobDetail[]>(order?.jobDetail || []);
  const [tab, setTab] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem("role");
      setUserRole(role as UserRole);
    };
    fetchUserRole();
  }, []);

  const showDialog = (text: string) => {
    setVisible(true);
    setMessage(text);
  };

  const hideDialog = () => {
    setVisible(false);
    setMessage("");
  };

  const handleUpdateJob = async (index: number, updatedField: Partial<JobDetail>) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      showDialog("Bạn không có quyền chỉnh sửa công việc.");
      return;
    }

    const updatedJobs = [...jobs];
    updatedJobs[index] = { ...updatedJobs[index], ...updatedField };
    setJobs(updatedJobs);

    try {
      const orderId = (order._id as any)?.$oid || order._id;

      if (!orderId) {
        console.error("Invalid order ID:", order._id);
        return;
      }

      const client = restClient.apiClient.service("orders");
      const response = await client.patch(orderId, { jobDetail: updatedJobs });

      if (!response.success) throw new Error(response.message);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const createBill = async () => {
    try {
      const billData = {
        jobs,
        idOrder: (order._id as any)?.$oid || order._id,
        status: "Pending",
        idCustomer: order.customerId,
        idEmployee: order.employeeId,
      };

      const client = restClient.apiClient.service("bills");
      const response = await client.create(billData);

      if (response.success) {
        showDialog("Hóa đơn đã được tạo thành công.");
      } else {
        showDialog("Tạo hóa đơn thất bại.");
      }
    } catch (error) {
      showDialog("Đã xảy ra lỗi khi tạo hóa đơn.");
    }
  };

  const updateBillStatus = async () => {
    try {
      setLoading(true);

      const client = restClient.apiClient.service("bills");
      const response = await client.find({ idOrder: (order._id as any)?.$oid || order._id });

      if (response.success && response.resData.length > 0) {
        const billId = response.resData[0]._id;

        const updateResponse = await client.patch(billId, { status: "Paid" });

        if (updateResponse.success) {
          showDialog("Trạng thái hóa đơn đã được cập nhật thành Đã thanh toán.");
        } else {
          showDialog("Cập nhật trạng thái hóa đơn thất bại.");
        }
      } else {
        showDialog("Không tìm thấy hóa đơn liên quan để cập nhật trạng thái.");
      }
    } catch (error) {
      showDialog("Đã xảy ra lỗi khi cập nhật trạng thái hóa đơn.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = async (newJob: JobDetail) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      showDialog("Bạn không có quyền thêm công việc.");
      return;
    }

    try {
      if (!newJob.jobName.trim()) return;

      const updatedJobs = [...jobs, newJob];
      setJobs(updatedJobs);

      const orderId = (order._id as any)?.$oid || order._id;

      if (!orderId) {
        console.error("Invalid order ID:", order._id);
        return;
      }

      const client = restClient.apiClient.service("orders");
      const response = await client.patch(orderId, { jobDetail: updatedJobs });

      if (!response.success) throw new Error(response.message);
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleDeleteJob = async (index: number) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      showDialog("Bạn không có quyền xóa công việc.");
      return;
    }

    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);

    try {
      const orderId = (order._id as any)?.$oid || order._id;

      if (!orderId) {
        console.error("Invalid order ID:", order._id);
        return;
      }

      const client = restClient.apiClient.service("orders");
      const response = await client.patch(orderId, { jobDetail: updatedJobs });

      if (!response.success) throw new Error(response.message);
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (!order || !service) {
    return <ActivityIndicator animating={true} color={Colors.mainColor1} />;
  }

  return (
    <Provider>
      <View style={styles.container}>
        <Header title="Chi tiết công việc" onBackPress={handleBackPress} />
        <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={150}>
          <ScrollView>
            {/* General Information */}
            <View style={styles.infoOrder}>
              <Image source={{ uri: service.img }} style={styles.img} />
              <View style={styles.boxInfo}>
                <Text style={styles.textTitle}>{service.name}</Text>
                <View style={styles.cardLabel}>
                  <Icon name="phone" size={24} color="#000" style={{ marginHorizontal: 5 }} />
                  <Text>{order.phoneNumber}</Text>
                </View>
              </View>
            </View>

            {/* Additional Information */}
            <View style={styles.mainContainer}>
              <View style={styles.cardLabel}>
                <Icon name="place" size={24} color="#000" style={{ marginHorizontal: 5 }} />
                <Text>Địa chỉ: {order.address}</Text>
              </View>
              <View style={styles.cardLabel}>
                <Icon name="access-time" size={24} color="#000" style={{ marginHorizontal: 5 }} />
                <Text>Thời gian: {new Date(order.startDate).toLocaleString()}</Text>
              </View>
            </View>

            {/* Tabs */}
            <TabDetail tab={tab} setTab={setTab} />
            {tab === 0 && (
              <DetailCard
                jobs={jobs}
                setJobs={setJobs}
                updateJob={handleUpdateJob}
                addJob={handleAddJob}
                deleteJob={handleDeleteJob}
                orderId={(order._id as any)?.$oid || order._id}
              />
            )}
            {tab === 1 && (
              <BillCard
                jobs={jobs}
                setJobs={setJobs}
                updateJob={handleUpdateJob}
                disableDelete={true}
              />
            )}
          </ScrollView>
        </KeyboardAwareScrollView>

        {tab === 1 && (userRole === UserRole.Admin || userRole === UserRole.Employee) && (
          <View style={styles.boxButton}>
            <Button
              style={[styles.buttonsubmit, { backgroundColor: Colors.mainColor1 }]}
              mode="contained"
              labelStyle={{ color: "#fff" }}
              onPress={createBill}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Tạo hóa đơn"}
            </Button>
            <Button
              style={[styles.buttonsubmit, { backgroundColor: Colors.mainColor1 }]}
              mode="contained"
              labelStyle={{ color: "#fff" }}
              onPress={updateBillStatus}
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Xác nhận thanh toán"}
            </Button>
          </View>
        )}

        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Thông báo</Dialog.Title>
            <Dialog.Content>
              <Text style={styles.textDialog}>{message}</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Hủy</Button>
              <Button onPress={() => hideDialog()}>Xác nhận</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default DetailService;
