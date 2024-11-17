import ResetPassword from "@/src/features/authentication/containers/forgot-password/ResetPassword";
import Verify from "@/src/features/authentication/containers/forgot-password/Verify";
import Login from "@/src/features/authentication/containers/login/Login";
import Register from "@/src/features/authentication/containers/register/Register";
import RegisterInfomation from "@/src/features/authentication/containers/register/RegisterInfomation";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeTabEmployee from "./HomeTabEmployee";
import HomeTabCustomer from "./HomeTabCustomer";
import HomeTabAdminNavigation from "./HomeTabAdmin";

const Stack = createStackNavigator();

export type RootStackParamList = {
    Login: undefined;
    RegisterInfomation: { userId: string };
    Register: undefined;
    Verify: undefined;
    ResetPassword: undefined;
    HomeTabCustomer: undefined;
    DetailsEmployee: {id: string};
    HomeTabEmployee: undefined;
    HomeTabAdmin: undefined;
};

export function LoginNavigator() {
  const navigationRef = React.useRef<NavigationContainerRef<RootStackParamList>>(null);
  return (
    <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{
           headerShown: false,
        }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="RegisterInfomation" component={RegisterInfomation} />
          <Stack.Screen name="Verify" component={Verify} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="HomeTabCustomer" component={HomeTabCustomer} />
          <Stack.Screen name="HomeTabEmployee" component={HomeTabEmployee} />
          <Stack.Screen name="HomeTabAdmin" component={HomeTabAdminNavigation} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}