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
      justifyContent: 'space-around',
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
    },
    containerCard: {
      width: '100%', 
    },
    monthCard: {
      width: '45%',
      minHeight: 170,
      marginVertical: 8,
      padding: 8,
    },
    monthDayofWeek: {
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    monthTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 4,
    },
    daysInMonth: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 4,
    },
    days: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 4,
      color: '#9e9e9e'
    },
    datesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    date: {
      width: '12%',
      textAlign: 'center',
      fontSize: 12,
    },
  });

export default styles;