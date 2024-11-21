import React from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import InputBookJob from "./InputBookJob";
import styles from "./Styles";
import Header from "@/src/shared/components/header/Header";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/src/shared/routes/HomeCustomerNavigation";

type BookJobNavigationProp = StackNavigationProp<RootStackParamList, "BookJob">;
type BookJobRouteProp = RouteProp<RootStackParamList, "BookJob">;

interface BookJobProps {
  route: BookJobRouteProp;
  navigation: BookJobNavigationProp;
}

const BookJob: React.FC<BookJobProps> = ({ route, navigation }) => {
  const { jobName, jobId } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    // Thực hiện logic sau khi submit thành công
    console.log("Đặt dịch vụ thành công");
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined} // On iOS, we use padding to avoid the keyboard covering inputs
      >
        <ScrollView>
          <View style={styles.container}>
            <Header title="Đặt dịch vụ" onBackPress={handleBackPress} />
            <InputBookJob jobName={jobName} jobId={jobId} onSubmit={handleSubmit} goBack={navigation.goBack} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default BookJob;