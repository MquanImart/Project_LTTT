import BoardEmployee from "@/src/features/employee/containers/board/BoardEmployee";
import DetailEmployee from "@/src/features/employee/containers/details/DetailEmployee";
import RegisterEmployee from "@/src/features/employee/containers/register/RegisterEmployee";
import RegisterInformationEmployee from "@/src/features/employee/containers/register/RegisterInfoEmployee";
import ChooseJob from "@/src/features/employee/containers/register/ChooseJob";
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";

const Stack = createStackNavigator<ManageEmployeeStackParamList>();

export type ManageEmployeeStackParamList = {
  Employee: undefined;
  Details: { employeeId: string };
  RegisterEmployee: undefined;
  RegisterInfoEmployee: {userId: string};
  ChooseJob: {userId: string};
  ChatDetailScreen: { 
    contactId: string; 
    contactName: string;
    onNewMessage: () => void;
  };
   
};

function ManageEmployee() {
  return (
    <Stack.Navigator initialRouteName="Employee" screenOptions={{
           headerShown: false,
        }}>
          <Stack.Screen name="Employee" component={BoardEmployee} />
          <Stack.Screen name="Details" component={DetailEmployee} />
          <Stack.Screen name="RegisterEmployee" component={RegisterEmployee} />
          <Stack.Screen name="RegisterInfoEmployee" component={RegisterInformationEmployee} />
          <Stack.Screen name="ChooseJob" component={ChooseJob} />
          <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
}

export default ManageEmployee;