import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentUpcomingCard from '@/src/features/appointment/components/AppointmentUpcomingCard';
import Colors from '@/src/styles/Color'; // Đảm bảo đường dẫn chính xác
import useAppointment from '../useAppointment';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const UpcomingAppointmentScreen = () => {
  const {upcomingAppoint, role} = useAppointment();

  const handleDetails = () => {
    //navigation.navigate("Details");
  }
  if (role === null) return  <ActivityIndicator animating={true} color={MD2Colors.red800} />
  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={'Chờ duyệt'}/>
      <FlatList
        data={upcomingAppoint}
        renderItem={({ item }) => (
          <AppointmentUpcomingCard
            role={role}
            appointment={item}
            onAcceptPress={() => console.log('Accept pressed')}
            onRejectPress={() => console.log('Reject pressed')}
            onFavoritePress={() => console.log('Favorite pressed')}
            onDetailsPress={handleDetails}
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
