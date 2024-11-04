import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import styles from './DayStyles';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { HomeEmployeeStackParamList } from '@/src/shared/routes/HomeEmployeeNavigation';
import { StackNavigationProp } from '@react-navigation/stack';
import CardDayCalendar from './CardDayCalendar';
import Header from '@/src/shared/components/header/Header';

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'CalendarMonth'>;

const dayOfWeek = [
  { dayOfWeek: 'Su', day: 27 },
  { dayOfWeek: 'Mo', day: 28 },
  { dayOfWeek: 'Tu', day: 29 },
  { dayOfWeek: 'We', day: 30 },
  { dayOfWeek: 'Th', day: 31 },
  { dayOfWeek: 'Fr', day: 1 },
  { dayOfWeek: 'Sa', day: 2 }
];

const CalendarDay = () => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
  const route = useRoute();
  const { currDay, currMonth, currYear } = route.params as { currDay: number, currMonth: number, currYear: number};
  const currDate = new Date();

  return (
    <View style={styles.container}>
      <Header title={'Lịch làm việc'} onBackPress={()=> {navigation.goBack()}}/>
        <TextInput
        placeholder="Search"
        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="magnify" size={24} />} />}
        style={styles.searchBar}
      />
      <View style={styles.yearContainer}>
        <IconButton icon="chevron-left" size={24} onPress={() => {navigation.goBack()}} />
        <Text style={styles.yearText}>Tháng {currMonth + 1}</Text>
      </View>
      <View style={styles.monthContainer}>
        {dayOfWeek.map((day)=> 
          <View>
            <Text style={currDate.getDate() === day.day? styles.currDays: {}}>{day.dayOfWeek}</Text>
            <Text style={currDate.getDate() === day.day? styles.currDays: {}}>{day.day}</Text>
          </View>
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
