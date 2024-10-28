import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentCancelCard from '@/src/features/appointment/components/AppointmentCancelCard';
import Footer from '@/src/shared/components/Footer';
import Colors from '@/src/styles/Color';

const appointments = [
  {
    id: '1',
    name: 'Olivia Turner, M.D.',
    service: 'Clean House',
    rating: 4,
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    date: 'Sunday, 12 June',
    time: '9:30 AM - 10:00 AM',
    cancellationReason: 'Staff arrived later than scheduled',
  },
  {
    id: '2',
    name: 'Olivia Turner, M.D.',
    service: 'Clean House',
    rating: 4,
    avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg',
    date: 'Sunday, 12 June',
    time: '9:30 AM - 10:00 AM',
    cancellationReason: 'Staff arrived later than scheduled',
  },
];

const CancelAppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Cancelled');

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
          <AppointmentCancelCard
            appointment={item}
            onRebookPress={() => console.log('Re-book pressed')}
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
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingBottom: 70,
  },
});

export default CancelAppointmentScreen;
