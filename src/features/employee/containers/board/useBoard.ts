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
    const [allEmployees, setAllEmployees] = useState<EmployeeDisplay[]>([]); // Lưu toàn bộ danh sách nhân viên
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const normalizeString = (str: string) => {
      return str
        .normalize("NFD") // Chuyển các ký tự có dấu thành dạng tổ hợp
        .replace(/[\u0300-\u036f]/g, "") // Xóa các dấu tổ hợp
        .toLowerCase(); // Chuyển thành chữ thường
    };
  
    const fetchEmployees = async ({
      searchQuery = "",
      filterType = "1",
    }: {
      searchQuery?: string;
      filterType?: string;
    } = {}) => {
      setLoading(true);
      setError(null);
      try {
        const employeesClient = restClient.apiClient.service("/users/employees");
        const result = await employeesClient.find({
          page: 0,
          perPage: 100,
        });
  
        if (result.success) {
          const employees = result.resData.map((employee: any) => ({
            id: employee._id,
            firstName: employee.personalInfo.firstName || "",
            lastName: employee.personalInfo.lastName || "",
            phone: employee.account.phoneNumber || "",
            avatar: employee.avatar || "",
          }));
  
          setAllEmployees(employees); // Lưu toàn bộ danh sách nhân viên
          const normalizedSearchQuery = normalizeString(searchQuery);
          const filteredEmployees = employees.filter((employee: { firstName: any; lastName: any; }) => {
            const fullName = normalizeString(`${employee.firstName} ${employee.lastName}`);
            return fullName.includes(normalizedSearchQuery); // Tìm kiếm trong họ tên đầy đủ
          });
          setListEmployee(filteredEmployees); // Lọc và hiển thị danh sách tìm kiếm
        } else {
          setError(result.message || "Lỗi không xác định.");
        }
      } catch (err: any) {
        setError(err.message || "Lỗi hệ thống.");
      } finally {
        setLoading(false);
      }
    };
  
    const handleSearch = (searchQuery: string) => {
      const normalizedSearchQuery = normalizeString(searchQuery);
      const filteredEmployees = allEmployees.filter((employee) => {
        const fullName = normalizeString(`${employee.firstName} ${employee.lastName}`);
        return fullName.includes(normalizedSearchQuery); // Tìm kiếm trong họ tên đầy đủ
      });
      setListEmployee(filteredEmployees); // Hiển thị kết quả tìm kiếm
    };
  
    return {
      listEmployee,
      loading,
      error,
      fetchEmployees,
      handleSearch,
    };
  };
  
  export default useBoard;  
  
  
