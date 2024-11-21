import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import { Button, List, Provider, Searchbar } from "react-native-paper";
import Header from "@/src/shared/components/header/Header";
import styles from "./stylesBoard";
import useBoard from "./useBoard";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ManageEmployeeStackParamList } from "@/src/shared/routes/ManageEmployeeNav";

type DetailEmployeeNavigationProp = NativeStackNavigationProp<
  ManageEmployeeStackParamList,
  "Details"
>;

const BoardEmployee = () => {
  const navigation = useNavigation<DetailEmployeeNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");

  const { listEmployee, loading, error, fetchEmployees, handleSearch } = useBoard();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleNavigateDetails = (employeeId: string) => {
    navigation.navigate("Details", { employeeId });
  };

  const handleRegister = () => {
    navigation.navigate("RegisterEmployee");
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    handleSearch(query); // Thực hiện tìm kiếm cục bộ
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Đang tải danh sách nhân viên...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <Text style={{ color: "red", fontSize: 16 }}>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <Provider>
      <Header title={"Quản lý nhân viên"} showBackButton={false} />
      <View style={styles.boxTitle}>
        <Text style={styles.textTitle}>Nhân viên</Text>
        <Button
          style={styles.buttonTitle}
          icon="account-plus"
          mode="contained"
          labelStyle={{ color: "#fff" }}
          onPress={handleRegister}
        >
          Tạo tài khoản
        </Button>
      </View>
      <View style={styles.boxTitle}>
        <Searchbar
          placeholder="Tìm kiếm theo tên"
          onChangeText={handleSearchChange} // Tìm kiếm theo thời gian thực
          onSubmitEditing={() => handleSearch(searchQuery)} // Tìm kiếm khi nhấn Enter
          value={searchQuery}
          style={{ backgroundColor: "white", minWidth: "98%" }}
          inputStyle={{ color: "black" }}
        />
      </View>
      <View style={{ minHeight: 300, width: "100%", padding: 10 }}>
        <FlatList
          data={listEmployee}
          style={{ height: 550 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <List.Item
              title={`${item.firstName} ${item.lastName}`}
              description={item.phone}
              onPress={() => handleNavigateDetails(item.id)}
              style={styles.item}
              titleStyle={styles.title}
              descriptionStyle={styles.description}
              left={() => (
                <Image
                  source={{ uri: item.avatar || "https://via.placeholder.com/50" }}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    marginRight: 10,
                  }}
                />
              )}
            />
          )}
        />
      </View>
    </Provider>
  );
};

export default BoardEmployee;
