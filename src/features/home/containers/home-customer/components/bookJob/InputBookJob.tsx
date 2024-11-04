import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates';
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
import styles from './Styles';

interface InputBookJobProps {
    jobName: string;
    onSubmit: () => void;
}

const InputBookJob: React.FC<InputBookJobProps> = ({ jobName, onSubmit }) => {
    const [date, setDate] = useState<CalendarDate>(undefined);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [time, setTime] = useState<{ hours: number; minutes: number } | undefined>(undefined);
    const [openTimePicker, setOpenTimePicker] = useState(false);
    const [address, setAddress] = useState({
        city: '',
        district: '',
        ward: '',
        street: '',
    });
    const [phone, setPhone] = useState('');

    const today = new Date();

    // Hàm xử lý xác nhận ngày
    const onConfirmDate = (params: CalendarDate) => {
        setOpenDatePicker(false);
        setDate(params);
    };

    // Hàm xử lý xác nhận giờ
    const onConfirmTime = (selectedTime: { hours: number; minutes: number }) => {
        setOpenTimePicker(false);
        setTime(selectedTime);
    };

    const validateFields = () => {
        if (!address.city || !address.district || !address.ward || !address.street) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ địa chỉ.');
            return false;
        }
        if (!phone) {
            Alert.alert('Thông báo', 'Vui lòng nhập số điện thoại.');
            return false;
        }
        if (!date) {
            Alert.alert('Thông báo', 'Vui lòng chọn ngày.');
            return false;
        }
        if (!time) {
            Alert.alert('Thông báo', 'Vui lòng chọn giờ.');
            return false;
        }
        return true;
    };

    const handleBooking = () => {
        if (validateFields()) {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn đặt dịch vụ?',
                [
                    { text: 'Hủy', style: 'cancel' },
                    { text: 'Xác nhận', onPress: onSubmit },
                ]
            );
        }
    };

    return (
        <View style={styles.body}>
            <Text style={styles.jobTitle}>Dịch vụ: {jobName}</Text>

            <Text style={styles.label}>Địa chỉ:</Text>
            <View style={styles.addressContainer}>
                <TextInput
                    placeholder="Tỉnh/TP"
                    style={styles.addressInput}
                    value={address.city}
                    onChangeText={(text) => setAddress({ ...address, city: text })}
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
                    placeholder="Số nhà"
                    style={styles.addressInput}
                    value={address.street}
                    onChangeText={(text) => setAddress({ ...address, street: text })}
                />
            </View>

            <Text style={styles.label}>Số điện thoại:</Text>
            <TextInput
                placeholder="Số điện thoại"
                keyboardType="phone-pad"
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
            />

            <Text style={styles.label}>Thời gian:</Text>
            <View style={styles.timeContainer}>
                <Button mode="contained" onPress={() => setOpenDatePicker(true)}>
                    Chọn Ngày: {date ? new Date(date).toLocaleDateString('vi-VN') : 'Chưa chọn'}
                </Button>
                <DatePickerModal
                    locale="vi"
                    mode="single"
                    visible={openDatePicker}
                    onDismiss={() => setOpenDatePicker(false)}
                    date={date}
                    onConfirm={(params) => onConfirmDate(params.date)}
                    validRange={{ startDate: today }}
                />

                <Button mode="contained" onPress={() => setOpenTimePicker(true)}>
                    Chọn Giờ: {time ? `${time.hours}:${time.minutes}` : 'Chưa chọn'}
                </Button>
                <TimePickerModal
                    visible={openTimePicker}
                    onDismiss={() => setOpenTimePicker(false)}
                    onConfirm={onConfirmTime}
                    hours={time ? time.hours : 0}
                    minutes={time ? time.minutes : 0}
                />
            </View>

            <Text style={styles.label}>Ghi chú:</Text>
            <TextInput
                placeholder="Ghi chú"
                multiline
                style={styles.noteInput}
            />
            <View style={styles.conteainerpass}>
                <TouchableOpacity
                    style={styles.btn}
                    onPress={handleBooking}
                >
                    <Text style={styles.testpass}>Đặt dịch vụ</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default InputBookJob;
