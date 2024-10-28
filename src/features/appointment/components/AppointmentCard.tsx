import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Appointment {
  id: string;
  name: string;
  service: string;
  rating: number;
  avatar: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onChatPress: () => void;
  onRebookPress: () => void;
  onReviewPress: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onChatPress, onRebookPress, onReviewPress }) => {
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
              size={18}
              color={i < appointment.rating ? '#FFD700' : '#C0C0C0'}
            />
          ))}
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.rebookButton} onPress={onRebookPress}>
            <Text style={styles.buttonText}>Re-Book</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reviewButton} onPress={onReviewPress}>
            <Text style={styles.buttonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.actionColumn}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="favorite-border" size={24} color="#ff0000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatButton} onPress={onChatPress}>
          <Text style={styles.buttonText}>Chat</Text>
        </TouchableOpacity>
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
    backgroundColor: '#fff',
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
    color: '#4CAF50',
  },
  service: {
    fontSize: 14,
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  rebookButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    flex: 1,
    marginRight: 5,
  },
  reviewButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    padding: 10,
    flex: 1,
  },
  actionColumn: {
    position: 'absolute', // Đặt cố định
    right: 10, // Căn lề phải
    top: 10, // Căn cao hơn để nằm trên các nút
    alignItems: 'center',
  },
  favoriteButton: {
    marginBottom: 8,
  },
  chatButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default AppointmentCard;
