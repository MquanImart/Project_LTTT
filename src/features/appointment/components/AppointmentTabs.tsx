import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Colors from '@/src/styles/Color';
import { AppointmentStackParamList } from '@/src/shared/routes/AppointmentNavigation';

interface AppointmentTabsProps {
  selectedTab: string;
}

const tabs = ['Hoàn thành', 'Chờ duyệt', 'Đang thực hiện', 'Đã hủy'];

const AppointmentTabs: React.FC<AppointmentTabsProps> = ({ selectedTab }) => {
  const navigation = useNavigation<NavigationProp<AppointmentStackParamList>>();

  const handleTabPress = (tab: string) => {
    // Điều hướng theo từng tab
    switch (tab) {
      case 'Hoàn thành':
        navigation.navigate('Complete');
        break;
      case 'Chờ duyệt':
        navigation.navigate('Upcoming');
        break;
      case 'Đang thực hiện':
        navigation.navigate('Progress');
        break;
      case 'Đã hủy':
        navigation.navigate('Cancel');
        break;
    }
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 5,
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
