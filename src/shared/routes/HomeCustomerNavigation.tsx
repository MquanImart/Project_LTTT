import HomeCustomer from '@/src/features/home/containers/home-customer/HomeCustomer';
import BookJob from '@/src/features/home/containers/home-customer/components/bookJob/BookJob';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

export type RootStackParamList = {
  HomeCustomer: undefined;
  BookJob: {
    jobName: string;
    jobImage: string;
    jobId: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

function HomeCustomerNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeCustomer" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
      <Stack.Screen name="BookJob" component={BookJob} />
    </Stack.Navigator>
  );
}

export default HomeCustomerNavigation;
