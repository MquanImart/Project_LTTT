import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Colors from "@/src/styles/Color";
import { Service } from "@/src/interface/interface";

interface ServiceItemProps {
  service: Service;
  expanded: boolean;
  onExpand: (id: string) => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  service,
  expanded,
  onExpand,
  onEdit,
  onDelete,
}) => {
  const serviceName = service.name || "Unnamed Service"; // Đặt giá trị mặc định
  const serviceId = service._id ? String(service._id) : "unknown"; // Chuyển id thành chuỗi

  return (
    <View>
      <View style={styles.serviceItem}>
        <Image
            source={{ uri: `data:image/png;base64,${service.img}` }}
            style={styles.serviceImage} 
          />
        <View style={styles.serviceContent}>
          <Text style={styles.serviceText}>{serviceName}</Text>
          <TouchableOpacity onPress={() => onExpand(serviceId)}>
            <Icon name="keyboard-arrow-down" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {expanded && (
        <View style={styles.expandedContentWrapper}>
          <View style={styles.expandedContent}>
            <TouchableOpacity
              style={[styles.optionButton, styles.firstOption]}
              onPress={onEdit}
            >
              <Text style={styles.optionText}>Edit</Text>
              <Icon name="edit" size={20} color={Colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={onDelete}>
              <Text style={styles.optionText}>Delete</Text>
              <Icon name="delete" size={20} color={Colors.icon} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  serviceItem: {
    backgroundColor: Colors.mainColor1,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  serviceImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // Hình tròn
    marginRight: 10,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  serviceContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  serviceText: {
    flex: 1,
    fontSize: 16,
    color: Colors.white,
  },
  expandedContentWrapper: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: Colors.icon,
    marginTop: -5,
    paddingVertical: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  expandedContent: {
    paddingVertical: 10,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  firstOption: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.icon,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: Colors.icon,
    marginRight: 10,
  },
});

export default ServiceItem;
