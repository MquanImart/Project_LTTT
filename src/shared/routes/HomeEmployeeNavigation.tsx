import CalendarDay from "@/src/features/home/containers/home-employee/calendar-day/CalendarDay";
import CalendarMonth from "@/src/features/home/containers/home-employee/calendar-month/CalendarMonth";
import CalendarYear from "@/src/features/home/containers/home-employee/calendar-year/CalendarYear";
import HomeEmplyee from "@/src/features/home/containers/home-employee/HomeEmployee";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();

export type HomeEmployeeStackParamList = {
  HomeEmplyee: undefined;
  CalendarYear: {startMonth: number};
  CalendarMonth: {startMonth: number, currYear: number};
  CalendarDay: {currDay: number, currMonth: number, currYear: number};
};

function HomeEmployeeNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeCustomer" screenOptions={{
           headerShown: false,
        }}>
          <Stack.Screen name="HomeCustomer" component={HomeEmplyee} />
          <Stack.Screen name="CalendarYear" component={CalendarYear} />
          <Stack.Screen name="CalendarMonth" component={CalendarMonth} />
          <Stack.Screen name="CalendarDay" component={CalendarDay} />
    </Stack.Navigator>
  );
}

export default HomeEmployeeNavigation;