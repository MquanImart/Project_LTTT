import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteEmployeeScreen from '@/src/features/favorite/containers/favorite-employee/FavoriteEmployeeScreen';
import ChatScreen from '@/src/features/chat/containers/chat/ChatScreen';
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';

export type RootStackParamList = {
  FavoriteEmployee: undefined;
  ChatScreen: undefined;
  ChatDetailScreen: { 
    contactId: string; 
    contactName: string,
    onNewMessage: () => void; // Thêm onNewMessage callback
   };
};

const Stack = createStackNavigator<RootStackParamList>();

const FavouriteNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="FavoriteEmployee" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FavoriteEmployee" component={FavoriteEmployeeScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default FavouriteNavigation;
