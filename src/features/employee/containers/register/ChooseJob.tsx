import { View, Text, FlatList, TouchableOpacity } from "react-native";
import Styles from "./Styles";
import { Service } from "@/src/interface/interface";
import { useEffect, useState } from "react";
import restClient from "@/src/shared/services/RestClient";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ManageEmployeeStackParamList } from "@/src/shared/routes/ManageEmployeeNav";
import Toast from "react-native-toast-message";
import { EmployeeStatus } from "@/src/interface/interface";

type DetailEmployeeNavigationProp = NativeStackNavigationProp<ManageEmployeeStackParamList, 'Employee'>;

const ChooseJob = () => {
    const navigation = useNavigation<DetailEmployeeNavigationProp>();
    const [services, setServices] = useState<Service[]>([]);
    const [choose, setChoose] = useState<Service[]>([]);
    const route = useRoute();
    const { userId } = route.params as { userId: string };

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        const serviceClient = restClient.apiClient.service("services");
        const result = await serviceClient.find({});
        if (result.success) {
            setServices(result.resData);
        }
    };

    const handlePress = (index: number) => {
        const selectedService = services[index];
        const isChosen = choose.findIndex((item) => item._id === selectedService._id);

        if (isChosen === -1) {
            setChoose((prev) => [...prev, selectedService]);
        } else {
            setChoose((prev) => prev.filter((item) => item._id !== selectedService._id));
        }
    };

    const isChoose = (index: number) => {
        const selectedService = services[index];
        return choose.some((item) => item._id === selectedService._id);
    };

    const handleSubmit = async () => {
        const jobIds = choose.map((item) => item._id);

        if (jobIds.length === 0) {
            Toast.show({
                type: "info",
                text1: "Thông báo",
                text2: "Bạn chưa chọn công việc nào.",
            });
            return;
        }

        try {
            const employeeClient = restClient.apiClient.service("/employees");
            const result = await employeeClient.create({
                userId,
                jobIds,
                status: EmployeeStatus.Active,
            });

            if (result.success) {
                Toast.show({
                    type: "success",
                    text1: "Thành công",
                    text2: "Nhân viên được tạo thành công.",
                });
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Employee' }],
                });
            } else {
                Toast.show({
                    type: "error",
                    text1: "Thất bại",
                    text2: result.message || "Tạo nhân viên không thành công.",
                });
            }
        } catch (error) {
            Toast.show({
                type: "error",
                text1: "Lỗi",
                text2: "Không thể tạo nhân viên. Vui lòng thử lại sau.",
            });
        }
    };

    return (
        <View style={Styles.container}>
            <Text style={Styles.texttitle}>Chọn công việc</Text>
            <FlatList
                data={services}
                keyExtractor={(item) => item._id}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        style={[Styles.item, isChoose(index) && Styles.chooseItem]}
                        onPress={() => handlePress(index)}
                    >
                        <Text style={[Styles.itemText, isChoose(index) && Styles.itemTextChosen]}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                contentContainerStyle={Styles.listContainer}
                initialNumToRender={10}
            />
            <TouchableOpacity style={Styles.submitButton} onPress={handleSubmit}>
                <Text style={Styles.submitButtonText}>Xác nhận</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ChooseJob;
