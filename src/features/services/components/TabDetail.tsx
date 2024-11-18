import Colors from "@/src/styles/Color";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface TabDetailProp {
  tab: number;
  setTab: (value: number) => void;
}

const TabDetail = ({ tab, setTab }: TabDetailProp) => {
console.log("Current tab:", tab); // Kiểm tra giá trị tab
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => setTab(0)}
        labelStyle={tab === 0 ? styles.textWhite : styles.textBlack}
        style={[styles.boxbutton, tab === 0 && styles.buttonChoose]} // Áp dụng style khi được chọn
      >
        Chi tiết công việc
      </Button>
      <Button
        mode="contained"
        onPress={() => setTab(1)}
        labelStyle={tab === 1 ? styles.textWhite : styles.textBlack}
        style={[styles.boxbutton, tab === 1 && styles.buttonChoose]} // Áp dụng style khi được chọn
      >
        Hóa đơn
      </Button>
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
  boxbutton: {
    width: "50%",
    height: "100%",
    backgroundColor: "#fff", // Nền trắng mặc định
    borderRadius: 0,
    borderBottomColor: Colors.mainColor1,
    borderBottomWidth: 2,
    borderStyle: "solid",
  },
  buttonChoose: {
    backgroundColor: Colors.mainColor1, // Nền xanh khi được chọn
  },
  textWhite: {
    color: "#fff", // Chữ trắng
  },
  textBlack: {
    color: "#000", // Chữ đen
  },
});

export default TabDetail;
