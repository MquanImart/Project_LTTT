import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./Styles";
import { Service } from "@/src/interface/interface"; // Import interface Service

type RootStackParamList = {
  BookJob: {
    jobName: string;
    jobImage: string;
    jobId: string;
  };
};

type NavigationProp = StackNavigationProp<RootStackParamList, "BookJob">;

interface JobCardProps {
  service: Service; // Nhận props là một object Service
}

const JobCard: React.FC<JobCardProps> = ({ service }) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    navigation.navigate("BookJob", {
      jobName: service.name,
      jobImage: service.img,
      jobId: service.id, // Truyền jobId
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <Image source={{ uri: service.img }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title}>{service.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;
