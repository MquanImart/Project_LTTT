import { Card } from "react-native-paper";
import styles from "./DayStyles";
import { View, Text } from 'react-native';
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeEmployeeStackParamList } from "@/src/shared/routes/HomeEmployeeNavigation";
import { useNavigation } from "@react-navigation/native";
import { JobDay } from "./useCalendarDay";

interface CardDayCalendarProps{
  time: number;
  listJob: JobDay[];
}

type HomeEmployeeNavigationProp = StackNavigationProp<HomeEmployeeStackParamList, 'HomeEmplyee'>;

const CardDayCalendar = ({time, listJob}: CardDayCalendarProps) => {
  const navigation = useNavigation<HomeEmployeeNavigationProp>();
    return (
    <View style={styles.monthCard}>
        <Text style={styles.time}>{time}:00</Text>
        <View style={styles.boxContent}>
          {listJob.map((it)=> 
          <TouchableOpacity
            key={it.service.name} // Dùng tên dịch vụ làm key
            style={styles.buttonJob}
            onPress={() =>
              navigation.navigate("DetailService", {
                service: it.service, // Truyền đối tượng dịch vụ
                order: it.order,     // Truyền đối tượng đơn hàng
              })
            }
          >
            <Text style={styles.days} numberOfLines={1} ellipsizeMode="tail">
              Thời gian: {it.hour}:{String(it.minute).padStart(2, "0")} 
              Công việc: {it.service.name} 
              Địa chỉ: {it.address}
            </Text>
          </TouchableOpacity>
          )}
        </View>
    </View> 
    );
};

export default CardDayCalendar;