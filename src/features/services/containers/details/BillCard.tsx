import Colors from '@/src/styles/Color';
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button, Provider, Portal, Dialog } from 'react-native-paper';
import { Bill } from './useDetailService';

interface DetailCardProps{
    jobs: Bill[];
    setJobs: (value: Bill[]) => void;
}

const BillCard = ({jobs, setJobs}: DetailCardProps) => {
    const [text, setText] = useState('');

    const [visible, setVisible] = useState(false);
    const [price, setPrice] = useState('');
    const [curr, setCurr] = useState<Bill | null>(null);
    const [error, setError] = useState('');

    const showDialog = (job: Bill) => {
        setVisible(true);
        setPrice('');
        setCurr(job);
    }
    const hideDialog = () => {
      setVisible(false);
      setCurr(null);
      setPrice('');
      setError('');
    };

    const handlePriceChange = (text: string) => {
        if (isNaN(Number(text)) || Number(text) <= 0) {
          setError('Vui lòng nhập số lớn hơn 0');
        } else {
          setError('');
        }
        setPrice(text);
      };
    
      const handleSubmit = () => {
        if (error !== '') return;
        setJobs(jobs.map((job)=> {
            if (job.id === curr?.id){
                return {
                    ...job,
                    price: Number(price)
                }
            } else{
                return job
            }
        }))
        setVisible(false);
      }
    return (
        <Provider>
          <View style={styles.card}>
            {jobs.slice().reverse().map((job, index) => (
              <View style={styles.boxJob} key={index}>
                <Text style={styles.textJob}>{job.name}</Text>
                <Button 
                style={styles.button}
                mode="contained" onPress={()=> {showDialog(job)}}>
                  {job.price.toLocaleString('vi-VN')}đ
                </Button>
              </View>
            ))}
          </View>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Nhập Chi Phí</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Chi phí"
                  value={price}
                  onChangeText={handlePriceChange}
                  keyboardType="numeric"
                  error={!!error}
                />
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Hủy</Button>
                <Button
                  onPress={handleSubmit}
                >
                  Xác Nhận
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </Provider>
    )
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        minHeight: 400,
    },
    boxJob: {
        width:'95%', alignSelf: 'center',
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Colors.mainColor2,
        marginVertical: 5,
        borderRadius: 20,
    },
    button: {
        minWidth: 100,
        backgroundColor: Colors.mainColor1,
        justifyContent: 'center',
    },
    textJob: {

    },
    errorText: {
        color: 'red',
        marginTop: 4,
    },
  });

export default BillCard;

