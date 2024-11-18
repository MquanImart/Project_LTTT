import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import ChatNavigation from "./ChatNavigation";
import HomeEmployeeNavigation from "./HomeEmployeeNavigation";
import Profile from "@/src/features/profile/containers/Profile";
import Colors from "@/src/styles/Color";
import { Text } from "react-native";
import AppointmentNavigation from "./AppointmentNavigation";

const Tab = createBottomTabNavigator();

function HomeTabEmployee() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          // Gán giá trị mặc định cho iconName để tránh lỗi "used before being assigned"
          let iconName = "home"; // Giá trị mặc định

          // Xác định biểu tượng cho từng tab dựa trên tên route
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Appointment") {
            iconName = "shopping-cart";
          } else if (route.name === "Chat") {
            iconName = "chat";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ focused }) => {
          let label = ""; // Giá trị mặc định

          if (route.name === "Home") {
            label = "Trang chủ";
          } else if (route.name === "Appointment") {
            label = "Đơn hàng";
          } else if (route.name === "Chat") {
            label = "Nhắn tin";
          } else if (route.name === "Profile") {
            label = "Cá nhân";
          }

          return (
            <Text style={{ color: focused ? Colors.mainColor1 : Colors.icon, fontSize: 12 }}>
              {label}
            </Text>
          );
        },
        tabBarActiveTintColor: Colors.mainColor1,
        tabBarInactiveTintColor: Colors.icon,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: Colors.icon,
          paddingBottom: 5,
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeEmployeeNavigation} />
      <Tab.Screen name="Appointment" component={AppointmentNavigation} />
      <Tab.Screen name="Chat" component={ChatNavigation} />
      <Tab.Screen name="Profile" component={Profile}/> 
    </Tab.Navigator>
  );
}

export default HomeTabEmployee;