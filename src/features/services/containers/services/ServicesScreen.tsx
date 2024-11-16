import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-toast-message";
import Colors from "@/src/styles/Color";
import Header from "@/src/shared/components/header/Header";
import ServiceList from "@/src/features/services/components/ServiceList";
import restClient from "@/src/shared/services/RestClient";
import * as ImagePicker from "expo-image-picker";
import { Service } from "@/src/interface/interface";

const ServicesScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  // Toggle modal thêm dịch vụ
  const toggleAddModal = () => {
    setAddModalVisible((prev) => !prev);
    resetForm();
  };

  // Toggle modal chỉnh sửa dịch vụ
  const toggleEditModal = (service: Service | null) => {
    setEditingService(service);
    if (service) {
      setNewServiceName(service.name);
      setSelectedImage(service.img || "");
    } else {
      resetForm();
    }
  };

  // Reset form
  const resetForm = () => {
    setNewServiceName("");
    setSelectedImage("");
    setEditingService(null);
  };

  // Fetch danh sách dịch vụ từ backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceClient = restClient.apiClient.service("services");
        const response = await serviceClient.find({});
        if (response.success) {
          const transformedData = response.resData.map((item: any) => ({
            id: item._id,
            name: item.name,
            img: item.img || "",
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : undefined,
          }));
          setServices(transformedData);
        } else {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: response.message || "Không thể tải danh sách dịch vụ.",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Đã xảy ra lỗi không mong muốn khi tải danh sách dịch vụ.",
        });
      }
    };
    fetchServices();
  }, []);

  // Mở thư viện ảnh
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Toast.show({
        type: "info",
        text1: "Không chọn ảnh",
        text2: "Vui lòng chọn ảnh cho dịch vụ.",
      });
    }
  };

  // Thêm dịch vụ mới
  const handleAddService = async () => {
    if (!newServiceName.trim() || !selectedImage.trim()) {
      Toast.show({
        type: "error",
        text1: "Lỗi kiểm tra",
        text2: "Tên và ảnh dịch vụ là bắt buộc.",
      });
      return;
    }

    try {
      const newService = { name: newServiceName, img: selectedImage };
      const serviceClient = restClient.apiClient.service("services");
      const response = await serviceClient.create(newService);

      if (response.success) {
        setServices((prev) => [...prev, response.resData]);
        toggleAddModal();
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Dịch vụ mới đã được thêm thành công.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: response.message || "Không thể thêm dịch vụ.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi không mong muốn khi thêm dịch vụ.",
      });
    }
  };

  // Cập nhật dịch vụ
  const handleEditService = async () => {
    if (!newServiceName.trim() || !selectedImage.trim()) {
      Toast.show({
        type: "error",
        text1: "Lỗi kiểm tra",
        text2: "Tên và ảnh dịch vụ là bắt buộc.",
      });
      return;
    }

    if (!editingService) return;

    try {
      const updatedData = { name: newServiceName, img: selectedImage };
      const serviceClient = restClient.apiClient.service("services");
      const response = await serviceClient.patch(editingService.id, updatedData);

      if (response.success) {
        setServices((prev) =>
          prev.map((item) => (item.id === editingService.id ? { ...item, ...updatedData } : item))
        );
        toggleEditModal(null);
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Dịch vụ đã được cập nhật thành công.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: response.message || "Không thể cập nhật dịch vụ.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi không mong muốn khi cập nhật dịch vụ.",
      });
    }
  };

  // Xóa dịch vụ
  const handleDeleteService = async () => {
    if (!serviceToDelete) return;

    try {
      const serviceClient = restClient.apiClient.service("services");
      const response = await serviceClient.remove(serviceToDelete.id);

      if (response.success) {
        setServices((prev) => prev.filter((item) => item.id !== serviceToDelete.id));
        Toast.show({
          type: "success",
          text1: "Thành công",
          text2: "Dịch vụ đã được xóa thành công.",
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: response.message || "Không thể xóa dịch vụ.",
        });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Lỗi",
        text2: "Đã xảy ra lỗi không mong muốn khi xóa dịch vụ.",
      });
    } finally {
      setDeleteModalVisible(false);
      setServiceToDelete(null);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Quản lý dịch vụ"
        showBackButton={false} // Ẩn nút mũi tên quay lại
      />
      <ServiceList
        services={services}
        onEdit={(service) => toggleEditModal(service)}
        onDelete={(service) => {
          setServiceToDelete(service);
          setDeleteModalVisible(true);
        }}
      />
      <TouchableOpacity style={styles.addButton} onPress={toggleAddModal}>
        <Icon name="add" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Modal thêm dịch vụ */}
      <Modal visible={isAddModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm dịch vụ</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên dịch vụ"
              value={newServiceName}
              onChangeText={setNewServiceName}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              ) : (
                <Icon name="photo-camera" size={40} color={Colors.mainColor1} />
              )}
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={toggleAddModal}
              >
                <Text style={styles.actionButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.confirmButton]}
                onPress={handleAddService}
              >
                <Text style={styles.actionButtonText}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal cập nhật dịch vụ */}
      <Modal visible={!!editingService} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cập nhật dịch vụ</Text>
            <TextInput
              style={styles.input}
              placeholder="Tên dịch vụ"
              value={newServiceName}
              onChangeText={setNewServiceName}
            />
            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              ) : (
                <Icon name="photo-camera" size={40} color={Colors.mainColor1} />
              )}
            </TouchableOpacity>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => toggleEditModal(null)}
              >
                <Text style={styles.actionButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.confirmButton]}
                onPress={handleEditService}
              >
                <Text style={styles.actionButtonText}>Cập nhật</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal visible={isDeleteModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận xóa</Text>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa dịch vụ{" "}
              <Text style={{ fontWeight: "bold" }}>{serviceToDelete?.name}</Text> không?
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.cancelButton]}
                onPress={() => setDeleteModalVisible(false)}
              >
                <Text style={styles.actionButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={handleDeleteService}
              >
                <Text style={styles.actionButtonText}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 80,
    backgroundColor: Colors.mainColor1,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.mainColor1,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: Colors.text,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: Colors.mainColor2,
  },
  confirmButton: {
    backgroundColor: Colors.mainColor1,
  },
  deleteButton: {
    backgroundColor: Colors.red,
  },
  actionButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.mainColor1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  imagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ServicesScreen;
