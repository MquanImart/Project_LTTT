// src/features/chat/containers/ChatScreen.tsx
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '@/src/styles/Color';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Header from '@/src/shared/components/Header';
import Footer from '@/src/shared/components/Footer';
import { ChatStackParamList } from '@/src/shared/routes/ChatNavigation';

type Message = {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
};

type ChatScreenProps = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'ChatScreen'>;
  route: RouteProp<ChatStackParamList, 'ChatScreen'>;
};

// Dữ liệu mẫu (Mock Data)
const mockMessages: Message[] = [
  {
    id: '1',
    name: 'Ronald Richards',
    message: "So, what's your plan this weekend?",
    time: '15:41',
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
  },
  {
    id: '2',
    name: 'Jane Cooper',
    message: 'I hope it goes well.',
    time: '16:41',
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
  },
];

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  // Sử dụng mock data cho danh sách tin nhắn
  const [messages] = useState<Message[]>(mockMessages);

  const renderMessageItem = ({ item }: { item: Message }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => navigation.navigate('ChatDetailScreen', { contactId: item.id, contactName: item.name })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={styles.messageName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Chat" onBackPress={() => navigation.goBack()} />
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  messageList: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 70,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.icon,
    alignSelf: 'stretch',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  messageName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  messageText: {
    fontSize: 14,
    color: Colors.icon,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.icon,
  },
});

export default ChatScreen;
