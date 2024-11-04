import BoardEmployee from "@/src/features/employee/containers/board/BoardEmployee";
import DetailEmployee from "@/src/features/employee/containers/details/DetailEmployee";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

export type ManageEmployeeStackParamList = {
  Employee: undefined;
  Details: undefined;
};

function ManageEmployee() {
  return (
    <Stack.Navigator initialRouteName="Employee" screenOptions={{
           headerShown: false,
        }}>
          <Stack.Screen name="Employee" component={BoardEmployee} />
          <Stack.Screen name="Details" component={DetailEmployee} />
    </Stack.Navigator>
  );
}

export default ManageEmployee;