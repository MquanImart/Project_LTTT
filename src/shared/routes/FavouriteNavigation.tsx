// src/navigations/FavouriteNavigation.tsx

import FavoriteEmployeeScreen from "@/src/features/favorite/containers/favorite-employee/FavoriteEmployeeScreen";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

export type RootStackParamList = {
    FavoriteEmployee: undefined;
};

export function FavouriteNavigation() {
  const navigationRef = React.useRef<NavigationContainerRef<RootStackParamList>>(null);
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="FavoriteEmployee" screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="FavoriteEmployee" component={FavoriteEmployeeScreen} />
        {/* Thêm các màn hình khác vào đây nếu cần */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default FavouriteNavigation;
