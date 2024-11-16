import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from './Styles';

type RootStackParamList = {
  BookJob: {
    jobName: string;
    jobImage: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'BookJob'>;

interface JobCardProps {
  name: string;
  image: string;
}

const JobCard: React.FC<JobCardProps> = ({ name, image }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate('BookJob', { jobName: name, jobImage: image });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
