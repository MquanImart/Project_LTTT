import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ServiceItem from './ServiceItem';

interface Service {
  id: string;
  name: string;
}

interface ServiceListProps {
  services: Service[];
  onEdit: (service: Service | null) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onEdit }) => {
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
          expanded={expandedService === item.id}
          onExpand={handleExpand}
          onEdit={() => onEdit(item)}
        />
      )}
      keyExtractor={(item) => item.id}
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
