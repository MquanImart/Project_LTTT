import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentCard from '@/src/features/appointment/components/AppointmentCompleteCard';
import Footer from '@/src/shared/components/Footer';
import Colors from '@/src/styles/Color';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/shared/routes/MainNavigator';

const appointments = [
  { id: '1', name: 'Olivia Turner, M.D.', service: 'Clean House', rating: 3, avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg' },
  { id: '2', name: 'Olivia Turner, M.D.', service: 'Clean House', rating: 4, avatar: 'https://www.prudentialuniforms.com/wp-content/uploads/2016/09/Automotive-Repair-Shops.jpg' },
];

const CompleteAppointmentScreen = () => {
  const [selectedTab, setSelectedTab] = useState<string>('Complete');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
            onReviewPress={() => navigation.navigate('Review', { appointment: item })}
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
    backgroundColor: Colors.background,
  },
});

export default CompleteAppointmentScreen;
