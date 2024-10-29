import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    return (
        <View style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("HomeTabEmployee")}}>
                <Text>Button</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Login;