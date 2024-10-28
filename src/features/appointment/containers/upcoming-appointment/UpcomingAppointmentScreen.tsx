import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentUpcomingCard from '@/src/features/appointment/components/AppointmentUpcomingCard';
import Footer from '@/src/shared/components/Footer';
import Colors from '@/src/styles/Color'; // Đảm bảo đường dẫn chính xác

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

const UpcomingAppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Upcoming');

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <View style={styles.container}>
      <Header title="All appointment" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={selectedTab} onTabPress={handleTabPress} />
      <FlatList
        data={appointments}
        renderItem={({ item }) => (
          <AppointmentUpcomingCard
            appointment={item}
            onDetailsPress={() => console.log('Details pressed')}
            onAcceptPress={() => console.log('Accept pressed')}
            onRejectPress={() => console.log('Reject pressed')}
            onFavoritePress={() => console.log('Favorite pressed')}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Sử dụng màu nền từ Colors
  },
  listContainer: {
    paddingBottom: 70, // Để tạo khoảng trống cho Footer
  },
});

export default UpcomingAppointmentScreen;
