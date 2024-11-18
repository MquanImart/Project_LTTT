import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Header from '@/src/shared/components/header/Header';
import AppointmentTabs from '@/src/features/appointment/components/AppointmentTabs';
import AppointmentProgressCard from '@/src/features/appointment/components/AppointmentProgressCard';
import Colors from '@/src/styles/Color';
import useAppointment from '../useAppointment';
import { ActivityIndicator, Button, Dialog, MD2Colors, Portal, Provider, TextInput } from 'react-native-paper';
import restClient from '@/src/shared/services/RestClient';
import { Order } from '@/src/interface/interface';
import Toast from 'react-native-toast-message';

const ProgressAppointmentScreen = () => {
  const {progressAppoint, role, setProgressAppoint} = useAppointment();
  const [visible, setVisible] = useState(false);
  const [cancel, setCancel] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOpenDialog = (selected: Order) => {
    setVisible(true);
    setSelectedOrder(selected);
  }

  const handleHieDialog = () => {
    setVisible(false);
    setCancel('');
    setSelectedOrder(null);
  }

  const handleSubmitDialog = async () => {
    const orderClient = restClient.apiClient.service("orders");
    if (selectedOrder){
      const result = await orderClient.patch(selectedOrder._id.$oid, {state: "Canceled", cancelReason: cancel})
      if (result.success){
        setProgressAppoint(progressAppoint.filter((item) => item.order._id.$oid !== selectedOrder._id.$oid))
      } else {
        Toast.show({
          type: "error",
          text1: "Không thể hủy",
          text2: "Vui lòng thử lại sau.",
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Chưa chọn đơn hàng",
        text2: "Vui lòng thử lại sau.",
      });
    }
    setVisible(false);
  }

  const handleDetails = () => {
    //navigation.navigate("Details");
  }
  if (role === null) return  <ActivityIndicator animating={true} color={MD2Colors.red800} />

  return (
    <Provider>
    <View style={styles.container}>
      <Header title="Đơn hàng" onBackPress={() => console.log('Back Pressed')} />
      <AppointmentTabs selectedTab={'Đang thực hiện'} />
      <FlatList
        data={progressAppoint}
        renderItem={({ item }) => (
          <AppointmentProgressCard
            role={role}
            appointment={item}
            onCancelPress={() => handleOpenDialog(item.order)}
            onFavoritePress={() => console.log('Favorite pressed')}
            onDetailsPress={handleDetails}
          />
        )}
        keyExtractor={(item) => item.order._id.$oid}
        contentContainerStyle={styles.listContainer}
      />
      <Portal>
            <Dialog visible={visible} onDismiss={handleHieDialog}>
              <Dialog.Title>Nhập Lý do</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  label="Lý do"
                  value={cancel}
                  onChangeText={(text) => setCancel(text)}
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={handleHieDialog}>Hủy</Button>
                <Button
                  onPress={() => handleSubmitDialog()}
                >
                  Xác Nhận
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
    </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContainer: {
    paddingBottom: 70, 
  },
});

export default ProgressAppointmentScreen;
