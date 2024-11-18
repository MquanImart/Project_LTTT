import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Header from '@/src/shared/components/header/Header';
import { AppointmentStackParamList } from '@/src/shared/routes/AppointmentNavigation';
import restClient from '@/src/shared/services/RestClient';
import Toast from 'react-native-toast-message';

type ReviewScreenRouteProp = RouteProp<AppointmentStackParamList, 'Review'>;

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();
  const route = useRoute<ReviewScreenRouteProp>();
  const { appointment } = route.params;
  const [rating, setRating] = useState(appointment.employeeM.rating || 0);
  const [comment, setComment] = useState('');

  const handleStarPress = (value: number) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    const reviewClient = restClient.apiClient.service("reviews");
    const result = await reviewClient.create({
      customerId: appointment.customer._id, 
      employeeId: appointment.employee._id,
      content: comment,
      rating: rating
    })

    if (result.success){
      Toast.show({
        type: "success",
        text1: "Đánh giá thành công",
        text2: "Đánh giá của bạn đã được cập nhật.",
      });
      navigation.goBack();
    } else {
      Toast.show({
        type: "error",
        text1: "Đánh giá thất bại",
        text2: "Vui lòng thử lại sau.",
      });
    }
  }
  return (
    <View style={styles.container}>
      <Header title="Đánh giá" onBackPress={() => navigation.goBack()} />

      <View style={styles.content}>
        <Image source={{ uri: appointment.employee.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{`${appointment.employee.personalInfo.firstName} ${appointment.employee.personalInfo.lastName}`}</Text>
        <Text style={styles.service}>{appointment.service.name}</Text>
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
          placeholder="Nhập đánh giá của bạn..."
          placeholderTextColor={Colors.mainColor1}
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Đánh giá</Text>
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
