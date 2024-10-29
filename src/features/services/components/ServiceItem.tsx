import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Colors from '@/src/styles/Color';

interface Service {
  id: string;
  name: string;
}

interface ServiceItemProps {
  service: Service;
  expanded: boolean;
  onExpand: (id: string) => void;
  onEdit: () => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, expanded, onExpand, onEdit }) => {
  return (
    <View>
      <View style={styles.serviceItem}>
        <View style={styles.serviceContent}>
          <Icon name="favorite" size={24} color={Colors.white} style={styles.favoriteIcon} />
          <Text style={styles.serviceText}>{service.name}</Text>
          <TouchableOpacity onPress={() => onExpand(service.id)}>
            <Icon name="keyboard-arrow-down" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </View>
      {expanded && (
        <View style={styles.expandedContentWrapper}>
          <View style={styles.expandedContent}>
            <TouchableOpacity style={[styles.optionButton, styles.firstOption]} onPress={onEdit}>
              <Text style={styles.optionText}>Edit</Text>
              <Icon name="edit" size={20} color={Colors.icon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton}>
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
  },
  serviceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  favoriteIcon: {
    marginRight: 10,
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
    flexDirection: 'row',
    alignItems: 'center',
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
