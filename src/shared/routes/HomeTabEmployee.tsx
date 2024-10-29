import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import FavouriteNavigation from "./FavouriteNavigation";
import OrderNavigation from "./OrderNavigation";
import ChatNavigation from "./ChatNavigation";
import HomeEmployeeNavigation from "./HomeEmployeeNavigation";

const Tab = createBottomTabNavigator();

function HomeTabEmployee() {
  return (
    <Tab.Navigator
      initialRouteName="Trang Chủ"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'green', // Thay 'green' bằng mã màu bạn muốn, ví dụ '#4CAF50'
        },
        headerTintColor: '#fff', // Màu của văn bản header
        headerTitleStyle: {
          fontWeight: 'bold', // Điều chỉnh kiểu chữ nếu muốn
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeEmployeeNavigation} />
      <Tab.Screen name="Favourite" component={FavouriteNavigation} />
      <Tab.Screen name="Order" component={OrderNavigation} />
      <Tab.Screen name="Chat" component={ChatNavigation} />
    </Tab.Navigator>
  );
}

export default HomeTabEmployee;