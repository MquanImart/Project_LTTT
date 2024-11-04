import React from 'react';
import { View } from 'react-native';
import InputBookJob from './InputBookJob';
import styles from './Styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Header from '@/src/shared/components/header/Header';


type RootStackParamList = {
    BookJob: {
        jobName: string;
    };
};

type BookJobNavigationProp = StackNavigationProp<RootStackParamList, 'BookJob'>;
type BookJobRouteProp = RouteProp<RootStackParamList, 'BookJob'>;

interface BookJobProps {
    route: BookJobRouteProp;
    navigation: BookJobNavigationProp;
}

const BookJob: React.FC<BookJobProps> = ({ route, navigation }) => {
    const { jobName } = route.params;

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        // Xử lý đặt lịch
    };

    return (
        <View style={styles.container}>
            <Header title="Đặt dịch vụ" onBackPress={() => { }} />
            <InputBookJob jobName={jobName} onSubmit={handleSubmit} />
        </View>
    );
};

export default BookJob;
