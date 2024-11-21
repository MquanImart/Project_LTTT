import React, { useState } from "react";
import { View, Text, TextInput, ScrollView, TouchableOpacity,KeyboardAvoidingView, Platform } from "react-native";
import { Button } from "react-native-paper";
import { DatePickerModal, TimePickerModal } from "react-native-paper-dates";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./Styles";
import restClient from "@/src/shared/services/RestClient";

interface InputBookJobProps {
  jobName: string;
  jobId: string;
  onSubmit: () => void;
  goBack: () => void; // Hàm chuyển về trang trước
}

const InputBookJob: React.FC<InputBookJobProps> = ({ jobName, jobId, onSubmit, goBack }) => {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<{ hours: number; minutes: number } | undefined>();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);
  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
    street: "",
  });
  const [phone, setPhone] = useState("");

  const today = new Date();

  const validateFields = () => {
    if (!address.province || !address.district || !address.ward || !address.street) {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Vui lòng điền đầy đủ địa chỉ.",
        position: "top",
      });
      return false;
    }
    if (!phone || !/^[0-9]{10,11}$/.test(phone)) {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Số điện thoại phải có từ 10 đến 11 số.",
        position: "top",
      });
      return false;
    }
    if (!date) {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Vui lòng chọn ngày.",
        position: "top",
      });
      return false;
    }
    if (!time) {
      Toast.show({
        type: "error",
        text1: "Thông báo",
        text2: "Vui lòng chọn giờ.",
        position: "top",
      });
      return false;
    }
    return true;
  };

  const handleBooking = async () => {
    if (validateFields()) {
      try {
        const customerId = await AsyncStorage.getItem("userId");
        if (!customerId) {
          Toast.show({
            type: "error",
            text1: "Lỗi",
            text2: "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.",
            position: "top",
          });
          return;
        }

        const startDate = new Date(date!);
        startDate.setHours(time!.hours, time!.minutes);

        const payload = {
          jobId,
          customerId,
          address: `${address.street}, ${address.ward}, ${address.district}, ${address.district}`,
          phoneNumber: phone,
          startDate,
        };

        const result = await restClient.apiClient.service("orders").create(payload);

        if (result.success) {
          Toast.show({
            type: "success",
            text1: "Thành công",
            text2: "Đặt dịch vụ thành công!",
            position: "top",
          });
          onSubmit(); // Gọi hàm callback khi đặt lịch thành công
          resetFields(); // Reset dữ liệu các ô nhập
          goBack(); // Quay lại trang trước
        } else {
          Toast.show({
            type: "error",
            text1: "Thất bại",
            text2: result.messages || "Không thể đặt dịch vụ.",
            position: "top",
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Lỗi",
          text2: "Đã xảy ra lỗi khi đặt dịch vụ.",
          position: "top",
        });
      }
    }
  };

  const resetFields = () => {
    setDate(undefined);
    setTime(undefined);
    setAddress({ province: "", district: "", ward: "", street: "" });
    setPhone("");
  };

  return (
 <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.body}>
        <Text style={styles.jobTitle}>Dịch vụ: {jobName}</Text>

        <Text style={styles.label}>Địa chỉ:</Text>
        <View style={styles.addressContainer}>
          <TextInput
            placeholder="Tỉnh/TP"
            style={styles.addressInput}
            value={address.province}
            onChangeText={(text) => setAddress({ ...address, province: text })}
          />
          <TextInput
            placeholder="Quận/Huyện"
            style={styles.addressInput}
            value={address.district}
            onChangeText={(text) => setAddress({ ...address, district: text })}
          />
          <TextInput
            placeholder="Phường/Xã"
            style={styles.addressInput}
            value={address.ward}
            onChangeText={(text) => setAddress({ ...address, ward: text })}
          />
          <TextInput
            placeholder="Số điện thoại"
            placeholderTextColor="#A9A9A9" // Màu placeholder dễ nhìn
            keyboardType="phone-pad"
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Thời gian:</Text>
          <View style={styles.timeContainer}>
            <TouchableOpacity style={styles.dateButton} onPress={() => setOpenDatePicker(true)}>
              <Text style={styles.dateButtonText}>
                {date ? date.toLocaleDateString("vi-VN") : "Chọn Ngày"}
              </Text>
            </TouchableOpacity>
            <DatePickerModal
              locale="vi"
              mode="single"
              visible={openDatePicker}
              onDismiss={() => setOpenDatePicker(false)}
              date={date}
              onConfirm={(params) => {
                setDate(params.date);
                setOpenDatePicker(false);
              }}
              validRange={{ startDate: today }}
            />

            <TouchableOpacity style={styles.dateButton} onPress={() => setOpenTimePicker(true)}>
              <Text style={styles.dateButtonText}>
                {time ? `${time.hours}:${time.minutes}` : "Chọn Giờ"}
              </Text>
            </TouchableOpacity>
            <TimePickerModal
              visible={openTimePicker}
              onDismiss={() => setOpenTimePicker(false)}
              onConfirm={(params) => {
                setTime({ hours: params.hours, minutes: params.minutes });
                setOpenTimePicker(false);
              }}
              hours={time ? time.hours : today.getHours()}
              minutes={time ? time.minutes : today.getMinutes()}
            />
          </View>

          <TouchableOpacity style={styles.btn} onPress={handleBooking}>
            <Text style={styles.testpass}>Đặt dịch vụ</Text>
          </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default InputBookJob;
