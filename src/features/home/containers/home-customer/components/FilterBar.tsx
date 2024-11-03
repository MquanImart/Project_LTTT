import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from "./Styles";

interface FilterBarProps {
    onFilterChange: (job: string, location: string, rating: string) => void;
}

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
    const jobList = [
        { id: '1', name: 'Tất cả' },
        { id: '2', name: 'Thợ ống nước' },
        { id: '3', name: 'Sửa điện' },
        { id: '4', name: 'Bảo trì cửa sổ' },
        { id: '5', name: 'Sửa khóa' },
    ];

    const locationList = [
        'Tất cả', 'Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng', 'Cần Thơ',
    ].map((name, index) => ({ id: (index + 1).toString(), name }));

    const ratingList = [
        { id: '1', name: 'Tất cả' },
        { id: '2', name: '1 sao' },
        { id: '3', name: '2 sao' },
        { id: '4', name: '3 sao' },
        { id: '5', name: '4 sao' },
        { id: '6', name: '5 sao' },
    ];

    const [selectedJob, setSelectedJob] = useState('Tất cả');
    const [selectedLocation, setSelectedLocation] = useState('Tất cả');
    const [selectedRating, setSelectedRating] = useState('Tất cả');

    const [isJobDropdownVisible, setIsJobDropdownVisible] = useState(false);
    const [isLocationDropdownVisible, setIsLocationDropdownVisible] = useState(false);
    const [isRatingDropdownVisible, setIsRatingDropdownVisible] = useState(false);

    const handleJobSelect = (jobName: string) => {
        setSelectedJob(jobName);
        setIsJobDropdownVisible(false);
        onFilterChange(jobName, selectedLocation, selectedRating);
    };

    const handleLocationSelect = (locationName: string) => {
        setSelectedLocation(locationName);
        setIsLocationDropdownVisible(false);
        onFilterChange(selectedJob, locationName, selectedRating);
    };

    const handleRatingSelect = (rating: string) => {
        setSelectedRating(rating);
        setIsRatingDropdownVisible(false);
        onFilterChange(selectedJob, selectedLocation, rating);
    };

    return (
        <View style={styles.filterBarContainer}>
            {/* Job Dropdown */}
            <View style={styles.containerFilter}>
                <Text style={styles.itemText}>Công việc</Text>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsJobDropdownVisible(!isJobDropdownVisible)}
                >
                    <Text style={styles.buttonText}>{selectedJob}</Text>
                </TouchableOpacity>
                {isJobDropdownVisible && (
                    <View style={styles.dropdownList}>
                        <FlatList
                            data={jobList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleJobSelect(item.name)}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            {/* Location Dropdown */}
            <View style={styles.containerFilter}>
                <Text style={styles.itemText}>Địa chỉ</Text>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsLocationDropdownVisible(!isLocationDropdownVisible)}
                >
                    <Text style={styles.buttonText}>{selectedLocation}</Text>
                </TouchableOpacity>
                {isLocationDropdownVisible && (
                    <View style={styles.dropdownList}>
                        <FlatList
                            data={locationList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleLocationSelect(item.name)}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>

            {/* Rating Dropdown */}
            <View style={styles.containerFilter}>
                <Text style={styles.itemText}>Đánh giá</Text>
                <TouchableOpacity
                    style={styles.dropdownButton}
                    onPress={() => setIsRatingDropdownVisible(!isRatingDropdownVisible)}
                >
                    <Text style={styles.buttonText}>{selectedRating}</Text>
                </TouchableOpacity>
                {isRatingDropdownVisible && (
                    <View style={styles.dropdownList}>
                        <FlatList
                            data={ratingList}
                            keyExtractor={(item) => item.id}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.dropdownItem}
                                    onPress={() => handleRatingSelect(item.name)}
                                >
                                    <Text style={styles.itemText}>{item.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                )}
            </View>
        </View>
    );
};

export default FilterBar;
