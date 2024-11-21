import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/src/styles/Color';

interface AppointmentTabsProps {
  selectedTab: string;
  setTab: (value: string) => void;
}

const tabs = ['Hoàn thành', 'Đang thực hiện', 'Đã hủy'];

const AppointmentTabs: React.FC<AppointmentTabsProps> = ({ selectedTab, setTab }) => {

  const handleTabPress = (tab: string) => {
    setTab(tab);
  };

  return (
    <View style={styles.tabsContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.tabsContainer}
      >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.activeTab]}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    backgroundColor: Colors.background,
  },
  tab: {
    marginHorizontal: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.mainColor2,
  },
  activeTab: {
    backgroundColor: Colors.mainColor1,
  },
  tabText: {
    color: Colors.mainColor3,
  },
  activeTabText: {
    color: Colors.white,
  },
});

export default AppointmentTabs;
