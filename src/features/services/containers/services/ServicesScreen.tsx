import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal, Text, TextInput, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';
import Header from '@/src/shared/components/header/Header';
import ServiceList from '@/src/features/services/components/ServiceList';
import restClient from '@/src/shared/services/RestClient'; // Import API client

interface Service {
  id: string;
  name: string;
  img?: string; // Thêm thuộc tính ảnh nếu cần
}

const ServicesScreen = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [newServiceName, setNewServiceName] = useState('');
  const [editingService, setEditingService] = useState<Service | null>(null);

  useEffect(() => {
    fetchServices();
  }, []);

  // API lấy danh sách dịch vụ
  const fetchServices = async () => {
    try {
      const response = await restClient.apiClient.service('services').find({});
      if (response.success) {
        setServices(response.resData || []);
      } else {
        Alert.alert('Error', response.messages || 'Failed to fetch services.');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error', 'Unable to fetch services.');
    }
  };

  const toggleAddModal = () => {
    setAddModalVisible(!isAddModalVisible);
  };

  const toggleEditModal = (service: Service | null) => {
    setEditingService(service);
    setNewServiceName(service ? service.name : '');
    setEditModalVisible(!isEditModalVisible);
  };

  const handleAddService = async () => {
    const newService = { id: Date.now().toString(), name: newServiceName };
    setServices([...services, newService]);
    setNewServiceName('');
    toggleAddModal();
  };

  const handleEditService = async () => {
    if (editingService) {
      const updatedServices = services.map(service =>
        service.id === editingService.id ? { ...service, name: newServiceName } : service
      );
      setServices(updatedServices);
      setEditingService(null);
      setNewServiceName('');
      toggleEditModal(null);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Services" onBackPress={() => console.log('Back Pressed')} />
      <ServiceList services={services} onEdit={toggleEditModal} />
      <TouchableOpacity style={styles.addButton} onPress={toggleAddModal}>
        <Icon name="add" size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Modal thêm dịch vụ */}
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleAddModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>NEW SERVICE</Text>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={newServiceName}
              onChangeText={setNewServiceName}
            />
            <Button title="OK" onPress={handleAddService} color={Colors.mainColor1} />
          </View>
        </View>
      </Modal>

      {/* Modal chỉnh sửa dịch vụ */}
      <Modal
        visible={isEditModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => toggleEditModal(null)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>EDIT SERVICE</Text>
            <TextInput
              style={styles.input}
              placeholder="Service Name"
              value={newServiceName}
              onChangeText={setNewServiceName}
            />
            <Button title="OK" onPress={handleEditService} color={Colors.mainColor1} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: Colors.mainColor1,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.mainColor1,
  },
  input: {
    width: '100%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default ServicesScreen;
