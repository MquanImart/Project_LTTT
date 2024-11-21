import Header from "@/src/shared/components/header/Header";
import { View, StyleSheet } from "react-native";
import AppointmentTabs from "../components/AppointmentTabs";
import Colors from "@/src/styles/Color";
import { useState } from "react";
import CompleteAppointmentScreen from "./complete-appointment/CompleteAppointmentScreen";
import ProgressAppointmentScreen from "./progress-appointment/ProgressAppointmentScreen";
import CancelAppointmentScreen from "./cancel-appointment/CancelAppointmentScreen";

const tabs = ['Hoàn thành', 'Đang thực hiện', 'Đã hủy'];

const Appointment = () => {
    const [tab, setTab] = useState<string>(tabs[0]);

    return (
        <View style={styles.container}>
            <Header title="Đơn hàng" showBackButton={false} />
            <AppointmentTabs selectedTab={tab} setTab={setTab} />
            {tab === tabs[0] && <CompleteAppointmentScreen/>}
            {tab === tabs[1] && <ProgressAppointmentScreen/>}
            {tab === tabs[2] && <CancelAppointmentScreen/>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
  });

export default Appointment;