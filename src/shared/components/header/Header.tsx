import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from '@/src/styles/Color'; // Đảm bảo Colors được định nghĩa đúng
import { RootStackParamList } from '../../routes/LoginNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Header: React.FC<{ 
  title: string; 
  onBackPress?: () => void; 
  showBackButton?: boolean; 
  showLogout?: boolean;
}> = ({ title, onBackPress, showBackButton = true, showLogout = false }) => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const logout = async () => {
    try {
  
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.error("Lỗi khi xóa AsyncStorage: ", error);
    }
  };
  return (
    <View style={styles.header}>
      {showBackButton ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButtonPlaceholder} /> 
      )}

      {/* Tiêu đề */}
      <Text style={styles.title}>{title}</Text>

      {showLogout ? (
        <TouchableOpacity onPress={logout} style={styles.backButton}>
          <Icon name="logout" size={24} color="#fff" />
        </TouchableOpacity>
      ) : (
        <View style={styles.rightPlaceholder} /> 
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
    backgroundColor: Colors.mainColor1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 100,
  },
  backButton: {
    width: 40, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 40, 
  },
  rightPlaceholder: {
    width: 40, 
  },
  title: {
    flex: 1,
    textAlign: 'center', 
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', 
  },
});

export default Header;
