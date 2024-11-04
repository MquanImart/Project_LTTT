import React, { useState } from 'react';
import Header from '@/src/shared/components/header/Header';
import { Provider } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import useHomeAdmin from './useHomeAdmin';
import styles from './stylesAdmin';
import RNPickerSelect from 'react-native-picker-select';
import { ScrollView } from 'react-native-gesture-handler';
import { BarChart, PieChart } from 'react-native-gifted-charts';

const HomeAdmin = () => {
  const {setSortByMonth, setSortByYear,
    setSortByMonthSer, setSortByYearSer,
    optionMonth, optionYear, dataOrder, dataService} = useHomeAdmin();
  return (
    <Provider>
      <Header title={'Thống kê'} onBackPress={()=> {}}/>
      <ScrollView>
        <View style={styles.boxChart}>
          <Text style={styles.textTitle}>Số đơn hàng</Text>
          <View style={styles.boxTitle}>
            <RNPickerSelect
              onValueChange={(value) => setSortByMonth(value)}
              items={optionMonth}
              style={pickerSelectStyles}
              placeholder={{ label: 'Chọn tháng', value: null }}
            />
            <RNPickerSelect
              onValueChange={(value) => setSortByYear(value)}
              items={optionYear}
              style={pickerSelectStyles}
              placeholder={{ label: 'Chọn năm', value: null }}
            />
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
            <RNPickerSelect
              onValueChange={(value) => setSortByMonthSer(value)}
              items={optionMonth}
              style={pickerSelectStyles}
              placeholder={{ label: 'Chọn tháng', value: null }}
            />
            <RNPickerSelect
              onValueChange={(value) => setSortByYearSer(value)}
              items={optionYear}
              style={pickerSelectStyles}
              placeholder={{ label: 'Chọn năm', value: null }}
            />
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
