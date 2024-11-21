import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { IconButton } from "react-native-paper";
import Colors from "@/src/styles/Color";

interface EmployeeCardProps {
  name: string;
  rating: number;
  onChat: () => void;
  avatar: string;
  onFavorite: () => void;
  isFavorite?: boolean;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({
  name,
  rating,
  onChat,
  avatar,
  onFavorite,
  isFavorite = true,
}) => {
  const [loading, setLoading] = useState(false);

  const handleFavoritePress = async () => {
    if (loading) return;
    setLoading(true);
    await onFavorite();
    setLoading(false);
  };
  
  const imageUri = avatar.startsWith("data:image")
    ? avatar
    : `data:image/png;base64,${avatar}`;

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.nameFavoriteContainer}>
          <Text style={styles.name}>{name}</Text>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.mainColor1} />
          ) : (
            <IconButton
              icon={isFavorite ? "heart" : "heart-outline"}
              size={24}
              onPress={handleFavoritePress}
              style={styles.favoriteButton}
            />
          )}
        </View>
        <View style={styles.ratingChatContainer}>
          <Text style={styles.rating}>
            {"★".repeat(rating).split("").map((_, index) => (
              <Text key={index} style={styles.ratingStar}>
                ★
              </Text>
            ))}
            {"☆".repeat(5 - rating).split("").map((_, index) => (
              <Text key={index + rating} style={styles.ratingStarEmpty}>
                ☆
              </Text>
            ))}
          </Text>
          <TouchableOpacity style={styles.chatButton} onPress={onChat}>
            <Text style={styles.buttonText}>Nhắn tin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.mainColor1,
    borderRadius: 8,
    margin: 8,
    padding: 8,
    backgroundColor: Colors.background,
    elevation: 1,
  },
  avatarContainer: {
    marginRight: 8,
  },
  image: {
    width: 80, // Giảm kích thước ảnh
    height: 80,
    borderRadius: 40, // Thêm bo tròn cho ảnh
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  nameFavoriteContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16, // Giảm kích thước chữ
    fontWeight: "bold",
    color: Colors.text,
  },
  ratingChatContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  rating: {
    fontSize: 18, // Giảm kích thước sao
  },
  ratingStar: {
    color: "gold",
  },
  ratingStarEmpty: {
    color: Colors.icon,
  },
  chatButton: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 5,
    paddingVertical: 6, // Giảm padding nút
    paddingHorizontal: 8,
  },
  favoriteButton: {
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14, // Giảm kích thước chữ trên nút
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});


export default EmployeeCard;
