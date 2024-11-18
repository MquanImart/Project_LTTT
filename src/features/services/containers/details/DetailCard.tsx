import Colors from "@/src/styles/Color";
import { View, StyleSheet, Text } from "react-native";
import { TextInput, Button, IconButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { JobDetail, UserRole } from "@/src/interface/interface"; // Import UserRole
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DetailCardProps {
  jobs: JobDetail[];
  setJobs: (value: JobDetail[]) => void;
  updateJob: (index: number, updatedField: Partial<JobDetail>) => Promise<void>;
  addJob: (newJob: JobDetail) => Promise<void>;
  deleteJob: (index: number) => Promise<void>;
  orderId: string; // ID của đơn hàng
}

const DetailCard = ({
  jobs,
  setJobs,
  updateJob,
  addJob,
  deleteJob,
  orderId,
}: DetailCardProps) => {
  const [newJobName, setNewJobName] = useState("");
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await AsyncStorage.getItem("role");
      setUserRole(role as UserRole);
    };
    fetchUserRole();
  }, []);

  const handleAddJob = async () => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      console.error("Bạn không có quyền thêm công việc.");
      return;
    }

    if (!newJobName.trim()) return;

    const newJob: JobDetail = { jobName: newJobName.trim(), price: 0 };
    try {
      await addJob(newJob);
      setNewJobName("");
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const handleUpdateJob = async (index: number, updatedJob: Partial<JobDetail>) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      console.error("Bạn không có quyền chỉnh sửa công việc.");
      return;
    }

    try {
      await updateJob(index, updatedJob);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  const handleDeleteJob = async (index: number) => {
    if (userRole !== UserRole.Admin && userRole !== UserRole.Employee) {
      console.error("Bạn không có quyền xóa công việc.");
      return;
    }
  
    const updatedJobs = jobs.filter((_, i) => i !== index);
    setJobs(updatedJobs);
  
    try {
      if (!orderId) {
        console.error("Invalid order ID:", orderId);
        return;
      }
  
      await deleteJob(index); // Không cần kiểm tra giá trị trả về
      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };
  

  return (
    <View style={styles.card}>
      {/* Chỉ hiển thị ô thêm công việc nếu user là Admin hoặc Customer */}
      {(userRole === UserRole.Admin || userRole === UserRole.Employee) && (
        <View style={styles.inputContainer}>
          <TextInput
            label="Tên công việc"
            value={newJobName}
            onChangeText={setNewJobName}
            style={styles.input}
            mode="outlined"
            theme={{ colors: { background: "#fff", text: "#000" } }}
          />
          <Button
            mode="contained"
            onPress={handleAddJob}
            style={styles.addButton}
            labelStyle={styles.addButtonText}
          >
            Thêm
          </Button>
        </View>
      )}
      {jobs.map((job, index) => (
        <View key={index} style={styles.jobRow}>
          <TextInput
            value={job.jobName}
            onChangeText={(text) => handleUpdateJob(index, { jobName: text })}
            style={styles.inputJobName}
            mode="outlined"
            theme={{ colors: { background: "#fff", text: "#000" } }}
            editable={userRole === UserRole.Admin || userRole === UserRole.Employee
            } // Chỉ cho phép chỉnh sửa nếu có quyền
          />
          {/* Nút xóa chỉ hiển thị với Admin và Customer */}
          {(userRole === UserRole.Admin || userRole === UserRole.Employee) && (
            <IconButton
              icon="delete"
              onPress={() => handleDeleteJob(index)}
              style={styles.deleteButton}
              iconColor="#fff"
            />
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10 },
  inputContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  input: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
  },
  addButton: {
    backgroundColor: Colors.mainColor1,
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  jobRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: Colors.mainColor2,
    padding: 5,
    borderRadius: 5,
  },
  inputJobName: {
    flex: 1,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#000",
  },
  deleteButton: { backgroundColor: Colors.mainColor1 },
});

export default DetailCard;
