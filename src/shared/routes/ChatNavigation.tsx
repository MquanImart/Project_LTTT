// src/navigations/ChatNavigator.tsx

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from '@/src/features/chat/containers/chat/ChatScreen';
import ChatDetailScreen from '@/src/features/chat/containers/detail-chat/ChatDetailScreen';

// Định nghĩa RootStackParamList với các màn hình và tham số (nếu có)
export type ChatStackParamList = {
  ChatScreen: undefined; // ChatScreen không có tham số
  ChatDetailScreen: { contactId: string; contactName: string }; 
};

// Sử dụng RootStackParamList cho Stack Navigator
const Stack = createStackNavigator<ChatStackParamList>();

const ChatNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="ChatScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
