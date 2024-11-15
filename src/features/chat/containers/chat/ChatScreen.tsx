import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Colors from '@/src/styles/Color';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import Header from '@/src/shared/components/header/Header';
import { ChatStackParamList } from '@/src/shared/routes/ChatNavigation';
import restClient from '@/src/shared/services/RestClient';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ChatItem = {
  userId: string;
  avatar: string;
  lastName: string;
  firstName: string;
  role: string;
  lastMessage: {
    type: 'Text' | 'Image' | 'Video';
    content: string;
  };
};

type ChatScreenProps = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'ChatScreen'>;
  route: RouteProp<ChatStackParamList, 'ChatScreen'>;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const [chats, setChats] = useState<ChatItem[]>([]);

  const fetchChats = async () => {
    const result = await restClient.chatClient.find({});
    if (result.success) {
      setChats(result.resData); 
    } else {
      console.error(result.messages);
    }
  };

  const deleteChat = async (userId: string) => {
    try {
        console.log('1')
        const result = await restClient.chatClient.remove(userId);
        if (result.success) {
            // Gọi lại fetchChats để cập nhật danh sách chats từ server
            await fetchChats();
            console.log('xóa thành công')
            console.log(chats)
            Alert.alert("Success", "The chat has been deleted successfully.");
        } else {
            Alert.alert("Error", result.messages || "Failed to delete the chat.");
        }
    } catch (error) {
        console.error("Delete chat error:", error);
        Alert.alert("Error", "Failed to delete the chat.");
    }
};



  useEffect(() => {
    fetchChats();
  }, []);

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <View style={styles.chatContainer}>
      <TouchableOpacity
        style={styles.chatDetails}
        onPress={() =>
          navigation.navigate('ChatDetailScreen', { contactId: item.userId, contactName: `${item.firstName} ${item.lastName}` })
        }
      >
        <Image source={{ uri: item.avatar || 'https://i.imgur.com/Z4MDNDb.jpeg' }} style={styles.avatar} />
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={styles.chatText}>{item.lastMessage.content}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteChat(item.userId)} style={styles.deleteIcon}>
        <Icon name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Chat" onBackPress={() => navigation.goBack()} />
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.chatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  chatList: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 70,
  },
  chatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.icon,
    alignSelf: 'stretch',
  },
  chatDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  chatContent: {
    flex: 1,
    marginLeft: 10,
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  chatText: {
    fontSize: 14,
    color: Colors.icon,
  },
  deleteIcon: {
    paddingHorizontal: 10,
  },
});

export default ChatScreen;
