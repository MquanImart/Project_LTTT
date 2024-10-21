import HomeCustomer from "@/src/features/home/containers/home-customer/HomeCustomer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

const Stack = createStackNavigator();


function ChatNavigation() {
  return (
    <Stack.Navigator initialRouteName="HomeCustomer" screenOptions={{
           headerShown: false,
        }}>
          <Stack.Screen name="HomeCustomer" component={HomeCustomer} />
            
          
    </Stack.Navigator>
  );
}

export default ChatNavigation;