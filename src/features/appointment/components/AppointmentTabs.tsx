import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Colors from '@/src/styles/Color';
import { RootStackParamList } from '@/src/shared/routes/AppointmentNavigation';

interface AppointmentTabsProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
}

const tabs = ['Complete', 'Upcoming', 'Progress', 'Cancel'];

const AppointmentTabs: React.FC<AppointmentTabsProps> = ({ selectedTab, onTabPress }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleTabPress = (tab: string) => {
    onTabPress(tab);

    // Điều hướng theo từng tab
    switch (tab) {
      case 'Complete':
        navigation.navigate('Complete');
        break;
      case 'Upcoming':
        navigation.navigate('Upcoming');
        break;
      case 'Progress':
        navigation.navigate('Progress');
        break;
      case 'Cancel':
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
    backgroundColor: Colors.tabIconDefault,
  },
  activeTab: {
    backgroundColor: Colors.mainColor1,
  },
  tabText: {
    color: Colors.mainColor1,
  },
  activeTabText: {
    color: Colors.white,
  },
});

export default AppointmentTabs;
