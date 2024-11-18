import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type Dropdown = {
    label: string;
    value: string;
}
interface DropdownProps{
    data: Dropdown[];
    setValue: (value: string) => void;
}
export default function Dropdown({data, setValue} : DropdownProps) {
  const [items, setItems] = useState<Dropdown[]>(data);
  const [open, setOpen] = useState(false);
  const [currValue, setCurrValue] = useState(items[0].value);
  
  const handleChange = (value: any) => {
    setCurrValue(value as string);
    setValue(value as string);
  }

  return (
    <View style={styles.container}>
      <DropDownPicker<string>
        open={open}
        value={currValue}
        items={items}
        setOpen={setOpen}
        setValue={handleChange}
        setItems={setItems}
        placeholder="Chọn một mục"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  dropdown: {
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownContainer: {
    borderColor: '#ccc',
  },
  selected: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
