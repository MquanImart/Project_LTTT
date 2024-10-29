import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';

interface Appointment {
  id: string;
  name: string;
  service: string;
  rating: number;
  avatar: string;
  date: string;
  time: string;
}

interface AppointmentUpcomingCardProps {
  appointment: Appointment;
  onDetailsPress: () => void;
  onAcceptPress: () => void;
  onRejectPress: () => void;
  onFavoritePress: () => void;
}

const AppointmentUpcomingCard: React.FC<AppointmentUpcomingCardProps> = ({
  appointment,
  onDetailsPress,
  onAcceptPress,
  onRejectPress,
  onFavoritePress,
}) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: appointment.avatar }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{appointment.name}</Text>
        <Text style={styles.service}>{appointment.service}</Text>
        <View style={styles.ratingContainer}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size={16}
              color={i < appointment.rating ? Colors.mainColor1 : Colors.icon}
            />
          ))}
        </View>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateContainer}>
            <Icon name="event" size={14} color={Colors.icon} />
            <Text style={styles.dateText}>{appointment.date}</Text>
          </View>
          <View style={styles.timeContainer}>
            <Icon name="access-time" size={14} color={Colors.icon} />
            <Text style={styles.timeText}>{appointment.time}</Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <TouchableOpacity style={styles.detailsButton} onPress={onDetailsPress}>
            <Text style={styles.buttonText}>Details</Text>
          </TouchableOpacity>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.acceptButton} onPress={onAcceptPress}>
              <Icon name="check" size={20} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={onRejectPress}>
              <Icon name="close" size={20} color={Colors.white} />
            </TouchableOpacity>
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
    alignItems: 'center',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.icon,
    borderRadius: 8,
    backgroundColor: Colors.background,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
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
    fontSize: 13,
    color: Colors.text,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 3,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
    gap: 10, // Tạo khoảng cách giữa date và time
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.icon,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 12,
    marginLeft: 3,
    color: Colors.text,
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
    color: Colors.text,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  detailsButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flex: 1,
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 15,
    padding: 6,
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: Colors.red,
    borderRadius: 15,
    padding: 6,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    textAlign: 'center',
  },
  favoriteButton: {
    marginLeft: 10,
    alignSelf: 'flex-start',
  },
});

export default AppointmentUpcomingCard;
