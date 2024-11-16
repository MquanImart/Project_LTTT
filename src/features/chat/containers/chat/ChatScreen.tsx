import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, Alert } from 'react-native';
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

type UserItem = {
  userId: string;
  avatar: string;
  firstName: string;
  lastName: string;
  role: string;
};

type ChatScreenProps = {
  navigation: NativeStackNavigationProp<ChatStackParamList, 'ChatScreen'>;
  route: RouteProp<ChatStackParamList, 'ChatScreen'>;
};

const ChatScreen: React.FC<ChatScreenProps> = ({ navigation }) => {
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [users, setUsers] = useState<UserItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchChats = async () => {
    try {
      const result = await restClient.chatClient.find({});
      if (result.success) {
        setChats(result.resData);
      } else {
        Alert.alert('Error', result.messages || 'Failed to load chats.');
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const result = await restClient.chatClientss.find({});
      if (result.success) {
        setUsers(result.resData);
      } else {
        Alert.alert('Error', result.messages || 'Failed to load users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const startChat = async (userId: string) => {
    navigation.navigate('ChatDetailScreen', {
      contactId: userId,
      contactName: users.find((user) => user.userId === userId)?.firstName || '',
      onNewMessage: fetchChats,
    });
    setModalVisible(false);
  };

  const deleteChat = async (userId: string) => {
    try {
      const result = await restClient.chatClient.remove(userId);
      if (result.success) {
        Alert.alert('Success', 'Chat deleted successfully.');
        fetchChats();
      } else {
        Alert.alert('Error', result.messages || 'Failed to delete chat.');
      }
    } catch (error) {
      console.error('Error deleting chat:', error);
      Alert.alert('Error', 'An error occurred while deleting the chat.');
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
          navigation.navigate('ChatDetailScreen', {
            contactId: item.userId,
            contactName: `${item.firstName} ${item.lastName}`,
            onNewMessage: fetchChats,
          })
        }
      >
        <Image source={{ uri: item.avatar || 'https://i.imgur.com/Z4MDNDb.jpeg' }} style={styles.avatar} />
        <View style={styles.chatContent}>
          <Text style={styles.chatName}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={styles.chatText}>{item.lastMessage.content}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteChat(item.userId)}>
        <Icon name="delete" size={24} color={Colors.grey} />
      </TouchableOpacity>
    </View>
  );

  const renderUserItem = ({ item }: { item: UserItem }) => (
    <TouchableOpacity style={styles.userItem} onPress={() => startChat(item.userId)}>
      <Image source={{ uri: item.avatar || 'https://i.imgur.com/Z4MDNDb.jpeg' }} style={styles.avatar} />
      <Text style={styles.userName}>{`${item.firstName} ${item.lastName}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Chat" onBackPress={() => navigation.goBack()} />
      <TouchableOpacity
        style={styles.newChatButton}
        onPress={() => {
          setModalVisible(true);
          fetchUsers();
        }}
      >
        <Text style={styles.newChatButtonText}>+ New Chat</Text>
      </TouchableOpacity>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => item.userId || index.toString()}
        contentContainerStyle={styles.chatList}
      />
      {/* Modal hiển thị danh sách người dùng */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select a user to chat</Text>
          </View>
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item, index) => item.userId || index.toString()}
            contentContainerStyle={styles.userList}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  newChatButton: {
    backgroundColor: Colors.mainColor1,
    padding: 10,
    margin: 15,
    borderRadius: 10,
  },
  newChatButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 40,
  },
  modalHeader: {
    backgroundColor: Colors.mainColor1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  userList: {
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.icon,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: Colors.text,
  },
  closeButton: {
    backgroundColor: Colors.grey,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChatScreen;
