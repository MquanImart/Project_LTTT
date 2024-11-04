// src/features/home/containers/favorite-employee/FavoriteEmployeeScreen.tsx

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import EmployeeCard from '@/src/features/favorite/components/EmployeeCard';
import Colors from '@/src/styles/Color'; // Đảm bảo đường dẫn chính xác
import Header from '@/src/shared/components/header/Header';


const FavoriteEmployeeScreen = () => {
  // Mẫu dữ liệu cho nhân viên yêu thích
  const favoriteEmployees = [
    {
      id: '1',
      name: 'Olivia Turner',
      rating: 4,
      avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    },
    {
      id: '2',
      name: 'John Doe',
      rating: 5,
      avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    },
    {
      id: '3',
      name: 'Olivia Turner',
      rating: 4,
      avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    },
    {
      id: '4',
      name: 'John Doe',
      rating: 5,
      avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    },
    {
      id: '5',
      name: 'Olivia Turner',
      rating: 4,
      avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    },
    {
      id: '6',
      name: 'John Doe',
      rating: 5,
      avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    },
  ];

  const handleChat = (id: string) => {
    console.log(`Chat with employee ID: ${id}`);
  };

  const handleMakeAppointment = (id: string) => {
    console.log(`Make appointment with employee ID: ${id}`);
  };

  const handleFavorite = (id: string) => {
    console.log(`Favorite employee ID: ${id}`);
  };

  return (
    <View style={styles.container}>
      <Header title="Favorite" onBackPress={() => console.log('Back Pressed')} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {favoriteEmployees.map(employee => (
          <EmployeeCard
            key={employee.id}
            name={employee.name}
            rating={employee.rating}
            onChat={() => handleChat(employee.id)}
            onMakeAppointment={() => handleMakeAppointment(employee.id)}
            avatar={employee.avatar}
            onFavorite={() => handleFavorite(employee.id)} // Thêm hàm xử lý cho nút trái tim
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingBottom: 70, 
  },
});

export default FavoriteEmployeeScreen;
