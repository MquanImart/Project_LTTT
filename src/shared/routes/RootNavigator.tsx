import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabNavigation from './HomeTabNavigation';

const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeTabs" component={HomeTabNavigation} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
