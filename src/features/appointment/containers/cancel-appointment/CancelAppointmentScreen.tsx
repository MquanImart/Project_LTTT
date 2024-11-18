import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentCancelCard from '@/src/features/appointment/components/AppointmentCancelCard';
import Colors from '@/src/styles/Color';
import useAppointment from '../useAppointment';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AppointmentStackParamList } from '@/src/shared/routes/AppointmentNavigation';

const CancelAppointmentScreen = () => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();
  const {cancelAppoint, role} = useAppointment();
  const handleDetails = () => {
    //navigation.navigate("Details");
  }
  if (role === null) return  <ActivityIndicator animating={true} color={MD2Colors.red800} />
  return (
    <View style={styles.container}>
      <Header title="Đơn hàng" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={'Đã hủy'} />
      <FlatList
        data={cancelAppoint}
        renderItem={({ item }) => (
          <AppointmentCancelCard
            role={role}
            appointment={item}
            onFavoritePress={() => console.log('Favorite pressed')} 
            onDetailsPress={handleDetails}          
          />
        )}
        keyExtractor={(item) => item.order._id.$oid}
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

export default CancelAppointmentScreen;
