import { Employee, EmployeeStatus, Review, Service, User, UserRole } from "@/src/interface/interface";
import { useEffect, useState } from "react";

interface EmployeeDetail {
    employee: Employee;
    user: User;
    review: Review[];
    service: Service[];
}
const useDetail = () => {
    const [employee, setEmployee] = useState<EmployeeDetail | null>(null);
    const [rating, setRating] = useState<number>(0);
    useEffect(()=> {
        setEmployee({
            employee: employeeSample,
            user: userSample,
            review: reviewsSample,
            service: servicesSample
        })
        setRating(calculateAverageRating(reviewsSample));
    } ,[]);

    const calculateAverageRating = (reviews: Review[]): number => {
        if (reviews.length === 0) return 0; // Trả về 0 nếu không có đánh giá
    
        const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0); // Cộng tổng rating
        return totalRating / reviews.length; // Chia cho số lượng đánh giá
    };

    const addressHome = () => {
        return `${employee?.user.address.street} ${employee?.user.address.ward} ${employee?.user.address.district} ${employee?.user.address.province}`
    }
    return {
        employee, rating, addressHome
    }
}

export default useDetail;

const employeeSample: Employee = {
  userId: "user-001",
  jobIds: ["job-101", "job-102", "job-103"], // Danh sách các ID công việc
  status: EmployeeStatus.Active, // Trạng thái nhân viên
  createdAt: new Date("2024-01-15T10:30:00Z"), // Ngày tạo
  updatedAt: new Date("2024-11-04T12:00:00Z"), // Ngày cập nhật
  deletedAt: undefined // Hoặc có thể để lại trường này nếu cần
};

const userSample: User = {
  id: "user-001",
  account: {
    phoneNumber: "0123456789",
    password: "securepassword123",
  },
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    gender: true, // true cho nam, false cho nữ
    birthDate: new Date("1990-01-01T00:00:00Z"), // Ngày sinh
  },
  address: {
    province: "Hanoi",
    district: "Hoan Kiem",
    ward: "Hang Bac",
    street: "123 Main St",
  },
  avatar: "http://example.com/avatar.jpg", // URL đến hình ảnh đại diện
  role: UserRole.Admin, // Có thể là Admin, Employee hoặc Customer
  favoriteEmployees: ["emp-001", "emp-002"], // Danh sách ID nhân viên yêu thích
  createdAt: new Date("2024-01-01T09:00:00Z"), // Ngày tạo
  updatedAt: new Date("2024-11-04T12:00:00Z"), // Ngày cập nhật
  deletedAt: undefined, // Có thể để lại trường này nếu không bị xóa
};

const reviewsSample: Review[] = [
    {
      reviewId: "review-001",
      employeeId: "user-001",
      customerId: "customer-001",
      content: "Dịch vụ tuyệt vời! Nhân viên rất chuyên nghiệp và thân thiện.",
      rating: 5,
      createdAt: new Date("2024-01-10T08:30:00Z"),
      updatedAt: new Date("2024-01-10T09:00:00Z"),
      deletedAt: undefined, // Hoặc có thể để lại nếu đã xóa
    },
    {
      reviewId: "review-002",
      employeeId: "user-001",
      customerId: "customer-002",
      content: "Tôi không hài lòng với cách phục vụ. Có thể cải thiện.",
      rating: 2,
      createdAt: new Date("2024-02-15T10:00:00Z"),
      updatedAt: new Date("2024-02-15T11:00:00Z"),
      deletedAt: undefined,
    },
    {
      reviewId: "review-003",
      employeeId: "user-001",
      customerId: "customer-003",
      content: "Rất hài lòng với dịch vụ. Nhân viên hỗ trợ nhiệt tình!",
      rating: 4,
      createdAt: new Date("2024-03-20T14:45:00Z"),
      updatedAt: new Date("2024-03-20T15:00:00Z"),
      deletedAt: undefined,
    },
    {
      reviewId: "review-004",
      employeeId: "user-001",
      customerId: "customer-004",
      content: "Sản phẩm tốt, nhưng giao hàng chậm.",
      rating: 3,
      createdAt: new Date("2024-04-25T09:30:00Z"),
      updatedAt: new Date("2024-04-25T10:00:00Z"),
      deletedAt: undefined,
    },
    {
      reviewId: "review-005",
      employeeId: "user-001",
      customerId: "customer-005",
      content: "Tôi sẽ quay lại! Dịch vụ rất tuyệt!",
      rating: 5,
      createdAt: new Date("2024-05-05T16:00:00Z"),
      updatedAt: new Date("2024-05-05T17:00:00Z"),
      deletedAt: undefined,
    },
  ];

  const servicesSample: Service[] = [
    {
      id: "service-001",
      name: "Dịch vụ làm tóc",
      createdAt: new Date("2024-01-01T10:00:00Z"),
      updatedAt: new Date("2024-01-01T10:00:00Z"),
      deletedAt: undefined, // Hoặc có thể để lại trường này nếu đã xóa
    },
    {
      id: "service-002",
      name: "Dịch vụ mát xa",
      createdAt: new Date("2024-02-15T14:30:00Z"),
      updatedAt: new Date("2024-02-15T14:30:00Z"),
      deletedAt: undefined,
    },
    {
      id: "service-003",
      name: "Dịch vụ chăm sóc da",
      createdAt: new Date("2024-03-10T09:15:00Z"),
      updatedAt: new Date("2024-03-10T09:15:00Z"),
      deletedAt: new Date("2024-04-01T12:00:00Z"), // Trường này có thể để nếu dịch vụ đã bị xóa
    },
  ];