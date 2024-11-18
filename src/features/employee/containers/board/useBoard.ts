import { useState } from "react";
import restClient from "@/src/shared/services/RestClient";

export interface EmployeeDisplay {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatar: string; // Thêm thuộc tính avatar
  }
  
  const useBoard = () => {
    const [listEmployee, setListEmployee] = useState<EmployeeDisplay[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(1);
  
    const fetchEmployees = async ({ page = 0, searchQuery = '', filterType = '1' }) => {
      setLoading(true);
      setError(null);
      try {
        const employeesClient = restClient.apiClient.service("/users/employees");
        const result = await employeesClient.find({
          page,
          perPage: 10, 
          searchQuery,
          filterType,
        });
  
        if (result.success) {
          const employees = result.resData.map((employee: any) => ({
            id: employee._id,
            firstName: employee.personalInfo.firstName || "",
            lastName: employee.personalInfo.lastName || "",
            phone: employee.account.phoneNumber || "",
            avatar: employee.avatar || "", // Lấy avatar từ API
          }));
          setListEmployee(employees);
          setTotalPages(result.totalPages); // Tổng số trang từ API
        } else {
          setError(result.message || "Lỗi không xác định.");
        }
      } catch (err: any) {
        setError(err.message || "Lỗi hệ thống.");
      } finally {
        setLoading(false);
      }
    };
  
    return {
      listEmployee,
      loading,
      error,
      fetchEmployees,
      totalPages,
    };
  };
  
  export default useBoard;
  
