import Colors from "@/src/styles/Color";
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { JobDetail, UserRole } from "@/src/interface/interface";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface DetailCardProps {
  jobs: JobDetail[];
  setJobs: (value: JobDetail[]) => void;
  updateJob: (index: number, updatedField: Partial<JobDetail>) => Promise<void>;
  addJob: (newJob: JobDetail) => Promise<void>;
  deleteJob: (index: number) => Promise<void>;
  orderId: string;
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

      await deleteJob(index);
      console.log("Job deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <View style={styles.card}>
      {(userRole === UserRole.Admin || userRole === UserRole.Employee) && (
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Tên công việc"
            value={newJobName}
            onChangeText={setNewJobName}
            style={styles.input}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddJob}>
            <Text style={styles.addButtonText}>Thêm</Text>
          </TouchableOpacity>
        </View>
      )}
      {jobs.map((job, index) => (
        <View key={index} style={styles.jobRow}>
          <TextInput
            value={job.jobName}
            onChangeText={(text) => handleUpdateJob(index, { jobName: text })}
            style={styles.inputJobName}
            editable={userRole === UserRole.Admin || userRole === UserRole.Employee}
          />
          {(userRole === UserRole.Admin || userRole === UserRole.Employee) && (
            <TouchableOpacity onPress={() => handleDeleteJob(index)} style={styles.deleteButton}>
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Xóa</Text>
            </TouchableOpacity>
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
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  inputJobName: {
    flex: 1,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  addButton: {
    backgroundColor: Colors.mainColor1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  jobRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    backgroundColor: Colors.mainColor2,
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: Colors.mainColor1,
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});

export default DetailCard;
