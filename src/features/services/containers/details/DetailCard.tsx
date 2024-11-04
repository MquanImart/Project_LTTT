import Colors from '@/src/styles/Color';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, IconButton } from 'react-native-paper';
import { Bill } from './useDetailService';

interface DetailCardProps{
    jobs: Bill[];
    setJobs: (value: Bill[]) => void;
}

const DetailCard = ({jobs, setJobs}: DetailCardProps) => {
    const [text, setText] = useState('');
    const handleSend = () => {
        if (text !== '') {
            setJobs([...jobs, {
                id: jobs.length,
                name: text,
                price: 0
            }]);
            setText('');
        }
      };
      const handleDelete = (job: string) => {
        setJobs(jobs.filter((j)=> j.name !== job));
      };
      
    return (
        <View style={styles.card}>
            <View style={styles.container}>
                <TextInput
                  label="Nhập nội dung"
                  value={text}
                  onChangeText={text => setText(text)}
                  mode="outlined"
                  style={styles.input}
                />
                <Button mode="contained" onPress={handleSend} style={styles.button}>
                  Gửi
                </Button>
            </View>
            {jobs.slice().reverse().map((job)=> (
                <View style={styles.boxJob}>
                    <Text style={styles.textJob}>{job.name}</Text>
                    <IconButton
                      icon="delete"
                      size={24}
                      onPress={() => handleDelete(job.name)}
                    />
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
    },
    container: {
        width: '100%', height: 100,
      padding: 16,
      justifyContent: 'space-around',
      alignItems: 'center',
      flexDirection: 'row'
    },
    input: {
        width: '70%',
        backgroundColor: '#fff'
    },
    button: {
        width: 80, height: 60,
        backgroundColor: Colors.mainColor1,
        justifyContent: 'center'
    },
    boxJob: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: Colors.mainColor2,
        marginVertical: 5,
    },
    textJob: {
        width: 300
    }
  });

export default DetailCard;

