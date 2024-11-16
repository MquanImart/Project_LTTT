import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Colors from '@/src/styles/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import Header from '@/src/shared/components/header/Header';
import { ChatStackParamList } from '@/src/shared/routes/ChatNavigation';
import restClient from '@/src/shared/services/RestClient';
import { Chat, MessageType } from '@/src/interface/interface';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ChatDetailScreenProps = {
  navigation: any;
  route: RouteProp<ChatStackParamList, 'ChatDetailScreen'>;
};

const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ navigation, route }) => {
  const { contactId, contactName, onNewMessage } = route.params;  // Lấy hàm onNewMessage từ params
  const [messages, setMessages] = useState<Chat[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchChatDetails = async () => {
    if (!currentUserId) return;
    const params = new URLSearchParams();
    params.append('participants', currentUserId);
    params.append('participants', contactId);

    try {
      const result = await restClient.chatClients.find(params);

      if (result.success) {
        setMessages(result.resData);
      } else {
        console.error(result.messages);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setCurrentUserId(userId);
    };
    getUserId();
    fetchChatDetails();
  }, [currentUserId]);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const chatRequest = {
      participants: [currentUserId, contactId],
      message: {
        type: MessageType.Text,
        content: inputText,
      },
      senderId: currentUserId,
    };

    try {
      const result = await restClient.chatClient.create(chatRequest);

      if (result.success) {
        setMessages((prev) => [...prev, result.resData]);
        setInputText('');
        onNewMessage();  // Gọi hàm onNewMessage để làm mới danh sách chat trong ChatScreen
      } else {
        console.error(result.messages);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderMessageItem = ({ item }: { item: Chat }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId === currentUserId ? styles.userMessage : styles.contactMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.message.content}</Text>
      <Text style={styles.messageTime}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={contactName} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write Here..."
          placeholderTextColor={Colors.icon}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
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
  },
  messageContainer: {
    maxWidth: '75%',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#cfe2ff',
  },
  contactMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6f4ea',
  },
  messageText: {
    fontSize: 14,
    color: Colors.text,
  },
  messageTime: {
    fontSize: 10,
    color: Colors.icon,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.mainColor1,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatDetailScreen;
