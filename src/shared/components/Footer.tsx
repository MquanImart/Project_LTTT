// src/components/Footer.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/src/styles/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/shared/routes/MainNavigator';

const Footer: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('FavoriteEmployee')}>
        <Icon name="favorite" size={24} color={Colors.mainColor1} />
        <Text style={styles.footerText}>Favourite</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('ChatScreen')}>
        <Icon name="chat" size={24} color={Colors.icon} />
        <Text style={styles.footerText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Appointment')}>
        <Icon name="calendar-today" size={24} color={Colors.icon} />
        <Text style={styles.footerText}>Appointment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderTopWidth: 1,
    borderColor: Colors.icon,
    backgroundColor: Colors.white,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: Colors.icon,
  },
});

export default Footer;
