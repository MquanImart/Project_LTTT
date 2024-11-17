import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import styles from './YearStyles';
import CardMonthCalendar from './CardMonthCalendar';
import Header from '@/src/shared/components/header/Header';
import { HomeEmployeeStackParamList } from '@/src/shared/routes/HomeEmployeeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'CalendarMonth'>;


const CalendarYear = () => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  return (
    <View style={styles.container}>
      <Header title={'Lịch làm việc'} onBackPress={()=> {}}/>
      <View style={styles.yearContainer}>
        <IconButton icon="chevron-left" size={24} onPress={() => {setYear(year - 1)}} />
        <Text style={styles.yearText}>{year}</Text>
        <IconButton icon="chevron-right" size={24} onPress={() => {setYear(year + 1)}} />
      </View>
      <ScrollView contentContainerStyle={styles.calendarContainer}>
        {Array.from({ length: 12 }, (_, month) => (
            <CardMonthCalendar key={month} month={month} year={year}/>
          ))}
      </ScrollView>
    </View>
  );
};



export default CalendarYear;
