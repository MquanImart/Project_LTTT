import { Card } from "react-native-paper";
import styles from "./MonthStyles";
import { View, Text } from 'react-native';
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeEmployeeStackParamList } from "@/src/shared/routes/HomeEmployeeNavigation";
import { useNavigation } from "@react-navigation/native";

interface CardMonthCalendarProps{
  month: number; 
  year: number;
}

interface DayData {
  day: number;
  month: number;
}

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'HomeEmplyee'>;

const CardMonthCalendar = ({month, year}: CardMonthCalendarProps) => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
  const dayOfWeek = ['Su', 'Mo', 'Tu',  'We',  'Th',  'Fr',  'Sa'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const [dataMonth, setDataMonth] = useState<DayData[]>([]);

  useEffect(()=> {
    const newData = createMonthData(month, year);
    
    setDataMonth(newData);
  },[month]);

  const createMonthData = (month: number, year: number) => {
    const data: DayData[] = [];

    const firstDay = new Date(year, month, 1);
    const firstDayOfMonth = firstDay.getDay();
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDayOfMonth);

    const lastDayOfMonth = new Date(year, month + 1, 0);
    const lastDayOfWeek = lastDayOfMonth.getDay();
    const endDate = new Date(lastDayOfMonth);
    endDate.setDate(endDate.getDate() + (6 - lastDayOfWeek));

    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      data.push({
        day: currentDate.getDate(),
        month: currentDate.getMonth() + 1, // Chuyển tháng về từ 1 - 12
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return data;
  };

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
                  3 công việc
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
    </Card> 
    );
};

export default CardMonthCalendar;