import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ReviewScreen from '@/src/features/appointment/containers/review/ReviewScreen';
import { OrderWithService } from '@/src/interface/ordersInterface';
import { Order, Service } from '@/src/interface/interface';
import DetailService from '@/src/features/services/containers/details/DetailService';
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';
import Appointment from '@/src/features/appointment/containers/Appointment';

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
      <Stack.Screen name="Complete" component={Appointment} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="DetailService" component={DetailService} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentNavigation;
