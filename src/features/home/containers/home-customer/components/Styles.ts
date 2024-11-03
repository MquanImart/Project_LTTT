import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor: '#fff',
        padding: 20,
    },
    customerListContainer: {
        marginTop: 10,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    customerCardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    customerImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },
    customerInfo: {
        flex: 1,
    },
    customerName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    customerLocation: {
        color: '#666',
    },
    customerJob: {
        color: '#666',
    },
    ratingText: {
        marginLeft: 5,
    },
    chatButton: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 8,
    },
    chatButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    containerFilter: {
        flex: 1,
        position: 'relative',
        marginHorizontal: 5,
        zIndex: 1000,
    },
    dropdownButton: {
        backgroundColor: '#f2f2f2',
        borderWidth: 1,
        borderColor: '#ddd',
        zIndex: 1, 
        padding: 8,
        marginTop: 10
    },
    buttonText: {
        fontSize: 16,
    },
    dropdownList: {
        position: 'absolute',
        top: 45, 
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        zIndex: 10000, 
        elevation: 10, 
        maxHeight: 300, 
        overflow: 'hidden',
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
    },
    filterBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15,
        zIndex: 1000, 
    },
    actionButtons: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    favoriteIcon: {
        marginBottom: 10,
    },
    starIcon: {
        marginRight: 2, 
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
});
