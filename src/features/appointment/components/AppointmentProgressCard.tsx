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

interface AppointmentProgressCardProps {
  appointment: Appointment;
  onCancelPress: () => void;
  onFavoritePress: () => void;
}

const AppointmentProgressCard: React.FC<AppointmentProgressCardProps> = ({
  appointment,
  onCancelPress,
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
              color={i < appointment.rating ? '#FFD700' : '#C0C0C0'}
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
        <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.progressContainer}>
          <View style={styles.progressStep}>
            <View style={[styles.statusCircle, { backgroundColor: '#FF5722' }]}>
              <Text style={styles.statusText}>1</Text>
            </View>
            <Text style={styles.statusLabel}>Accepted</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.statusCircle, { backgroundColor: '#03A9F4' }]}>
              <Text style={styles.statusText}>2</Text>
            </View>
            <Text style={styles.statusLabel}>In Progress</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressStep}>
            <View style={[styles.statusCircle, { backgroundColor: Colors.mainColor1 }]}>
              <Icon name="check" size={12} color={Colors.white} />
            </View>
            <Text style={styles.statusLabel}>Finished</Text>
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
});

export default AppointmentProgressCard;
