import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, selectedTab === tab && styles.activeTab]}
          onPress={() => handleTabPress(tab)}
        >
          <Text style={selectedTab === tab ? styles.activeTabText : styles.tabText}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    padding: 10,
    flexDirection: 'row', 
    alignItems: 'center',     
    width: '100%',              
    backgroundColor: Colors.background,
  },
  tab: {
    flex: 1,                   
    alignItems: 'center',      
    justifyContent: 'center',   
    paddingVertical: 12,    
    borderRadius: 20,
    marginHorizontal: 5,   
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
    fontWeight: 'bold',      
  },
});

export default AppointmentTabs;
