import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
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
  const { contactId, contactName, onNewMessage } = route.params; // Receive the callback `onNewMessage`
  const [messages, setMessages] = useState<Chat[]>([]);
  const [inputText, setInputText] = useState('');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Create a ref for the FlatList
  const flatListRef = useRef<FlatList>(null);

  // Fetch the current user's ID and chat details
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem('userId');
      setCurrentUserId(userId);
      if (userId) {
        fetchChatDetails(userId);
      }
    };
    getUserId();
  }, []);

  const fetchChatDetails = async (userId: string) => {
    const params = new URLSearchParams();
    params.append('participants', userId);
    params.append('participants', contactId);

    try {
      const result = await restClient.chatClients.find(params);
      if (result.success) {
        setMessages(result.resData);
      } else {
        console.error('Error fetching chat details:', result.message);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim() || !currentUserId) return;

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
        setMessages((prev) => [...prev, result.resData]); // Update local messages
        setInputText('');
        onNewMessage && onNewMessage(); // Trigger callback to update the previous screen
        // Scroll to the bottom after sending a message
        flatListRef.current?.scrollToEnd({ animated: true });
      } else {
        console.error('Error sending message:', result.message);
      }
    } catch (error) {
      console.error('Error sending message:', error);
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
      <Text style={styles.messageTime}>{new Date(Number(item.createdAt)).toLocaleTimeString()}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Header title={contactName} onBackPress={() => navigation.goBack()} />
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => item._id || index.toString()}
        contentContainerStyle={styles.messageList}
        onContentSizeChange={() => {
          // Scroll to the bottom when new messages are added
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
        }}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write Here..."
          placeholderTextColor={Colors.icon}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={sendMessage} // Allows sending message when 'Enter' is pressed
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Icon name="send" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
