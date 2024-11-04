import React from 'react';
import { ScrollView, View } from 'react-native';
import JobCard from './JobCard';
import styles from './Styles';

const jobs = [
  {
    id: 1,
    name: 'Fixing a faucet',
    image: 'https://anhvienpiano.com/wp-content/uploads/2019/05/chup-anh-thoi-trang-dep-my-man-duoi-anh-mat-troi-1.jpg',
  },
  {
    id: 2,
    name: 'Fixing a pipe',
    image: 'https://anhvienpiano.com/wp-content/uploads/2019/05/chup-anh-thoi-trang-dep-my-man-duoi-anh-mat-troi-1.jpg',
  },
  {
    id: 3,
    name: 'Basic pipe installation',
    image: 'https://anhvienpiano.com/wp-content/uploads/2019/05/chup-anh-thoi-trang-dep-my-man-duoi-anh-mat-troi-1.jpg',
  },
  {
    id: 4,
    name: 'Repairing sink',
    image: 'https://anhvienpiano.com/wp-content/uploads/2019/05/chup-anh-thoi-trang-dep-my-man-duoi-anh-mat-troi-1.jpg',
  },
  {
    id: 5,
    name: 'Cleaning pipes',
    image: 'https://anhvienpiano.com/wp-content/uploads/2019/05/chup-anh-thoi-trang-dep-my-man-duoi-anh-mat-troi-1.jpg',
  },
  {
    id: 6,
    name: 'Installing new pipes',
    image: 'https://anhvienpiano.com/wp-content/uploads/2019/05/chup-anh-thoi-trang-dep-my-man-duoi-anh-mat-troi-1.jpg',
  },
];

const JobGrid: React.FC = () => {
  return (
    <ScrollView>
      <View style={styles.grid}>
        {jobs.map((job, index) => (
          <JobCard key={`${job.id}-${index}`} name={job.name} image={job.image} />
        ))}
      </View>
    </ScrollView>
  );
};

export default JobGrid;
