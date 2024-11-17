import { View, Image, Text } from "react-native";
import Styles from "./Styles";
import { Service } from "@/src/interface/interface";
import { useEffect, useState } from "react";
import { Button, List } from "react-native-paper";
import restClient from "@/src/shared/services/RestClient";

const ChooseJob = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [choose, setChoose] = useState<Service[]>([]);
  
    useEffect(()=> {
        getServices();
    }, []);

    const getServices = async () => {
        const serviceClient = restClient.apiClient.service("services");
        const result = await serviceClient.find({});
        if (result.success){
            setServices(result.resData);
        }
    }
    const handlePress = (index: number) => {
      const selectedService = services[index];
      const isChosen = choose.findIndex((item) => item._id === selectedService._id);
    
      if (isChosen === -1) {
        // Nếu chưa tồn tại, thêm vào choose
        setChoose((prev) => [...prev, selectedService]);
      } else {
        // Nếu đã tồn tại, xóa khỏi choose
        setChoose((prev) => prev.filter((item) => item._id !== selectedService._id));
      }
    };

    const isChoose = (index: number) => {
        const selectedService = services[index];
        const isChosen = choose.findIndex((item) => item._id === selectedService._id);
        console.log(selectedService);
        console.log(isChosen);
        if (isChosen === -1) return false;
        else return true;
    }
    return (
        <View style={Styles.container}>
            <Image
                source={require("../../../../assets/images/login.png")}
                style={{ width: 150, height: 150, marginBottom: 20, alignContent: "center" }}
            />
            <Text style={Styles.texttitle}>Chọn công việc</Text>
            {services.map((service, index) => (
              <List.Item
                style={isChoose(index)?Styles.chooseItem: {}}
                key={service._id}
                title={service.name}
                onPress={() => handlePress(index)}
              />
            ))}
            
        </View>
    )
}

export default ChooseJob;