import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import Colors from '@/src/styles/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RouteProp } from '@react-navigation/native';
import Header from '@/src/shared/components/Header';
import { ChatStackParamList } from '@/src/shared/routes/ChatNavigation';

type ChatDetailScreenProps = {
  navigation: any;
  route: RouteProp<ChatStackParamList, 'ChatDetailScreen'>;
};

type Message = {
  id: string;
  type: 'text' | 'audio';
  content: string;
  time: string;
  sender: 'user' | 'contact';
  avatar?: string;
};

const messages: Message[] = [
  {
    id: '1',
    type: 'text',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '09:00',
    sender: 'user',
  },
  {
    id: '2',
    type: 'text',
    content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    time: '09:30',
    sender: 'contact',
  },
  {
    id: '3',
    type: 'audio',
    content: 'https://example.com/audio.mp3',
    time: '09:50',
    sender: 'contact',
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
  },
];

const ChatDetailScreen: React.FC<ChatDetailScreenProps> = ({ navigation, route }) => {
  const { contactId, contactName } = route.params;
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    console.log(`Viewing chat details for contact ID: ${contactId}, Name: ${contactName}`);
  }, [contactId, contactName]);

  const renderMessageItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : styles.contactMessage]}>
      {item.type === 'text' ? (
        <Text style={styles.messageText}>{item.content}</Text>
      ) : (
        <View style={styles.audioMessageContainer}>
          {item.avatar && <Image source={{ uri: item.avatar }} style={styles.avatar} />}
          <View style={styles.audioPlayer}>
            <Icon name="play-arrow" size={24} color={Colors.mainColor1} />
            <Text style={styles.audioDuration}>02:50</Text>
          </View>
        </View>
      )}
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title={contactName} onBackPress={() => navigation.goBack()} />
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messageList}
      />
      <Text style={styles.typingIndicator}>{contactName} is typing...</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Write Here..."
          placeholderTextColor={Colors.icon}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton}>
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
  audioMessageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  audioPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f4ea',
    padding: 8,
    borderRadius: 10,
  },
  audioDuration: {
    marginLeft: 5,
    fontSize: 12,
    color: Colors.icon,
  },
  typingIndicator: {
    fontSize: 14,
    color: Colors.mainColor1,
    paddingHorizontal: 15,
    paddingVertical: 5,
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
