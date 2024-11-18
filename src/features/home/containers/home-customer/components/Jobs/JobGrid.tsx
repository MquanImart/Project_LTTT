import React, { useEffect, useState } from 'react';
import { ScrollView, View, ActivityIndicator, Text } from 'react-native';
import JobCard from './JobCard';
import styles from './Styles';
import restClient from "@/src/shared/services/RestClient";
import { Service } from "@/src/interface/interface";

const JobGrid: React.FC = () => {
  const [jobs, setJobs] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const serviceClient = restClient.apiClient.service("services");
        const response = await serviceClient.find({});
        console.log("API Response:", response); // Kiểm tra phản hồi API
        if (response.success) {
          const transformedData = response.resData.map((item: any) => ({
            id: item._id,
            name: item.name,
            img: item.img || "https://via.placeholder.com/150", // Hình mặc định nếu không có ảnh
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : undefined,

          }));
          setJobs(transformedData);
        } else {
          setError("Failed to fetch jobs.");
        }
      } catch (error) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading jobs...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.grid}>
        {jobs.map((job) => (
        <JobCard key={job._id} service={job} />
        ))}
      </View>
    </ScrollView>
  );
};

export default JobGrid;
