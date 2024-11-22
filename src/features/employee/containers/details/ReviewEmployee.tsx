import { Review } from "@/src/interface/interface";
import { View } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
interface ReviewEmployeeProps{
    reviews: Review[];
}
const ReviewCard: React.FC<{ review: Review }> = ({ review }) => {
    return (
        <Card style={{ margin: 10, backgroundColor: '#fff' }}>
            <Card.Content>
                <Title style={{color: 'black'}}>Đánh giá từ: {review.customerId}</Title>
                <Paragraph style={{color: 'black'}}>Nội dung: {review.content}</Paragraph>
                <Paragraph style={{color: 'black'}}>Đánh giá: {review.rating} ⭐</Paragraph>
            </Card.Content>
        </Card>
    );
};

const ReviewEmployee = ({reviews}: ReviewEmployeeProps) => {
    return (
        <View>
            {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
            ))}
        </View>
    )
}

export default ReviewEmployee;
