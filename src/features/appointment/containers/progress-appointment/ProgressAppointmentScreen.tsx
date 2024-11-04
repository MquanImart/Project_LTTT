import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentProgressCard from '@/src/features/appointment/components/AppointmentProgressCard';
import Colors from '@/src/styles/Color';

const appointments = [
  {
    id: '1',
    name: 'Dr. Olivia Turner, M.D.',
    service: 'Clean House',
    rating: 4,
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    date: 'Sunday, 12 June',
    time: '9:30 AM - 10:00 AM',
  },
  {
    id: '2',
    name: 'Dr. Olivia Turner, M.D.',
    service: 'Clean House',
    rating: 4,
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    date: 'Sunday, 12 June',
    time: '9:30 AM - 10:00 AM',
  },
  // Thêm các cuộc hẹn khác nếu cần
];

const ProgressAppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Progress');

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
    // Điều hướng đến màn hình tương ứng nếu cần
  };

  return (
    <View style={styles.container}>
      <Header title="All appointment" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={selectedTab} onTabPress={handleTabPress} />
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <AppointmentProgressCard
            appointment={item}
            onCancelPress={() => console.log('Cancel pressed')}
            onFavoritePress={() => console.log('Favorite pressed')}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingBottom: 70, 
  },
});

export default ProgressAppointmentScreen;
