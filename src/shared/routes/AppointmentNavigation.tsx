import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompleteAppointmentScreen from '@/src/features/appointment/containers/complete-appointment/CompleteAppointmentScreen';
import UpcomingAppointmentScreen from '@/src/features/appointment/containers/upcoming-appointment/UpcomingAppointmentScreen';
import ProgressAppointmentScreen from '@/src/features/appointment/containers/progress-appointment/ProgressAppointmentScreen';
import CancelAppointmentScreen from '@/src/features/appointment/containers/cancel-appointment/CancelAppointmentScreen';
import ReviewScreen from '@/src/features/appointment/containers/review/ReviewScreen';
import { OrderWithService } from '@/src/interface/ordersInterface';
import { Order, Service } from '@/src/interface/interface';
import DetailService from '@/src/features/services/containers/details/DetailService';
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';

export type AppointmentStackParamList = {
  Complete: undefined;
  Upcoming: undefined;
  Progress: undefined;
  Cancel: undefined;
  Review: { appointment: OrderWithService };
  DetailService: { service: Service; order: Order };
  ChatDetailScreen: { 
    contactId: string; 
    contactName: string,
    onNewMessage: () => void; // Thêm onNewMessage callback
   };
};

const Stack = createStackNavigator<AppointmentStackParamList>();

const AppointmentNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Complete" component={CompleteAppointmentScreen} />
      <Stack.Screen name="Upcoming" component={UpcomingAppointmentScreen} />
      <Stack.Screen name="Progress" component={ProgressAppointmentScreen} />
      <Stack.Screen name="Cancel" component={CancelAppointmentScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="DetailService" component={DetailService} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentNavigation;
