import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/Header'; // Đảm bảo bạn đã import đúng
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentCard from '@/src/features/appointment/components/AppointmentCard';
import Footer from '@/src/shared/components/Footer';

const appointments = [
  { id: '1', name: 'Olivia Turner, M.D.', service: 'Clean House', rating: 3, avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg' },
  { id: '2', name: 'Olivia Turner, M.D.', service: 'Clean House', rating: 4, avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg' },
];

const AppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Complete');

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
          <AppointmentCard
            appointment={item}
            onChatPress={() => console.log('Chat pressed')}
            onRebookPress={() => console.log('Re-Book pressed')}
            onReviewPress={() => console.log('Add Review pressed')}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AppointmentScreen;
