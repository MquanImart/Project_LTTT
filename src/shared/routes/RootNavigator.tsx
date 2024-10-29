import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabCustomerNavigation from './HomeTabCustomer';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabCustomerNavigation} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
