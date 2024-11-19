import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentCard from '@/src/features/appointment/components/AppointmentCompleteCard';
import Colors from '@/src/styles/Color';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppointmentStackParamList } from '@/src/shared/routes/AppointmentNavigation';
import useAppointment from '../useAppointment';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import restClient from '@/src/shared/services/RestClient';

const CompleteAppointmentScreen = () => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();
  const { completeAppoint, role } = useAppointment();

  const handleDetails = (appointment: any) => {
    navigation.navigate('DetailService', {
      service: appointment.service, // Truyền dữ liệu dịch vụ
      order: appointment.order,     // Truyền dữ liệu đơn hàng
    });
  };

  const handleChat = (appointment: any) => {
    const refreshAppointments = () => {
      console.log("Refreshing appointments...");
    };
    if(role === "Customer"){
      navigation.navigate('ChatDetailScreen', {
        contactId: appointment.employee._id, 
        contactName: appointment.employee.personalInfo.firstName + " " + appointment.employee.personalInfo.lastName,
        onNewMessage: () => refreshAppointments()
      });
    }
    if(role === "Employee"){
      navigation.navigate('ChatDetailScreen', {
        contactId: appointment.order.customerId, 
        contactName: appointment.customer.personalInfo.firstName + " " + appointment.customer.personalInfo.lastName,
        onNewMessage: () => refreshAppointments()
      });
    }
  };
  const addFavoriteEmployee = async (employeeId: string) => {
    try {
      const userId = await AsyncStorage.getItem("userId"); // Lấy userId hiện tại từ AsyncStorage
      if (!userId) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không tìm thấy thông tin người dùng.",
        });
        return;
      }
  
      const result = await restClient.apiClient
        .service(`users/${userId}/favorite-employees`)
        .create({ employeeId }); // Gửi yêu cầu thêm nhân viên yêu thích
  
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Nhân viên đã được thêm vào danh sách yêu thích.",
        });
      } else {
        Toast.show({
          type: "info", 
          text1: "Cảnh báo",
          text2: result.messages || "Không thể thêm nhân viên vào danh sách yêu thích.",
        });        
      }
    } catch (error) {
      console.error("Error adding favorite employee:", error);
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi khi thêm nhân viên yêu thích.",
      });
    }
  };
  


  if (role === null) return <ActivityIndicator animating={true} color={MD2Colors.red800} />;

  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={'Hoàn thành'} />
      <FlatList
        data={completeAppoint}
        renderItem={({ item }) => (
          <AppointmentCard
            role={role}
            appointment={item}
            onChatPress={() => handleChat(item)} 
            onReviewPress={() => navigation.navigate('Review', { appointment: item })}
            onDetailsPress={() => handleDetails(item)} 
            onFavouritePress={() => addFavoriteEmployee(item.employeeM._id)}
          />
        )}
        keyExtractor={(item) => item.order._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default CompleteAppointmentScreen;
