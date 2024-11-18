import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "@/src/styles/Color";

interface TabDetailProp {
  tab: number;
  setTab: (value: number) => void;
}

const TabDetail = ({ tab, setTab }: TabDetailProp) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setTab(0)}
        style={[styles.tabButton, tab === 0 ? styles.buttonActive : styles.buttonInactive]}
      >
        <Text style={[styles.tabText, tab === 0 ? styles.textActive : styles.textInactive]}>
          Dịch vụ
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTab(1)}
        style={[styles.tabButton, tab === 1 ? styles.buttonActive : styles.buttonInactive]}
      >
        <Text style={[styles.tabText, tab === 1 ? styles.textActive : styles.textInactive]}>
          Đánh giá
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: 50,
    marginTop: 10,
    backgroundColor: Colors.white,
  },
  tabButton: {
    flex: 1, // Đảm bảo nút chiếm đều không gian trong vùng chứa
    justifyContent: "center",
    alignItems: "center",
    height: "100%", // Đảm bảo chiều cao nút đầy đủ
  },
  buttonActive: {
    backgroundColor: Colors.mainColor1,
  },
  buttonInactive: {
    backgroundColor: Colors.white,
    borderBottomWidth: 2,
    borderBottomColor: Colors.mainColor1, // Thêm viền dưới cho tab không được chọn
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  textActive: {
    color: Colors.white,
  },
  textInactive: {
    color: Colors.mainColor1,
  },
});

export default TabDetail;
