import React, { useState } from 'react';
import Header from '@/src/shared/components/header/Header';
import { ActivityIndicator, MD2Colors, Provider } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import useHomeAdmin from './useHomeAdmin';
import styles from './stylesAdmin';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import Dropdown from '@/src/shared/components/dropdown/Dropdown';

const HomeAdmin = () => {
  const {setSortByMonth, setSortByYear,
    setSortByMonthSer, setSortByYearSer, allSchedule,
    optionMonth, optionYear, dataOrder, dataService} = useHomeAdmin();
  
  if (allSchedule === null || dataOrder === null || dataService === null) 
    return <ActivityIndicator animating={true} color={MD2Colors.red800} />
    
  return (
    <Provider>
      <Header title={'Thống kê'} onBackPress={()=> {}}/>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.boxChart}>
          <Text style={styles.textTitle}>Số đơn hàng</Text>
          <View style={styles.boxTitle}>
            <Dropdown data={optionMonth} setValue={setSortByMonth}/>
            <Dropdown data={optionYear} setValue={setSortByYear}/>
          </View>
          <BarChart
            data={dataOrder}
            width={280} // chiều rộng của biểu đồ
            height={220} // chiều cao của biểu đồ
            barWidth={18} // độ rộng của cột
            minHeight={3}
            barBorderRadius={10}
            spacing={50}
            noOfSections={4}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisColor="gray" // màu sắc của trục X
            yAxisColor="gray" // màu sắc của trục Y
            isAnimated // hiệu ứng hoạt hình
            animationDuration={1000} // thời gian hoạt hình
          />
        </View>  
        <View style={styles.boxChart}>
          <Text style={styles.textTitle}>Thống kê dịch vụ</Text>
          <View style={styles.boxTitle}>
          <Dropdown data={optionMonth} setValue={setSortByMonthSer}/>
          <Dropdown data={optionYear} setValue={setSortByYearSer}/>
          </View>
          <View style={styles.boxPie}>
            <PieChart
              data={dataService}
              radius={150} // Bán kính của biểu đồ
              strokeWidth={0} // Độ dày đường viền
              donut // Nếu bạn muốn biểu đồ thành hình donut
              // Các tùy chọn khác
              innerRadius={40} // Bán kính bên trong nếu là donut
              textColor="#000" // Màu sắc cho chữ
            />
            <View style={styles.legendContainer}>
              {dataService.map((item, index) => (
                <View style={styles.legendItem} key={index}>
                  <View style={[styles.colorBox, { backgroundColor: item.frontColor }]} />
                  <Text style={styles.legendText}>
                    {item.label}: {item.value} {/* Hiển thị giá trị */}
                  </Text>
                </View>
              ))}
            </View>
            </View>
        </View>  
      </ScrollView>
    </Provider>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    minWidth: 120,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    minWidth: 120,
  },
});

export default HomeAdmin;
