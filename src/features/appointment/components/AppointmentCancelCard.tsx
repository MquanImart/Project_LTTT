import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';
import { OrderWithService } from '@/src/interface/ordersInterface';

interface AppointmentCancelCardProps {
  role: string;
  appointment: OrderWithService;
  onFavoritePress: () => void;
  onDetailsPress: () => void;
}

const AppointmentCancelCard: React.FC<AppointmentCancelCardProps> = ({
  role,
  appointment,
  onFavoritePress,
  onDetailsPress
}) => {
  const date = new Date(appointment.order.startDate);
  return (
    <View style={styles.card}>
      <Image source={role==="Customer"? { uri: appointment.employee.avatar }:{ uri: appointment.customer.avatar }} style={styles.avatar} />
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
              size={16}
              color={i < (appointment.employeeM.rating?appointment.employeeM.rating:0) ? '#FFD700' : Colors.icon}
            />
          ))}
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Icon name="event" size={14} color={Colors.icon} />
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Icon name="access-time" size={14} color={Colors.icon} />
            <Text style={styles.timeText}>{date.toTimeString().split(' ')[0]}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
        <Text style={styles.reasonLabel}>Lý do hủy</Text>
        <View style={styles.reasonContainer}>
          <Text style={styles.reasonText}>{appointment.order.cancelReason}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={onFavoritePress}>
        <Icon name="favorite-border" size={24} color={Colors.red} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    card: {
      flexDirection: 'row',
      padding: 10,
      marginVertical: 5,
      marginHorizontal: 10,
      borderWidth: 1,
      borderColor: Colors.icon,
      borderRadius: 8,
      backgroundColor: Colors.background,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    infoContainer: {
      flex: 1,
      marginLeft: 10,
    },
    name: {
      fontWeight: 'bold',
      fontSize: 16,
      color: Colors.text,
    },
    service: {
      fontSize: 13,
      color: Colors.icon,
    },
    ratingContainer: {
      flexDirection: 'row',
      marginVertical: 5,
    },
    dateTimeContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      justifyContent: 'flex-start',
    },
    dateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.icon,
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 5,
      marginRight: 5, // Tạo khoảng cách giữa date và time
    },
    dateText: {
      fontSize: 12,
      marginLeft: 3,
      color: Colors.icon,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors.icon,
      paddingHorizontal: 4,
      paddingVertical: 2,
      borderRadius: 5,
    },
    timeText: {
      fontSize: 12,
      marginLeft: 3,
      color: Colors.icon,
    },
    rebookButton: {
      backgroundColor: Colors.mainColor1,
      borderRadius: 5,
      paddingVertical: 8,
      paddingHorizontal: 20,
      alignSelf: 'flex-start',
      marginVertical: 5,
    },
    buttonText: {
      color: Colors.white,
      fontSize: 12,
      textAlign: 'center',
    },
    reasonLabel: {
      fontSize: 14,
      color: Colors.text,
      marginTop: 8,
    },
    reasonContainer: {
      marginTop: 5,
      padding: 8,
      borderWidth: 1,
      borderColor: Colors.icon,
      borderRadius: 5,
    },
    reasonText: {
      color: Colors.icon,
      fontSize: 12,
    },
    favoriteButton: {
      alignSelf: 'flex-start',
      marginLeft: 10,
    },
    detailsButton: {
      backgroundColor: Colors.mainColor1,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      flex: 1,
      marginRight: 10,
    },
});
  

  

export default AppointmentCancelCard;
