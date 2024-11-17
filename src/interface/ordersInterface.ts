import { Order, Service } from "./interface";

export interface ScheduleOrder{ 
    day: string;
    month: string;
    year: string;
    count: number;
}
export interface ServiceOrder{ 
  id: string;
  name: string;
  count: number;
}

export interface OrderWithService {
  order: Order;
  service: Service;
}