  import Colors from "@/src/styles/Color";
  import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
  import { useState, useEffect } from "react";
  import { JobDetail, UserRole } from "@/src/interface/interface";
  import AsyncStorage from "@react-native-async-storage/async-storage";

  interface BillCardProps {
    jobs: JobDetail[];
    setJobs: (value: JobDetail[]) => void;
    updateJob: (index: number, updatedField: Partial<JobDetail>) => Promise<void>;
    disableDelete?: boolean; // Thêm prop để kiểm soát việc xóa
    disableActions?: boolean;
  }

  const BillCard = ({
    jobs, 
    setJobs, 
    updateJob, 
    disableDelete = false,
    disableActions = false,
    }: BillCardProps) => {
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
      if (userRole !== UserRole.Employee) {
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
      if (userRole !== UserRole.Employee) {
        console.error("Bạn không có quyền xóa công việc.");
        return;
      }

      const updatedJobs = jobs.filter((_, i) => i !== index);
      setJobs(updatedJobs);
    };

    return (
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.card}>
          {jobs.map((job, index) => (
            <View style={styles.boxJob} key={index}>
              <Text style={styles.textJob}>{job.jobName}</Text>
              <TextInput
                value={job.price.toString()}
                editable={!disableActions && (userRole === UserRole.Employee)}
                onChangeText={(text) => handlePriceChange(text, index)}
                style={styles.inputPrice}
                keyboardType="numeric"
                placeholder="Nhập giá"
              />
              <Text style={styles.textCurrency}>đ</Text>
              {!disableDelete &&
                (userRole === UserRole.Employee) && (
                  <TouchableOpacity
                    onPress={() => handleDeleteJob(index)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteButtonText}>Xóa</Text>
                  </TouchableOpacity>
                )}
              {errors[index] && <Text style={styles.errorText}>{errors[index]}</Text>}
            </View>
          ))}
        </View>
      </KeyboardAvoidingView>
    );
  };

  const styles = StyleSheet.create({
    card: {
      width: "100%",
      padding: 10,
      backgroundColor: "#f7f7f7",
      borderRadius: 10,
    },
    boxJob: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#fff",
      padding: 15,
      marginBottom: 10,
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    textJob: {
      flex: 1,
      fontSize: 16,
      fontWeight: "500",
      color: "#333",
    },
    inputPrice: {
      width: 100,
      height: 40,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      textAlign: "center",
      fontSize: 16,
      color: "#333",
      backgroundColor: "#f9f9f9",
    },
    textCurrency: {
      fontSize: 16,
      color: "#333",
      marginLeft: 8,
      fontWeight: "500",
    },
    deleteButton: {
      marginLeft: 10,
      backgroundColor: Colors.mainColor1,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    deleteButtonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 14,
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginTop: 5,
      textAlign: "center",
    },
  });

  export default BillCard;
