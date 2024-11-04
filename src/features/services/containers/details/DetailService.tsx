import Header from "@/src/shared/components/header/Header";
import { HomeEmployeeStackParamList } from "@/src/shared/routes/HomeEmployeeNavigation";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View, Image, Text, KeyboardAvoidingView, Platform } from "react-native";
import useDetailService from "./useDetailService";
import { ActivityIndicator, Button, Dialog, MD2Colors, Portal, Provider } from "react-native-paper";
import styles from "./styleDetail";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import TabDetail from "../../components/TabDetail";
import Colors from "@/src/styles/Color";
import DetailCard from "./DetailCard";
import { ScrollView } from "react-native-gesture-handler";
import BillCard from "./BillCard";

type DetailServiceNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeEmployeeStackParamList, 'DetailService'>,
  NativeStackNavigationProp<any>
>;

const DetailService = () => {
    const [role, setRole] = useState<string>('employee');
    const [tab, setTab] = useState<number>(0);
    const navigation = useNavigation<DetailServiceNavigationProp>();
    const {order, employee, customer, jobs, setJobs} = useDetailService();

    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');

    const showDialog = (text: string) => {
        setVisible(true);
        setMessage(text);
    }

    const hideDialog = () => {
      setVisible(false);
      setMessage('');
    };
    const handleSubmitDialog = () => {
      hideDialog();
    };
    const handleBackPress = () => {
        navigation.goBack();
      };
    
      if (order === null){
        return (
            <ActivityIndicator animating={true} color={MD2Colors.red800} />
        )
      }

    return (
      <Provider>
        <View style={styles.container}>
          <Header title={"Chi tiết công việc"} onBackPress={handleBackPress}/>
          <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            extraScrollHeight={150} // Thêm khoảng cách khi cuộn để hiển thị rõ TextInput
            enableOnAndroid={true} // Kích hoạt cho Android
          >
            <ScrollView>
            <View style={styles.infoOrder}>
                <Image source={require("../../../../assets/images/resetpass.png")} style={styles.img} />
                <View style={styles.boxInfo}>
                    <Text style={styles.textTitle}>{order.jobDetail.jobName}</Text>
                    <View style={styles.cardLabel}>
                        <Icon name="person" size={24} color="#000" style={{marginHorizontal: 5}} />
                        <Text>{role === 'user'? `${employee?.personalInfo.firstName} ${employee?.personalInfo.lastName}`
                        : `${customer?.personalInfo.firstName} ${customer?.personalInfo.lastName}`}</Text>
                    </View>
                    <View style={styles.cardLabel}>
                        <Icon name="phone" size={24} color="#000" style={{marginHorizontal: 5}}/>
                        <Text>{role === 'user'? employee?.account.phoneNumber
                        : customer?.account.phoneNumber}</Text>
                    </View>
                    <Button mode="contained" onPress={() => console.log('Pressed')}
                        style={{backgroundColor: Colors.mainColor1}}>
                      Chat
                    </Button>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.cardLabel}>
                    <Icon name="access-time" size={24} color="#000" style={{marginHorizontal: 5}}/>
                    <Text>{order.startDate.toDateString()}</Text>
                </View>
                <View style={styles.cardLabel}>
                    <Icon name="place" size={24} color="#000" style={{marginHorizontal: 5}}/>
                    <Text>{order.address}</Text>
                </View>
            </View>
            <TabDetail tab={tab} setTab={setTab}/>
            {tab === 0 && <DetailCard jobs={jobs} setJobs={setJobs}/>}
            {tab === 1 && <BillCard jobs={jobs} setJobs={setJobs}/>}
            </ScrollView>
          </KeyboardAwareScrollView>
          {tab === 1 && <View style={styles.boxButton}>
            <Button 
              style={styles.buttonsubmit}
              labelStyle={{ color: Colors.mainColor1 }} 
              mode="outlined" onPress={()=> {showDialog('gửi hóa đơn')}}>
                Gửi hóa đơn
            </Button>
            <Button 
              style={styles.buttonsubmit}
              labelStyle={{ color: Colors.mainColor1 }} 
              mode="outlined" onPress={()=> {showDialog('đã thanh toán')}}>
                Xác nhận thanh toán
            </Button>
          </View>}
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Thông báo</Dialog.Title>
              <Dialog.Content>
                <Text style={styles.textDialog}>Xác nhận {message}</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Hủy</Button>
                <Button
                  onPress={handleSubmitDialog}
                >
                  Xác Nhận
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </Provider>
    )
}

export default DetailService;