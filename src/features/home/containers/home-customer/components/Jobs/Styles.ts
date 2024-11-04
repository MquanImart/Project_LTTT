import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    card: {
        width: '30%',
        marginBottom: 15,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
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
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
});

export default styles;
