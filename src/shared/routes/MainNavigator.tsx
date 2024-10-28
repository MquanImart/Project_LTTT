// src/shared/routes/MainNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteEmployeeScreen from '@/src/features/favorite/containers/favorite-employee/FavoriteEmployeeScreen';
import ChatScreen from '@/src/features/chat/containers/chat/ChatScreen';
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';
import CompleteAppointmentScreen from '@/src/features/appointment/containers/complete-appointment/CompleteAppointmentScreen';
import UpcomingAppointmentScreen from '@/src/features/appointment/containers/upcoming-appointment/UpcomingAppointmentScreen'; // Import đúng
import ProgressAppointmentScreen from '@/src/features/appointment/containers/progress-appointment/ProgressAppointmentScreen';
import CancelAppointmentScreen from '@/src/features/appointment/containers/cancel-appointment/AppointmentCancelCard';
import ReviewScreen from '@/src/features/appointment/containers/review/ReviewScreen';
import ServicesScreen from '@/src/features/services/containers/services/ServicesScreen';

export type RootStackParamList = {
  FavoriteEmployee: undefined;
  ChatScreen: undefined;
  ChatDetailScreen: { contactId: string; contactName: string };
  Complete: undefined;
  Upcoming: undefined; // Thêm vào nếu cần thiết
  Progress: undefined; // Thêm vào nếu cần thiết
  Cancel: undefined; // Thêm vào nếu cần thiết
  Review: { appointment: { id: string; name: string; service: string; rating: number; avatar: string } };
  ServicesScreen: undefined; // Thêm vào nếu cần thiết
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="FavoriteEmployee" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteEmployee" component={FavoriteEmployeeScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="Complete" component={CompleteAppointmentScreen} />
      <Stack.Screen name="Upcoming" component={UpcomingAppointmentScreen} />
      <Stack.Screen name="Progress" component={ProgressAppointmentScreen} />
      <Stack.Screen name="Cancel" component={CancelAppointmentScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
