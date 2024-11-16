import { StyleSheet } from 'react-native';
import Colors from '@/src/styles/Color';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    width: '30%',
    marginBottom: 15,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  image: {
    width: '100%',
    height: 100,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
  },
  title: {
    color: Colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: Colors.red,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default styles;
