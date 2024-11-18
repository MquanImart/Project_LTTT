import { Employee, Order, Service, User } from "./interface";

export interface ScheduleOrder{ 
  idOrder: string;
  day: number;
  month: number;
  year: number;
  idServie: string;
  name: string;
}

export interface OrderWithService {
  order: Order;
  service: Service;
  employee: User;
  customer: User;
  employeeM: Employee;
}
