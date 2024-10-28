import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface AppointmentTabsProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

const tabs = ['Complete', 'Upcoming', 'Progress', 'Cancelled'];

const AppointmentTabs: React.FC<AppointmentTabsProps> = ({ selectedTab, onTabPress }) => {
  return (
    <View style={styles.tabsContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.activeTab]}
          onPress={() => onTabPress(tab)}
        >
          <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
  },
  activeTab: {
    backgroundColor: '#C8E6C9',
  },
  tabText: {
    color: '#4CAF50',
  },
  activeTabText: {
    color: '#fff',
  },
});

export default AppointmentTabs;
