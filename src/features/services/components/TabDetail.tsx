import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
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
        style={[styles.boxButton, tab === 0 && styles.buttonChoose]} // Áp dụng style khi được chọn
      >
        <Text style={tab === 0 ? styles.textWhite : styles.textBlack}>Chi tiết công việc</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setTab(1)}
        style={[styles.boxButton, tab === 1 && styles.buttonChoose]} // Áp dụng style khi được chọn
      >
        <Text style={tab === 1 ? styles.textWhite : styles.textBlack}>Hóa đơn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 10,
  },
  boxButton: {
    flex: 1,
    height: "100%",
    backgroundColor: "#fff", // Nền trắng mặc định
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: Colors.mainColor1,
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
  buttonChoose: {
    backgroundColor: Colors.mainColor1, // Nền xanh khi được chọn
  },
  textWhite: {
    color: "#fff", // Chữ trắng
    fontWeight: "bold",
    fontSize: 16,
  },
  textBlack: {
    color: "#000", // Chữ đen
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default TabDetail;
