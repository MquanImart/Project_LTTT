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
    birthDate: {
      $date: number;
    };
  }
  
  export interface User {
    _id: string;
    account: {
      phoneNumber: string;
      password: string;
    };
    personalInfo: PersonalInfo;
    address: Address;
    avatar: string;
    role: UserRole;
    favoriteEmployees: string[]; // Array of employee IDs the user likes
    createdAt: {
      $date: number;
    };
    updatedAt: {
      $date: number;
    };
    deletedAt?: {
      $date: number;
    }; // Optional field
  }
  export interface Service {
    _id: string;
    name: string;
    img: string;
    createdAt: {
      $date: number;
    };
    updatedAt: {
      $date: number;
    };
    deletedAt?: {
      $date: number;
    }; // Optional field
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
    _id: string;
    state: OrderState;
    jobId: string;
    customerId: string;
    employeeId: string;
    cancelReason?: string; // Optional field
    startDate: {
      $date: number;
    };
    updateDate?: {
      $date: number;
    }; // Optional field
    finishDate?: {
      $date: number;
    }; // Optional field
    address: string;
    phoneNumber: string;
    jobDetail: JobDetail[];
  }
  export enum EmployeeStatus {
    Active = "Active",
    OnLeave = "OnLeave"
  }
  
  export interface Employee {
    userId: string;
    jobIds: string[]; // Array of job IDs
    status: EmployeeStatus;
    rating?: Number,
    createdAt: {
      $date: number;
    };
    updatedAt: {
      $date: number;
    };
    deletedAt?: {
      $date: number;
    }; // Optional field
  }
  export interface Review {
    reviewId: string;
    employeeId: string;
    customerId: string;
    content: string;
    rating: number;
    createdAt: {
      $date: number;
    };
    updatedAt: {
      $date: number;
    };
    deletedAt?: {
      $date: number;
    }; // Optional field
  }
  export enum MessageType {
    Text = "Text",
    Image = "Img",
    Video = "Video"
  }
  
  export interface Chat {
    _id: string;
    participants: [string, string]; // Array containing two user IDs
    message: {
      type: MessageType;
      content: string;
    };
    createdAt: {
      $date: number;
    };
    senderId: string;
  }
  export interface Bill {
    _id: string;
    idOrder: string;
    jobs: JobDetail[];
    status: string; // Da thanh toan , chua thanh toans
    createAt: {
      $date: number;
    };
    idCustomer: string;
    idEmployee: String;
  }