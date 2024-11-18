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
        fontSize: 30,
        color: Colors.mainColor1,
        fontWeight: '700'
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
      }
  });

export default styles;