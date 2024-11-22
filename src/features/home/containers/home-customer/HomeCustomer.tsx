import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import JobGrid from './components/Jobs/JobGrid';
import Styles from "./components/Jobs/Styles";
import Header from '@/src/shared/components/header/Header';
const HomeCustomer = () => {
    return (
        <View >
            <Header title="Trang chủ" onBackPress={() => {}} />
            <View style={Styles.container}>
                <JobGrid/>
            </View>
        </View>
    );
};

export default HomeCustomer;
