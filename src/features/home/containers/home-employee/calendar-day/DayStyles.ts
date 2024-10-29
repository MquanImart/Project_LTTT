import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    searchBar: {
      margin: 8,
      backgroundColor: '#fff',
    },
    yearContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginVertical: 5,
    },
    yearText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    calendarContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      marginVertical: 10,
    },
    monthContainer: {
      width: '90%',
      alignSelf: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 5,
    },
    monthCard: {
      width: '95%',
      alignSelf: 'center',
      position: 'relative',
    },
    time: {
      position: 'absolute',
      top: -8,
      left: 10
    },
    boxContent: {
      width: '85%',
      alignSelf: 'flex-end',
      padding: 10,
      marginLeft: 12,
      borderTopWidth: 1,         // Độ dày của viền trên
      borderColor: '#e9e9e9',       // Màu sắc của viền
      borderStyle: 'solid',      // Kiểu viền (có thể là 'solid', 'dotted', 'dashed')
    },
    days: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 4,
    },
    buttonJob: {
      minHeight: 50,
    },
    currDays: {
      color: 'green'
    },
  });

export default styles;