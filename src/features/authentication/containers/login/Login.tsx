import { RootStackParamList } from "@/src/shared/routes/LoginNavigation";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "@/src/styles/Color";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const Login = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    return (
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>Button</TouchableOpacity>
        </View>
    )
}
export default Login;