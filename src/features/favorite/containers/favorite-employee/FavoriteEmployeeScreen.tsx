import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import EmployeeCard from "@/src/features/favorite/components/EmployeeCard";
import Colors from "@/src/styles/Color";
import Header from "@/src/shared/components/header/Header";
import restClient from "@/src/shared/services/RestClient";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/src/shared/routes/FavouriteNavigation";

type FavoriteEmployeeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "FavoriteEmployee">;
};

const FavoriteEmployeeScreen: React.FC<FavoriteEmployeeScreenProps> = ({ navigation }) => {
  const [favoriteEmployees, setFavoriteEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Lấy userId từ AsyncStorage
  useEffect(() => {
    const getUserId = async () => {
      const userId = await AsyncStorage.getItem("userId");
      setCurrentUserId(userId);
    };
    getUserId();
  }, []);

  const fetchFavoriteEmployees = async () => {
    try {
      if (!currentUserId) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Không tìm thấy thông tin người dùng.",
        });
        setLoading(false);
        return;
      }

      const result = await restClient.apiClient
        .service(`users/${currentUserId}/favorite-employees`)
        .find({});
      if (result.success) {
        setFavoriteEmployees(result.data);
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: result.message || "Không thể tải danh sách nhân viên yêu thích.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi trong quá trình tải dữ liệu.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUserId) fetchFavoriteEmployees();
  }, [currentUserId]);

  const handleChat = (employeeId: string, contactName: string) => {
    if (!currentUserId) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không tìm thấy thông tin người dùng hiện tại.",
      });
      return;
    }

    navigation.navigate("ChatDetailScreen", {
      contactId: employeeId,
      contactName,
      onNewMessage: fetchFavoriteEmployees,
    });
  };

  const handleFavorite = async (employeeId: string) => {
    try {
      if (!currentUserId) return;
      const result = await restClient.apiClient
        .service(`users/${currentUserId}/favorite-employees`)
        .remove(employeeId);
      if (result.success) {
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Nhân viên đã được loại khỏi danh sách yêu thích.",
        });
        fetchFavoriteEmployees();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Không thể loại nhân viên khỏi danh sách yêu thích.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Nhân viên yêu thích" onBackPress={() => navigation.goBack()} />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.mainColor1} style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {favoriteEmployees.map((employee: any) => (
            <EmployeeCard
              key={employee.employeeId}
              name={`${employee.firstName} ${employee.lastName}`}
              rating={employee.rating || 0}
              onChat={() =>
                handleChat(employee.employeeId, `${employee.firstName} ${employee.lastName}`)
              }
              avatar={employee.avatar}
              onFavorite={() => handleFavorite(employee.employeeId)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    paddingBottom: 70,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FavoriteEmployeeScreen;
