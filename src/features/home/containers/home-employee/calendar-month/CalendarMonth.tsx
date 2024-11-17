import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import styles from './MonthStyles';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeEmployeeStackParamList } from '@/src/shared/routes/HomeEmployeeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import CardMonthCalendar from './CardMonthCalendar';
import Header from '@/src/shared/components/header/Header';

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'CalendarMonth'>;

const CalendarMonth = () => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
    const route = useRoute();
    const { startMonth, currYear } = route.params as { startMonth: number, currYear: number };
    const [month, setMonth] = useState<number>(startMonth);
  return (
    <View style={styles.container}>
      <Header title={'Lịch làm việc'} onBackPress={()=> {navigation.navigate("CalendarYear", {startMonth: startMonth})}}/>
      <View style={styles.yearContainer}>
        <IconButton icon="chevron-left" size={24} onPress={()=> {navigation.navigate("CalendarYear", {startMonth: startMonth})}} />
        <Text style={styles.yearText}>{currYear}</Text>
      </View>
      <View style={styles.monthContainer}>
        <IconButton icon="chevron-left" size={24} onPress={() => {setMonth(month - 1)}} />
        <Text style={styles.yearText}>Tháng {month}</Text>
        <IconButton icon="chevron-right" size={24} onPress={() => {setMonth(month + 1)}} />
      </View>
      <CardMonthCalendar month={month} year={currYear}/>
    </View>
  );
};



export default CalendarMonth;
