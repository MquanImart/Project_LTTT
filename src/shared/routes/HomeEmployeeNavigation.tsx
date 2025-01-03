import ChatDetailScreen from "@/src/features/chat/containers/detail-chat/ChatDetailScreen";
import CalendarDay from "@/src/features/home/containers/home-employee/calendar-day/CalendarDay";
import CalendarMonth from "@/src/features/home/containers/home-employee/calendar-month/CalendarMonth";
import CalendarYear from "@/src/features/home/containers/home-employee/calendar-year/CalendarYear";
import HomeEmplyee from "@/src/features/home/containers/home-employee/HomeEmployee";
import DetailService from "@/src/features/services/containers/details/DetailService";
import { Order, Service } from "@/src/interface/interface";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

export type HomeEmployeeStackParamList = {
  HomeEmplyee: undefined;
  CalendarYear: { startMonth: number };
  CalendarMonth: { startMonth: number, currYear: number };
  CalendarDay: { currDay: number, currMonth: number, currYear: number };
  DetailService: { service: Service; order: Order };
};

function HomeEmployeeNavigation() {
  const currentDate = new Date();
  const currDay = currentDate.getDate();
  const currMonth = currentDate.getMonth() + 1; // Month is zero-indexed, so add 1
  const currYear = currentDate.getFullYear();

  return (
    <Stack.Navigator
      initialRouteName="CalendarDay"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeCustomer" component={HomeEmplyee} />
      <Stack.Screen name="CalendarYear" component={CalendarYear} />
      <Stack.Screen name="CalendarMonth" component={CalendarMonth} />
      <Stack.Screen
        name="CalendarDay"
        initialParams={{
          currDay,
          currMonth,
          currYear,
        }}
        component={CalendarDay}
      />
      <Stack.Screen name="DetailService" component={DetailService} />
    </Stack.Navigator>
  );
}

export default HomeEmployeeNavigation;
