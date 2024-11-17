import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import styles from './DayStyles';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeEmployeeStackParamList } from '@/src/shared/routes/HomeEmployeeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import CardDayCalendar from './CardDayCalendar';
import Header from '@/src/shared/components/header/Header';
import useCalendarDay from './useCalendarDay';

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'CalendarMonth'>;

type DayOfWeekProps = {
  dayOfWeek: string;
  day: number;
}

const CalendarDay = () => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
  const route = useRoute();
  const { currDay, currMonth, currYear } = route.params as { currDay: number, currMonth: number, currYear: number};
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeekProps[]>([]);
  const currDate = new Date();
  const {} = useCalendarDay();

  useEffect(() => {
    createDayofWeek();
  }, []);
  const createDayofWeek = () => {
    const currentDate = new Date(currYear, currMonth - 1, currDay);
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
  
    const newDayOfWeek = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      return {
        dayOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'][i],
        day: date.getDate(),
      };
    });
    setDayOfWeek(newDayOfWeek)
  }

  const handleChangeDay = (day: number) => {
    navigation.navigate("CalendarDay", { currDay: day, currMonth: currMonth, currYear: currYear })
  }
  if (dayOfWeek.length <= 0) return <ActivityIndicator size="large" color="#0000ff" />
  return (
    <View style={styles.container}>
      <Header title={'Lịch làm việc'} onBackPress={()=> {navigation.goBack()}}/>
      <View style={styles.yearContainer}>
        <IconButton icon="chevron-left" size={24} onPress={() => {navigation.goBack()}} />
        <Text style={styles.yearText}>Tháng {currMonth}</Text>
      </View>
      <View style={styles.monthContainer}>
        {dayOfWeek.map((day)=> 
          <TouchableOpacity style={currDate.getDate() === day.day? styles.currDays: styles.cellDays}
          onPress={() => handleChangeDay(day.day)}>
            <Text >{day.dayOfWeek}</Text>
            <Text >{day.day}</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.calendarContainer}>
        {Array.from({ length: 24 }, (_, time) => (
            <CardDayCalendar key={time} time={time}/>
          ))}
      </ScrollView>
    </View>
  );
};



export default CalendarDay;
