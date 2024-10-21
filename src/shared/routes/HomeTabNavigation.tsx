import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeNavigation from "./HomeNavigation";
import FavouriteNavigation from "./FavouriteNavigation";
import OrderNavigation from "./OrderNavigation";
import ChatNavigation from "./ChatNavigation";

const Tab = createBottomTabNavigator();

function HomeTabNavigation() {
  return (
      <Tab.Navigator initialRouteName="Trang Chủ" 
      >
        <Tab.Screen name="Home" component={HomeNavigation} />
        <Tab.Screen name="Favourite" component={FavouriteNavigation} />
        <Tab.Screen name="Order" component={OrderNavigation} />
        <Tab.Screen name="Chat" component={ChatNavigation} />
      </Tab.Navigator>
  );
}

export default HomeTabNavigation;