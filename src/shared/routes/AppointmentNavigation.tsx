import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompleteAppointmentScreen from '@/src/features/appointment/containers/complete-appointment/CompleteAppointmentScreen';
import UpcomingAppointmentScreen from '@/src/features/appointment/containers/upcoming-appointment/UpcomingAppointmentScreen';
import ProgressAppointmentScreen from '@/src/features/appointment/containers/progress-appointment/ProgressAppointmentScreen';
import CancelAppointmentScreen from '@/src/features/appointment/containers/cancel-appointment/AppointmentCancelCard';
import ReviewScreen from '@/src/features/appointment/containers/review/ReviewScreen';

export type AppointmentStackParamList = {
  Complete: undefined;
  Upcoming: undefined;
  Progress: undefined;
  Cancel: undefined;
  Review: { appointment: { id: string; name: string; service: string; rating: number; avatar: string } };
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
    </Stack.Navigator>
  );
};

export default AppointmentNavigation;
