import Header from "@/src/shared/components/header/Header";
import { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Button, List, Provider, Searchbar } from "react-native-paper";
import styles, { pickerSelectStyles } from "./stylesBoard";
import RNPickerSelect from 'react-native-picker-select';
import useBoard, { EmployeeDisplay } from "./useBoard";
import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ManageEmployeeStackParamList } from "@/src/shared/routes/ManageEmployeeNav";

type DetailEmployeeNavigationProp = NativeStackNavigationProp<ManageEmployeeStackParamList, 'Employee'>;

const filterOptions = [
    { label: 'A->Z', value: '1' },
    { label: 'Z->A', value: '2' },
    { label: 'Ngày tạo', value: '3' },
  ];
const ITEMS_PER_PAGE = 3;

const BoardEmployee = () => {
    const navigation = useNavigation<DetailEmployeeNavigationProp>();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('1');

    const {listEmployee} = useBoard();
    const [currentPage, setCurrentPage] = useState(0);
    const totalPages = Math.ceil(listEmployee.length / ITEMS_PER_PAGE);

    const currentEmployees = listEmployee.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
      );

    const handlePress = (employee: EmployeeDisplay) => {
        navigation.navigate("Details");
      };

    if (currentEmployees.length <= 0) {return <></>}
    return (
        <Provider>
            <Header title={"Quản lý nhân viên"} onBackPress={()=> {}}/>
            <View style={styles.boxTitle}>
                <Text style={styles.textTitle}>Nhân viên</Text>
                <Button 
                style={styles.buttonTitle}
                icon="account-plus" mode="contained" onPress={() => console.log('Pressed')}>
                  Tạo tài khoản
                </Button>
            </View>
            <View style={styles.boxTitle}>
                <Searchbar
                  placeholder="Search"
                  onChangeText={setSearchQuery}
                  value={searchQuery}
                  style={{ backgroundColor: 'white', minWidth: '60%' }}
                  inputStyle={{ color: 'black' }}
                />
                <RNPickerSelect
                  onValueChange={(value) => setFilterType(value)}
                  items={filterOptions}
                  value={filterType}
                  style={pickerSelectStyles}
                />
            </View>
            <View style={{ minHeight: 300, width: '100%', padding: 10 }}>
            <FlatList
              data={currentEmployees}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <List.Item
                  title={`${item.firstName} ${item.lastName}`}
                  description={item.phone}
                  onPress={() => handlePress(item)}
                  style={styles.item}
                  titleStyle={styles.title}
                  descriptionStyle={styles.description}
                  left={(props) => <List.Icon {...props} icon="account" />} // Thêm icon ở bên trái
                />
              )}
            />
            </View>
            <View style={styles.pagination}>
              <Button
                mode="contained"
                onPress={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
                style={styles.button}
              >
                Previous
              </Button>
              <Text style={styles.pageNumber}>
                Page {currentPage + 1} of {totalPages}
              </Text>
              <Button
                mode="contained"
                onPress={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
                style={styles.button}
              >
                Next
              </Button>
            </View>
        </Provider>
    )
}

export default BoardEmployee;