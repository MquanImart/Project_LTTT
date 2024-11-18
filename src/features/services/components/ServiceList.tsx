import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import ServiceItem from "./ServiceItem";
import { Service } from "@/src/interface/interface";

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service | null) => void;
  onDelete: (service: Service) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({
  services,
  onEdit,
  onDelete,
}) => {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  const handleExpand = (id: string) => {
    setExpandedService(expandedService === id ? null : id);
  };

  return (
    <FlatList
      data={services}
      renderItem={({ item }) => (
        <ServiceItem
          service={item}
          expanded={expandedService === item._id}
          onExpand={handleExpand}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item)}
        />
      )}
      keyExtractor={(item, index) => item._id ? String(item._id) : String(index)}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 80,
  },
});

export default ServiceList;
