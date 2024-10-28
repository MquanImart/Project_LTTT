// src/shared/routes/MainNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteEmployeeScreen from '@/src/features/favorite/containers/favorite-employee/FavoriteEmployeeScreen';
import ChatScreen from '@/src/features/chat/containers/chat/ChatScreen';
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';
import AppointmentScreen from '@/src/features/appointment/containers/complete-appointment/CompleteAppointmentScreen';

export type RootStackParamList = {
  FavoriteEmployee: undefined;
  ChatScreen: undefined;
  ChatDetailScreen: { contactId: string; contactName: string };
  Appointment: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FavoriteEmployee" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteEmployee" component={FavoriteEmployeeScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
