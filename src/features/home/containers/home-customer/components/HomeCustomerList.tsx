import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import HomeCustomerCard from './HomeCustomerCard';

interface Customer {
    id: string;
    name: string;
    location: string;
    job: string;
    rating: number;
    imageUrl: string;
}

interface Filters {
    job: string;
    location: string;
    rating: string;
}

interface HomeCustomerListProps {
    filters: Filters;
}

const allCustomers: Customer[] = [
    { id: '1', name: 'Ahmed Jasim', location: 'Hà Nội', job: 'Thợ ống nước', rating: 5, imageUrl: '' },
    { id: '2', name: 'John Doe', location: 'Hồ Chí Minh', job: 'Sửa điện', rating: 4, imageUrl: '' },
    { id: '3', name: 'Jane Smith', location: 'Đà Nẵng', job: 'Bảo trì cửa sổ', rating: 3, imageUrl: '' },
    { id: '4', name: 'Ali Ahmed', location: 'Hải Phòng', job: 'Thợ ống nước', rating: 5, imageUrl: '' },
    { id: '5', name: 'Sara Khan', location: 'Cần Thơ', job: 'Sửa khóa', rating: 4, imageUrl: '' },
    { id: '6', name: 'A', location: 'Hà Nội', job: 'Thợ ống nước', rating: 4, imageUrl: '' },
    { id: '7', name: 'B', location: 'Hồ Chí Minh', job: 'Sửa điện', rating: 5, imageUrl: '' },
    { id: '8', name: 'C', location: 'Hà Nội', job: 'Bảo trì cửa sổ', rating: 2, imageUrl: '' },
    { id: '9', name: 'D', location: 'Hồ Chí Minh', job: 'Thợ ống nước', rating: 1, imageUrl: '' },
    { id: '10', name: 'E', location: 'Cần Thơ', job: 'Sửa khóa', rating: 3, imageUrl: '' },
];

const HomeCustomerList: React.FC<HomeCustomerListProps> = ({ filters }) => {
    const { job, location, rating } = filters;
    const [expandedJobs, setExpandedJobs] = useState<{ [key: string]: boolean }>({});

    // Filter customers based on selected filters
    const filteredCustomers = allCustomers.filter((customer) => {
        const matchesJob = job === 'Tất cả' || customer.job === job;
        const matchesLocation = location === 'Tất cả' || customer.location === location;
        const matchesRating =
            rating === 'Tất cả' || customer.rating === parseInt(rating.split(' ')[0], 10);

        return matchesJob && matchesLocation && matchesRating;
    });

    // Group customers by job
    const groupedCustomers = filteredCustomers.reduce((acc, customer) => {
        if (!acc[customer.job]) {
            acc[customer.job] = [];
        }
        acc[customer.job].push(customer);
        return acc;
    }, {} as Record<string, Customer[]>);

    // Toggle the expanded state of a job category
    const toggleJobCategory = (jobTitle: string) => {
        setExpandedJobs((prev) => ({
            ...prev,
            [jobTitle]: !prev[jobTitle],
        }));
    };

    return (
        <View style={Styles.customerListContainer}>
            {Object.keys(groupedCustomers).map((jobTitle) => {
                const isExpanded = expandedJobs[jobTitle];
                const customersToShow = isExpanded
                    ? groupedCustomers[jobTitle] // Show all customers if expanded
                    : groupedCustomers[jobTitle].slice(0, 2); // Show only 2 customers if collapsed

                return (
                    <View key={jobTitle}>
                        <TouchableOpacity onPress={() => toggleJobCategory(jobTitle)}>
                            <Text style={Styles.categoryTitle}>{jobTitle}</Text>
                        </TouchableOpacity>
                        {customersToShow.map((customer) => (
                            <HomeCustomerCard key={`${customer.id}-${jobTitle}`} customer={customer} />
                        ))}
                    </View>
                );
            })}
        </View>
    );
};

export default HomeCustomerList;
