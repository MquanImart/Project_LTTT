// src/components/Footer.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/src/styles/Color'; // Đảm bảo đường dẫn chính xác
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import icon nếu cần

const Footer: React.FC = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="home" size={24} color={Colors.icon} />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="favorite" size={24} color={Colors.mainColor1} />
        <Text style={styles.footerText}>Favourite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="chat" size={24} color={Colors.icon} />
        <Text style={styles.footerText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton}>
        <Icon name="person" size={24} color={Colors.icon} />
        <Text style={styles.footerText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: Colors.icon, // Màu đường viền trên
    backgroundColor: Colors.white, // Màu nền footer
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: Colors.icon, // Màu chữ
  },
});

export default Footer;
