import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';
import { OrderWithService } from '@/src/interface/ordersInterface';

interface AppointmentCardProps {
  role: string;
  appointment: OrderWithService;
  onChatPress: () => void;
  onDetailsPress: () => void;
  onReviewPress: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ role, appointment, onChatPress, onDetailsPress, onReviewPress }) => {
  return (
    <View style={styles.card}>
      <Image source={ role==="Customer"? { uri: appointment.employee.avatar }:{ uri: appointment.customer.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {role==="Customer"?`${appointment.employee.personalInfo.firstName} ${appointment.employee.personalInfo.lastName}`
          :`${appointment.customer.personalInfo.firstName} ${appointment.customer.personalInfo.lastName}`}
        </Text>
        <Text style={styles.service}>{appointment.service.name}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={18}
              color={i < (appointment.employeeM.rating?appointment.employeeM.rating:0) ? '#FFD700' : '#C0C0C0'}
            />
          ))}
        </View>
         
        <View style={styles.buttonRow}>
          {role === "Customer" &&
          <TouchableOpacity style={styles.reviewButton} onPress={onReviewPress}>
            <Text style={styles.buttonText}>Đánh giá</Text>
          </TouchableOpacity>}
          <TouchableOpacity style={styles.reviewButton} onPress={onDetailsPress}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
          </View>
        </View>
      <View style={styles.actionColumn}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="favorite-border" size={24} color={Colors.red} />
        </TouchableOpacity>
        {role !== "Admin" && 
        <TouchableOpacity style={styles.chatButton} onPress={onChatPress}>
        <Text style={styles.buttonText}>Nhắn tin</Text>
      </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.mainColor1,
  },
  service: {
    fontSize: 14,
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  rebookButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  reviewButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flex: 1
  },
  actionColumn: {
    position: 'absolute',
    right: 10,
    top: 10,
    alignItems: 'center',
  },
  favoriteButton: {
    marginBottom: 8,
  },
  chatButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2
  },
});

export default AppointmentCard;
