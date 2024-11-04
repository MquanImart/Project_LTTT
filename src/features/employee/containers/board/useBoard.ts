import { useEffect, useState } from "react";

export interface EmployeeDisplay {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

const useBoard = () => {
    const [listEmployee, setListEmployee] = useState<EmployeeDisplay[]>([]);

    useEffect(()=> {
        setListEmployee(employees);
    },[]);

    return {
        listEmployee
    }
}

export default useBoard;

const employees: EmployeeDisplay[] = [
    { id: '1', firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
    { id: '2', firstName: 'Jane', lastName: 'Smith', phone: '098-765-4321' },
    { id: '3', firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
    { id: '4', firstName: 'Jane', lastName: 'Smith', phone: '098-765-4321' },
    { id: '5', firstName: 'Alice', lastName: 'Johnson', phone: '555-555-5555' },
    { id: '6', firstName: 'Bob', lastName: 'Brown', phone: '666-666-6666' },
    { id: '7', firstName: 'Charlie', lastName: 'Davis', phone: '777-777-7777' },
    { id: '8', firstName: 'Eve', lastName: 'Clark', phone: '888-888-8888' },
    { id: '9', firstName: 'John', lastName: 'Doe', phone: '123-456-7890' },
    { id: '10', firstName: 'Jane', lastName: 'Smith', phone: '098-765-4321' },
    { id: '11', firstName: 'Alice', lastName: 'Johnson', phone: '555-555-5555' },
    { id: '12', firstName: 'Bob', lastName: 'Brown', phone: '666-666-6666' },
    { id: '13', firstName: 'Charlie', lastName: 'Davis', phone: '777-777-7777' },
    { id: '14', firstName: 'Eve', lastName: 'Clark', phone: '888-888-8888' },
    // Thêm các nhân viên khác nếu cần
  ];