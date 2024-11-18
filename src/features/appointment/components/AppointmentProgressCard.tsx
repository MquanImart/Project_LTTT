import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';
import { OrderWithService } from '@/src/interface/ordersInterface';

interface AppointmentProgressCardProps {
  role: string;
  appointment: OrderWithService;
  onCancelPress: () => void;
  onDetailsPress: () => void;
  onFavoritePress: () => void;
}

const AppointmentProgressCard: React.FC<AppointmentProgressCardProps> = ({
  role,
  appointment,
  onCancelPress,
  onDetailsPress,
  onFavoritePress,
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
              color={i < (appointment.employeeM.rating?appointment.employeeM.rating:0) ? '#FFD700' : '#C0C0C0'}
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
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.reviewButton} onPress={onCancelPress}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton} onPress={onDetailsPress}>
            <Text style={styles.buttonText}>Chi tiết</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.statusCircle, { backgroundColor: '#FF5722' }]}>
              <Text style={styles.statusText}>1</Text>
            </View>
            <Text style={styles.statusLabel}>Chờ duyệt</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.statusCircle, { backgroundColor: '#03A9F4' }]}>
              <Text style={styles.statusText}>2</Text>
            </View>
            <Text style={styles.statusLabel}>Đang thực hiện</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.statusCircle, { backgroundColor: Colors.mainColor1 }]}>
              <Icon name="check" size={12} color={Colors.white} />
            </View>
            <Text style={styles.statusLabel}>Hoàn thành</Text>
          </View>
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
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 80,
    height: 80,
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
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
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
    borderColor: '#ddd',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
  },
  timeText: {
    fontSize: 12,
    marginLeft: 3,
    color: Colors.icon,
  },
  cancelButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    width: 250, 
    paddingVertical: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  progressStep: {
    alignItems: 'center',
  },
  statusCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusText: {
    color: Colors.white,
    fontSize: 10,
  },
  progressLine: {
    width: 30,
    height: 2,
    backgroundColor: '#ddd',
  },
  statusLabel: {
    fontSize: 10,
    color: Colors.text,
    marginTop: 3,
  },
  favoriteButton: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 5,
  },
  reviewButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    padding: 10,
    margin: 10,
    flex: 1
  },
});

export default AppointmentProgressCard;
