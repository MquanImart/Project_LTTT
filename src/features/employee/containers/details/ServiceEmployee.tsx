import { Service } from "@/src/interface/interface";
import { FlatList, View } from "react-native";
import { List } from "react-native-paper";
import styles from "./styleDetail";
import { ScrollView } from "react-native-gesture-handler";

interface ServiceEmployeeProps{
    services: Service[];
}
const ServiceEmployee = ({services}: ServiceEmployeeProps) => {

    return (
        <View>
            <ScrollView>
            {services.map((service)=> (
                <List.Item
                    key={service.id}
                  title={service.name}
                  style={styles.item}
                  titleStyle={styles.title}
                />
            ))}
            </ScrollView>
        </View>
    )
}

export default ServiceEmployee;