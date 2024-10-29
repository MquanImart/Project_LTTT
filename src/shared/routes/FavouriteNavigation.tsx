import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteEmployeeScreen from '@/src/features/favorite/containers/favorite-employee/FavoriteEmployeeScreen';

export type RootStackParamList = {
  FavoriteEmployee: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const FavouriteNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="FavoriteEmployee" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteEmployee" component={FavoriteEmployeeScreen} />
    </Stack.Navigator>
  );
};

export default FavouriteNavigation;
