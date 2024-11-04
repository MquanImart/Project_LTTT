import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/src/shared/routes/MainNavigator';
import Header from '@/src/shared/components/header/Header';

type ReviewScreenRouteProp = RouteProp<RootStackParamList, 'Review'>;

const ReviewScreen: React.FC = () => {
  const route = useRoute<ReviewScreenRouteProp>();
  const { appointment } = route.params;
  const [rating, setRating] = useState(appointment.rating || 0);
  const [comment, setComment] = useState('');

  const handleStarPress = (value: number) => {
    setRating(value);
  };

  return (
    <View style={styles.container}>
      <Header title="Review" onBackPress={() => console.log('Back Pressed')} />

      <View style={styles.content}>
        <Image source={{ uri: appointment.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{appointment.name}</Text>
        <Text style={styles.service}>{appointment.service}</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <TouchableOpacity key={value} onPress={() => handleStarPress(value)}>
              <Icon
                name="star"
                size={30}
                color={value <= rating ? Colors.mainColor1 : Colors.icon}
              />
            </TouchableOpacity>
          ))}
        </View>
        <TextInput
          style={styles.commentInput}
          placeholder="Enter Your Comment Here..."
          placeholderTextColor={Colors.mainColor1}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.mainColor1,
    marginTop: 10,
  },
  service: {
    fontSize: 14,
    color: Colors.icon,
    marginBottom: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderColor: Colors.icon,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#f0f8ff',
    textAlignVertical: 'top',
    fontSize: 14,
    color: Colors.text,
  },
  submitButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 20,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReviewScreen;
