import React, { useRef } from 'react';
import Header from '@/src/shared/components/header/Header';
import { ActivityIndicator, MD2Colors, Provider } from 'react-native-paper';
import useHomeAdmin from './useHomeAdmin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import restClient from '@/src/shared/services/RestClient';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/shared/routes/LoginNavigation';
import { useNavigation } from '@react-navigation/native';
import {  FlatList, Animated } from 'react-native';
import Chart from './Chart';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Profile">;

const HomeAdmin = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { setSortByMonth, setSortByYear,
    setSortByMonthSer, setSortByYearSer, allSchedule,
    optionMonth, optionYear, dataOrder, dataService } = useHomeAdmin();

  const scrollX = useRef(new Animated.Value(0)).current;  
  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
    );

  if (allSchedule === null || dataOrder === null || dataService === null) 

    return <ActivityIndicator animating={true} color={MD2Colors.red800} />

  return (
  <Provider>
    <Header title={'Thống kê'} showLogout={true} showBackButton={false} />
    <FlatList
      data={[{ id: '1' }, { id: '2' }]} // Mỗi mục đại diện cho một phần nội dung của bạn
      keyExtractor={(item) => item.id}
      horizontal
      pagingEnabled
      snapToAlignment='center'
      showsHorizontalScrollIndicator={false}
      onScroll={handleOnScroll}
      renderItem={({ item }) => 
      <Chart type={item.id === '1'? 'Bar': 'Pie'} 
        data={item.id === '1'? dataOrder: dataService} 
        optionMonth={optionMonth} setOptionMonth={item.id === '1'? setSortByMonth: setSortByMonthSer} 
        optionYear={optionYear} setOptionYear={item.id === '1'? setSortByYear: setSortByYearSer}/>}
    />
  </Provider>
  );
};


export default HomeAdmin;
