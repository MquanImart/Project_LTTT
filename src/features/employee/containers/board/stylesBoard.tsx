import Colors from '@/src/styles/Color';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 20,
    },
    textTitle: {
        fontSize: 25,
        fontWeight: '400'
    },
    buttonTitle: {
        backgroundColor: Colors.mainColor1
    },
    boxSearch: {
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5', // Màu nền của danh sách
      },
      item: {
        backgroundColor: '#fff', // Màu nền của mỗi mục
        borderRadius: 8, // Bo tròn các góc
        marginVertical: 5, // Khoảng cách giữa các mục
        elevation: 2, // Đổ bóng cho mỗi mục
      },
      title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: Colors.grey
      },
      description: {
        color: '#555', // Màu chữ cho mô tả
      },
      pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
      },
      pageNumber: {
        fontSize: 16,
      },
      button: {
        flex: 1, // Để nút chiếm khoảng không
        marginHorizontal: 5, // Khoảng cách giữa các nút
        backgroundColor: Colors.mainColor1,
      },
  });

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 16,
      paddingHorizontal: 10,
      backgroundColor: Colors.mainColor2,
      borderRadius: 20,
      color: 'black',
      paddingRight: 30,
      width: 100,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: Colors.mainColor2,
      borderRadius: 20,
      color: 'black',
      paddingRight: 30,
      width: 100,
    },
  });

export default styles;