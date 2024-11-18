import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentUpcomingCard from '@/src/features/appointment/components/AppointmentUpcomingCard';
import Colors from '@/src/styles/Color';
import useAppointment from '../useAppointment';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { OrderWithService } from '@/src/interface/ordersInterface';
import { AppointmentStackParamList } from '@/src/shared/routes/AppointmentNavigation';

type NavigationProp = StackNavigationProp<AppointmentStackParamList, 'DetailService'>;

const UpcomingAppointmentScreen = () => {
  const { upcomingAppoint, role } = useAppointment();
  const navigation = useNavigation<NavigationProp>();

  const handleDetails = (appointment: OrderWithService) => {
    navigation.navigate('DetailService', {
      service: appointment.service, // Dữ liệu dịch vụ
      order: appointment.order,     // Dữ liệu đơn hàng
    });
  };

  if (role === null) return <ActivityIndicator animating={true} color={MD2Colors.red800} />;

  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" showBackButton={false} />
      <AppointmentTabs selectedTab="Chờ duyệt" />
      <FlatList
        data={upcomingAppoint}
        renderItem={({ item }) => (
          <AppointmentUpcomingCard
            role={role}
            appointment={item}
            onAcceptPress={() => console.log('Accept pressed')}
            onRejectPress={() => console.log('Reject pressed')}
            onFavoritePress={() => console.log('Favorite pressed')}
            onDetailsPress={() => handleDetails(item)} // Truyền tham số
          />
        )}
        keyExtractor={(item) => item.order._id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingBottom: 70,
  },
});

export default UpcomingAppointmentScreen;
