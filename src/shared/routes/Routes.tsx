import Main from '@/src/main';
import Main1 from '@/src/Main1';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function HomeNavigation() {
  return (
      <Tab.Navigator initialRouteName="Trang Chủ" 
      >
        <Tab.Screen name="Trang Chủ" component={Main} />
        <Tab.Screen name="Chấm công" component={Main1} />
      </Tab.Navigator>
  );
}
