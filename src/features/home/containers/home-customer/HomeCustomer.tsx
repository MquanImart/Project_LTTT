import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import FilterBar from './components/FilterBar';
import HomeCustomerList from './components/HomeCustomerList';
import Styles from './components/Styles';
import Header from '@/src/shared/components/Header';

const HomeCustomer = () => {
    const [selectedFilters, setSelectedFilters] = useState({
        job: 'Tất cả',
        location: 'Tất cả',
        rating: 'Tất cả',
    });

    const handleFilterChange = (job: string, location: string, rating: string) => {
        setSelectedFilters({ job, location, rating });
    };

    return (
        <View >
            <Header title="Home" onBackPress={() => {}} />
            <ScrollView style={Styles.container}>
                <FilterBar onFilterChange={handleFilterChange} />
                <HomeCustomerList filters={selectedFilters} />
            </ScrollView>
        </View>
    );
};

export default HomeCustomer;
