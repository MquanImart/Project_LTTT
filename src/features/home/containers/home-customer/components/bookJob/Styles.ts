import { StyleSheet } from 'react-native';
import Colors from '@/src/styles/Color';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        justifyContent: 'space-between', // Đảm bảo không gian giữa hai button
        marginBottom: 15,
    },
    dateButton: {
        flex: 1, // Chia đều không gian cho hai button
        marginHorizontal: 5, // Thêm khoảng cách giữa hai button
        padding: 10,
        borderRadius: 5,
        backgroundColor: Colors.mainColor1,
        alignItems: 'center',
    },
    dateButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    noteInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        height: 100,
        textAlignVertical: 'top',
    },
    btn: {
        backgroundColor: Colors.mainColor1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    testpass: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollView: {
        flexGrow: 1,
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
});


export default styles;
