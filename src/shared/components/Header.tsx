// src/components/Header.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/src/styles/Color'; // Đảm bảo đường dẫn chính xác
import Icon from '@expo/vector-icons/build/MaterialCommunityIcons'; // Import icon nếu cần

const Header: React.FC<{ title: string; onBackPress: () => void }> = ({ title, onBackPress }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBackPress}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          <Icon name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="filter-list" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.mainColor1, // Màu nền header
    paddingVertical: 10,
    paddingHorizontal: 15,
    height: 100,
  },
  title: {
    fontSize: 24, // Tăng kích thước chữ để nổi bật hơn
    fontWeight: 'bold',
    color: '#fff', // Màu chữ trắng
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
