import Header from "@/src/shared/components/header/Header";
import { ScrollView, View, Image, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styleDetail";
import TabDetail from "../../components/TabDetail";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ManageEmployeeStackParamList } from "@/src/shared/routes/ManageEmployeeNav";
import Colors from "@/src/styles/Color";
import { useState } from "react";
import useDetail from "./useDetail";
import ServiceEmployee from "./ServiceEmployee";
import ReviewEmployee from "./ReviewEmployee";

type DetailEmployeeNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ManageEmployeeStackParamList, 'Details'>,
  NativeStackNavigationProp<any>
>;

const DetailEmployee = () => {
    const [tab, setTab] = useState<number>(0);
    const navigation = useNavigation<DetailEmployeeNavigationProp>();
    const handleBackPress = () => {
        navigation.goBack();
    };

    const {employee, rating, addressHome}= useDetail();


    if (employee === null) return(<></>)
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
                    <Text style={styles.textTitle}>{employee.user.personalInfo.firstName} {employee.user.personalInfo.lastName}</Text>
                    <View style={styles.cardLabel}>
                        <Icon name="star" size={24} color="#000" style={{marginHorizontal: 5}} />
                        <Text>{rating} sao</Text>
                    </View>
                    <View style={styles.cardLabel}>
                        <Icon name="phone" size={24} color="#000" style={{marginHorizontal: 5}}/>
                        <Text>{employee.user.account.phoneNumber}</Text>
                    </View>
                    <Button mode="contained" onPress={() => console.log('Pressed')}
                        style={{backgroundColor: Colors.mainColor1}}>
                      Chat
                    </Button>
                </View>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.cardLabel}>
                    <Icon name="place" size={24} color="#000" style={{marginHorizontal: 5}}/>
                    <Text>Địa chỉ: {addressHome()}</Text>
                </View>
            </View>
            <TabDetail tab={tab} setTab={setTab}/>
            {tab === 0 && <ServiceEmployee services={employee.service}/>}
            {tab === 1 && <ReviewEmployee reviews={employee.review}/>}
            </ScrollView>
          </KeyboardAwareScrollView>
        <View style={styles.buttonDelete}>
            <Button 
            style={{backgroundColor: '#ff5c5c', alignSelf: 'center'}}
            labelStyle={{color: '#fff'}}
            mode="contained" onPress={() => console.log('Pressed')}>
              Sa thải
            </Button>
        </View>
        </View>
      </Provider>
    )
}

export default DetailEmployee;