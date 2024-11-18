import Colors from "@/src/styles/Color";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { JobDetail, UserRole } from "@/src/interface/interface"; // Import UserRole
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BillCardProps {
  jobs: JobDetail[];
  setJobs: (value: JobDetail[]) => void;
  updateJob: (index: number, updatedField: Partial<JobDetail>) => Promise<void>;
  disableDelete?: boolean; // Thêm prop để kiểm soát việc xóa
}

const BillCard = ({ jobs, setJobs, updateJob, disableDelete = false }: BillCardProps) => {
  const [errors, setErrors] = useState<string[]>([]);
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem("role");
      setUserRole(role as UserRole);
    };
    fetchUserRole();
  }, []);

  const handlePriceChange = async (text: string, index: number) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      console.error("Bạn không có quyền chỉnh sửa giá.");
      return;
    }

    const price = parseFloat(text);

    if (isNaN(price) || price < 0) {
      const newErrors = [...errors];
      newErrors[index] = "Vui lòng nhập số hợp lệ";
      setErrors(newErrors);
      return;
    }

    const newErrors = [...errors];
    newErrors[index] = ""; // Clear error if valid
    setErrors(newErrors);

    try {
      await updateJob(index, { price });
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

  const handleDeleteJob = (index: number) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      console.error("Bạn không có quyền xóa công việc.");
      return;
    }

    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  };

  return (
    <View style={styles.card}>
      {jobs.map((job, index) => (
        <View style={styles.boxJob} key={index}>
          <Text style={styles.textJob}>{job.jobName}</Text>
          <TextInput
            value={job.price.toString()}
            editable={userRole === UserRole.Admin || userRole === UserRole.Employee} // Chỉ cho phép chỉnh sửa nếu là Admin/Customer
            onChangeText={(text) => handlePriceChange(text, index)}
            style={[styles.inputPrice, { color: "#000" }]} // Đảm bảo màu chữ rõ ràng
            mode="outlined"
            keyboardType="numeric"
            theme={{
              colors: {
                background: "#fff", // Màu nền trắng
                text: "#000",       // Màu chữ đen
                placeholder: "#aaa" // Placeholder màu xám
              },
            }}
          />
          <Text style={styles.textCurrency}>đ</Text>
          {!disableDelete &&
            (userRole === UserRole.Admin || userRole === UserRole.Employee) && ( // Nút xóa chỉ hiển thị với Admin và Customer
              <IconButton
                icon="delete"
                onPress={() => handleDeleteJob(index)}
                style={styles.deleteButton}
              />
            )}
          {errors[index] && <Text style={styles.errorText}>{errors[index]}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 10,
  },
  boxJob: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.mainColor2,
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  textJob: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  inputPrice: {
    width: 150,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
    color: "#000",
    backgroundColor: "#fff",
  },
  textCurrency: {
    fontSize: 16,
    color: "#000",
    marginLeft: 5,
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: Colors.mainColor1,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default BillCard;
