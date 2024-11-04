import { Order, OrderState, User, UserRole } from "@/src/interface/interface";
import { useEffect, useState } from "react";

export type Bill = {
  id: number;
  name: string;
  price: number;
}

const useDetailService = () => {
    const [order, setOrder] = useState<Order|null>(null);
    const [employee, setEmployee] = useState<User|null>(null);
    const [customer, setCustomer] = useState<User|null>(null);
    const [jobs, setJobs] = useState<Bill[]>([]);

    useEffect(()=> {
        setOrder(sampleOrder);
        setEmployee(sampleUser);
        setCustomer(sampleCustomer);
    }, []);

    return {
        order, employee, customer,
        jobs, setJobs
    }
}
export default useDetailService;

const sampleOrder: Order = {
    id: "order_123456",
    state: OrderState.Pending,
    jobId: "job_789012",
    customerId: "customer_345678",
    employeeId: "employee_901234",
    startDate: new Date("2024-11-01T10:00:00Z"),
    updateDate: new Date("2024-11-02T12:00:00Z"),
    address: "123 Main St, Cityville, Country",
    phoneNumber: "0123456789",
    jobDetail: {
      jobName: "Replace 12W bulb",
      price: 15.99
    }
  };
  const sampleUser: User = {
    id: "employee_901234",
    account: {
      phoneNumber: "0123456789",
      password: "securePassword123"
    },
    personalInfo: {
      firstName: "John",
      lastName: "Doe",
      gender: true, // true for male, false for female
      birthDate: new Date("1990-05-15")
    },
    address: {
      province: "California",
      district: "Los Angeles",
      ward: "Downtown",
      street: "456 Elm St"
    },
    avatar: "https://example.com/avatar.jpg",
    role: UserRole.Employee,
    favoriteEmployees: [],
    createdAt: new Date("2024-01-01T09:00:00Z"),
    updatedAt: new Date("2024-01-15T09:00:00Z"),
  };
  
  const sampleCustomer: User = {
    id: "customer_345678", // ID khách hàng
    account: {
      phoneNumber: "0987654321",
      password: "customerPassword456"
    },
    personalInfo: {
      firstName: "Jane",
      lastName: "Smith",
      gender: false, // false for female
      birthDate: new Date("1992-08-20")
    },
    address: {
      province: "New York",
      district: "Manhattan",
      ward: "Upper East Side",
      street: "789 Oak St"
    },
    avatar: "https://example.com/avatar_customer.jpg",
    role: UserRole.Customer, // Vai trò là khách hàng
    favoriteEmployees: ["employee_901234"], // Danh sách nhân viên yêu thích
    createdAt: new Date("2024-02-01T09:00:00Z"),
    updatedAt: new Date("2024-02-15T09:00:00Z"),
  };
  