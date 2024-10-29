import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { IconButton, TextInput } from 'react-native-paper';
import styles from './YearStyles';
import CardMonthCalendar from './CardMonthCalendar';
import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';

const CalendarYear = () => {
  
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState<number>(currentYear);
  return (
    <View style={styles.container}>
        <TextInput
        placeholder="Search"
        left={<TextInput.Icon icon={() => <MaterialCommunityIcons name="magnify" size={24} />} />}
        style={styles.searchBar}
      />
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
