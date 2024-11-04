import Colors from "@/src/styles/Color";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

interface TabDetailProp{
    tab: number;
    setTab: (value: number) => void;
}
const TabDetail = ({tab, setTab}: TabDetailProp) => {

    return (
        <View style={styles.container}>
            <Button mode="contained" onPress={() => setTab(0)}
            labelStyle={tab !== 0? { color: 'black' }: {}}
            style={[styles.boxbutton, tab === 0? styles.buttonChoose: {}]}>
              Dịch vụ
            </Button>
            <Button mode="contained" onPress={() => setTab(1)}
            labelStyle={tab === 0? { color: 'black' }: {}}
            style={[styles.boxbutton, tab === 1? styles.buttonChoose: {}]}>
              Đánh giá
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    boxbutton: {
        width: '50%',
        height: '100%',
        backgroundColor: '#fff',
        borderRadius: 0,
        borderBottomColor: Colors.mainColor1,
        borderBottomWidth: 2,
        borderStyle: 'solid',
    },
    buttonChoose: {
        backgroundColor: Colors.mainColor1,
    },
});

export default TabDetail;