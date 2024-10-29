import { Card } from "react-native-paper";
import styles from "./DayStyles";
import { View, Text } from 'react-native';
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeEmployeeStackParamList } from "@/src/shared/routes/HomeEmployeeNavigation";
import { useNavigation } from "@react-navigation/native";

interface CardDayCalendarProps{
  time: number;
}

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'HomeEmplyee'>;

const CardDayCalendar = ({time}: CardDayCalendarProps) => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
  const data = [
    {time: '2:30', cv: 'Sửa điện', dc: '122/23A/2 Trường Thọ, Thủ Đức'},
  ]

    return (
    <View style={styles.monthCard}>
        <Text style={styles.time}>{time}:00</Text>
        <View style={styles.boxContent}>
          {data.map((cv)=> 
          <TouchableOpacity style={styles.buttonJob}>
            <Text style={styles.days}
            numberOfLines={1} 
            ellipsizeMode="tail"
            >
              Thời gian: {cv.time} Công việc: {cv.cv} Địa chỉ: {cv.dc}
            </Text>
          </TouchableOpacity>
          )}
        </View>
    </View> 
    );
};

export default CardDayCalendar;