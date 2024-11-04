import { StyleSheet } from 'react-native';
import Colors from '@/src/styles/Color';

const styles = StyleSheet.create({
    body: {
        padding: 20,
    },
    jobTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    addressContainer: {
        flexDirection: 'column',
        marginBottom: 15,
    },
    addressInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
    },
    timeContainer: {
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent: 'space-around'
    },
    dateButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    dateButtonText: {
        fontSize: 16,
        color: '#000',
    },
    noteInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top',
    },
    conteainerpass: {
        alignItems: 'center',
        marginTop: 20,
    },
    btn: {
        backgroundColor: Colors.mainColor1,
        padding: 10,
        borderRadius: 5,
    },
    testpass: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;
