import { Card } from "react-native-paper";
import styles from "./MonthStyles";
import { View, Text } from 'react-native';
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeEmployeeStackParamList } from "@/src/shared/routes/HomeEmployeeNavigation";
import { useNavigation } from "@react-navigation/native";
import useCalendarMonth from "./useCalendarMonth";

interface CardMonthCalendarProps{
  month: number; 
  year: number;
}

const dayOfWeek = ['Su', 'Mo', 'Tu',  'We',  'Th',  'Fr',  'Sa'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'HomeEmplyee'>;

const CardMonthCalendar = ({month, year}: CardMonthCalendarProps) => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();

  const {dataMonth} = useCalendarMonth({month: month, year: year});

    return (
    <Card style={styles.monthCard} key={month}>
        <Text style={styles.monthTitle}>{months[month]}</Text>
        <View style={styles.monthDayofWeek}>
        { dayOfWeek.map((day, index)=> 
          <View key={index} style={{width: '14.28%'}}>
            <Text style={styles.dayOfWeek}>{day}</Text>
          </View>
        )}
        </View>
        <View style={styles.datesContainer}>
          {dataMonth.map((_month, index)=>
            <View key={index} style={[{width: '14.28%'}]}>
              <TouchableOpacity 
              activeOpacity={0.7}
              onPress={()=> navigation.navigate("CalendarDay", { currDay: _month.day, currMonth: month, currYear: year })}
              >
                <Text style={_month.month === month + 1? styles.daysInMonth: styles.days}>{_month.day}</Text>
                <Text style={[_month.month === month + 1? styles.daysInMonth: styles.days, styles.boxContent]}>
                  {_month.numJob > 0? `${_month.numJob} công việc`: ""} 
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
    </Card> 
    );
};

export default CardMonthCalendar;