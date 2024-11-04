import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import Header from '@/src/shared/components/Header';
import JobGrid from './components/Jobs/JobGrid';
import Styles from "./components/Jobs/Styles";
const HomeCustomer = () => {
    return (
        <View >
            <Header title="Home" onBackPress={() => {}} />
            <View style={Styles.container}>
                <JobGrid/>
            </View>
        </View>
    );
};

export default HomeCustomer;
