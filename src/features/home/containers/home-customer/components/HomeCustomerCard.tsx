import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles from './Styles';
import Icon from 'react-native-vector-icons/Ionicons';

interface HomeCustomerCardProps {
    customer: {
        name: string;
        location: string;
        job: string;
        rating: number; 
        imageUrl: string;
    };
}

const HomeCustomerCard = ({ customer }: HomeCustomerCardProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    // Generate an array of stars based on the rating
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Icon
                    key={i}
                    name={i <= customer.rating ? "star" : "star-outline"}
                    size={16}
                    color="gold"
                    style={Styles.starIcon}
                />
            );
        }
        return stars;
    };

    return (
        <View style={Styles.customerCardContainer}>
            <Image source={{ uri: customer.imageUrl }} style={Styles.customerImage} />
            <View style={Styles.customerInfo}>
                <Text style={Styles.customerName}>{customer.name}</Text>
                <Text style={Styles.customerLocation}>{customer.location}</Text>
                <Text style={Styles.customerJob}>{customer.job}</Text>
                <View style={Styles.ratingContainer}>
                    {renderStars()}
                </View>
            </View>
            <View style={Styles.actionButtons}>
                <TouchableOpacity onPress={toggleFavorite}>
                    <Icon
                        name={isFavorite ? "heart" : "heart-outline"}
                        size={24}
                        color={isFavorite ? "red" : "gray"}
                        style={Styles.favoriteIcon}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.chatButton}>
                    <Text style={Styles.chatButtonText}>Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeCustomerCard;
