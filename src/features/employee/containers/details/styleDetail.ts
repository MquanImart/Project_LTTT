import Colors from '@/src/styles/Color';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    infoOrder: {
        width: '100%',
        height: 200,
        padding: 20,
        flexDirection: 'row', justifyContent: 'space-between'
    },
    img: {
        width: '30%',
        height: '100%'
    },
    boxInfo: {
        width: '68%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardLabel: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textTitle: {
        fontSize: 25,
        fontWeight: '500'
    },
    mainContainer: {
        paddingHorizontal: 10,
    },
    boxButton: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: Colors.background,
        position: 'absolute',
        bottom: 0
      },
      buttonsubmit: {
        borderColor: Colors.mainColor1,
        color: Colors.mainColor1
      },
      textDialog: {
        color: '#fff',
        fontSize: 20
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
      buttonDelete: {
        position: 'absolute', 
        bottom: 0, width: '100%', 
        backgroundColor: '#fff', 
        paddingVertical: 10,
        borderStyle: 'solid',
        borderColor: Colors.mainColor1,
        borderTopWidth: 1
      }
  });

export default styles;