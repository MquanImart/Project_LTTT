import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentProgressCard from '@/src/features/appointment/components/AppointmentProgressCard';
import Colors from '@/src/styles/Color';
import useAppointment from '../useAppointment';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const ProgressAppointmentScreen = () => {
  const {progressAppoint, role} = useAppointment();
  const handleDetails = () => {
    //navigation.navigate("Details");
  }
  if (role === null) return  <ActivityIndicator animating={true} color={MD2Colors.red800} />

  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={'Đang thực hiện'} />
      <FlatList
        data={progressAppoint}
        renderItem={({ item }) => (
          <AppointmentProgressCard
            role={role}
            appointment={item}
            onCancelPress={() => console.log('Cancel pressed')}
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

export default ProgressAppointmentScreen;
