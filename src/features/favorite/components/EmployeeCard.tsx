// src/features/home/containers/favorite-employee/EmployeeCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper'; // Import IconButton từ React Native Paper
import Colors from '@/src/styles/Color'; // Đảm bảo đường dẫn chính xác

interface EmployeeCardProps {
  name: string;
  rating: number;
  onChat: () => void;
  onMakeAppointment: () => void;
  avatar: string; // URL của ảnh đại diện
  onFavorite: () => void; // Hàm để xử lý khi nhấn nút trái tim
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  rating,
  onChat,
  onMakeAppointment,
  avatar,
  onFavorite,
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatar }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.nameFavoriteContainer}>
          <Text style={styles.name}>{name}</Text>
          <IconButton
            icon="heart" // Sử dụng icon trái tim
            size={24}
            onPress={onFavorite} // Gọi hàm khi nhấn
            style={styles.favoriteButton} // Thêm style cho nút trái tim
          />
        </View>
        <View style={styles.ratingChatContainer}>
          <Text style={styles.rating}>
            {'★'.repeat(rating).split('').map((_, index) => (
              <Text key={index} style={styles.ratingStar}>
                ★
              </Text>
            ))}
            {'☆'.repeat(5 - rating).split('').map((_, index) => (
              <Text key={index + rating} style={styles.ratingStarEmpty}>
                ☆
              </Text>
            ))}
          </Text>
          <TouchableOpacity style={styles.chatButton} onPress={onChat}>
            <Text style={styles.buttonText}>Chat</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.appointmentButton} onPress={onMakeAppointment}>
          <Text style={styles.buttonText}>Make Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mainColor1,
    borderRadius: 8,
    margin: 10,
    padding: 10,
    backgroundColor: Colors.background,
    elevation: 2,
  },
  avatarContainer: {
    marginRight: 10, // Giảm khoảng cách giữa avatar và tên
  },
  image: {
    width: 140, // Kích thước avatar
    height: 140, // Kích thước avatar
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Đặt các thành phần về phía trên
  },
  nameFavoriteContainer: {
    flexDirection: 'row', // Đặt tên và trái tim cùng hàng ngang
    justifyContent: 'space-between', // Căn chỉnh chúng
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 5, // Khoảng cách giữa tên/trái tim và rating
  },
  name: {
    fontSize: 20, // Tăng kích thước chữ tên
    fontWeight: 'bold',
    color: Colors.text,
  },
  ratingChatContainer: {
    flexDirection: 'row', // Đặt rating và chat cùng hàng ngang
    justifyContent: 'space-between', // Căn chỉnh chúng
    alignItems: 'center', // Căn giữa theo chiều dọc
    marginBottom: 5, // Khoảng cách giữa hàng này và hàng nút dưới
  },
  rating: {
    fontSize: 25, // Tăng kích thước chữ rating
    marginBottom: 0, // Không cần margin ở đây
  },
  ratingStar: {
    color: 'gold', // Màu vàng cho icon rating
  },
  ratingStarEmpty: {
    color: Colors.icon, // Màu mặc định cho sao trống
  },
  buttonContainer: {
    flexDirection: 'column', // Đặt các nút theo chiều dọc
    alignItems: 'flex-end', // Căn nút về phía bên phải
    width: '100%', // Đảm bảo chiếm hết chiều rộng
  },
  favoriteButton: {
    marginLeft: 10, // Khoảng cách giữa tên và nút trái tim
  },
  chatButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    paddingVertical: 8, // Giảm chiều cao của nút
    paddingHorizontal: 10,
    marginBottom: 2, // Giảm khoảng cách giữa nút Chat và nút Make Appointment
  },
  appointmentButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    paddingVertical: 8, // Giảm chiều cao của nút
    paddingHorizontal: 10,
    flex: 1, // Chiếm hết chiều rộng còn lại
    alignSelf: 'stretch', // Đảm bảo nút chiếm toàn bộ chiều rộng
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmployeeCard;
