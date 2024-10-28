import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompleteAppointmentScreen from '@/src/features/appointment/containers/complete-appointment/CompleteAppointmentScreen';
import UpcomingAppointmentScreen from '@/src/features/appointment/containers/upcoming-appointment/UpcomingAppointmentScreen';


const Stack = createStackNavigator();

const AppointmentNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Complete" component={CompleteAppointmentScreen} />
      <Stack.Screen name="Upcoming" component={UpcomingAppointmentScreen} />
    </Stack.Navigator>
  );
};

export default AppointmentNavigation;
