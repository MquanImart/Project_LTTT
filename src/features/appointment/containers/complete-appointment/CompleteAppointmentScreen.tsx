import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentCard from '@/src/features/appointment/components/AppointmentCompleteCard';
import Colors from '@/src/styles/Color';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AppointmentStackParamList } from '@/src/shared/routes/AppointmentNavigation';
import useAppointment from '../useAppointment';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const CompleteAppointmentScreen = () => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();

  const {completeAppoint, role} = useAppointment();

  const handleDetails = () => {
    //navigation.navigate("Details");
  }
  if (role === null) return  <ActivityIndicator animating={true} color={MD2Colors.red800} />

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
            onChatPress={() => console.log('Chat pressed')}
            onReviewPress={() => navigation.navigate('Review', { appointment: item })}
            onDetailsPress={handleDetails}
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
