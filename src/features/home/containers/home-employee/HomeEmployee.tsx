import React from 'react';
import CalendarYear from './calendar-year/CalendarYear';
import Header from '@/src/shared/components/header/Header';

const HomeEmplyee = () => {
  return (
    <>
      <Header title={'Lịch làm việc'} onBackPress={()=> {}}/>
      <CalendarYear/>
    </>
  );
};



export default HomeEmplyee;
