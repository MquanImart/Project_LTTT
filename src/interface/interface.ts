export enum UserRole {
    Admin = "Admin",
    Employee = "Employee",
    Customer = "Customer"
  }
  
  export interface Address {
    province: string;
    district: string;
    ward: string;
    street: string;
  }
  
  export interface PersonalInfo {
    firstName: string;
    lastName: string;
    gender: boolean;
    birthDate: Date;
  }
  
  export interface User {
    id: string;
    account: {
      phoneNumber: string;
      password: string;
    };
    personalInfo: PersonalInfo;
    address: Address;
    avatar: string;
    role: UserRole;
    favoriteEmployees: string[]; // Array of employee IDs the user likes
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; // Optional field
  }
  export interface Service {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; // Optional field
  }
  export enum OrderState {
    Pending = "Pending",
    InProgress = "InProgress",
    Completed = "Completed",
    Canceled = "Canceled"
  }
  
  export interface JobDetail {
    jobName: string;
    price: number;
  }
  
  export interface Order {
    id: string;
    state: OrderState;
    jobId: string;
    customerId: string;
    employeeId: string;
    cancelReason?: string; // Optional field
    startDate: Date;
    updateDate?: Date; // Optional field
    finishDate?: Date; // Optional field
    address: string;
    phoneNumber: string;
    jobDetail: JobDetail;
  }
  export enum EmployeeStatus {
    Active = "Active",
    OnLeave = "OnLeave"
  }
  
  export interface Employee {
    userId: string;
    jobIds: string[]; // Array of job IDs
    status: EmployeeStatus;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; // Optional field
  }
  export interface Review {
    reviewId: string;
    employeeId: string;
    customerId: string;
    content: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date; // Optional field
  }
  export enum MessageType {
    Text = "text",
    Image = "img",
    Video = "video"
  }
  
  export interface Chat {
    id: string;
    participants: [string, string]; // Array containing two user IDs
    message: {
      type: MessageType;
      content: string;
    };
    createdAt: Date;
    senderId: string;
  }
  export interface Bill {
    id: string;
    jobs: JobDetail[];
    status: string;
    createAt: Date;
    idCustomer: string;
    idEmployee: String;
    payment: string;
  }