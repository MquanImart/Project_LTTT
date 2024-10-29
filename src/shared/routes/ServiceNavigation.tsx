import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ServicesScreen from '@/src/features/services/containers/services/ServicesScreen';

export type RootStackParamList = {
  ServicesScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const ServiceNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ServicesScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
    </Stack.Navigator>
  );
};

export default ServiceNavigation;
