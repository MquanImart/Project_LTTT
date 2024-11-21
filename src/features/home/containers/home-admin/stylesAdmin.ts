import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textTitle: {
    fontSize: 25,
    fontWeight: '500',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  boxChart: {
    width: width, alignSelf: 'center',
    minHeight: 600,
    marginVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    // Đổ bóng cho Android
    elevation: 5,
  },
  boxPie: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  legendContainer: {
    marginVertical: 20,
    alignItems: 'flex-start', // Căn trái cho chú thích
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  colorBox: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  legendText: {
    fontSize: 16,
  },
  });

export default styles;