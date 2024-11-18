import { ScheduleOrder } from "@/src/interface/ordersInterface";

export const getYearCounts = (schedule: ScheduleOrder[]): { year: string; count: number }[] => {
  const yearCounts: Record<string, number> = {};
  schedule.forEach((order) => {
    yearCounts[order.year.toString()] = (yearCounts[order.year.toString()] || 0) + 1;
  });
  return Object.entries(yearCounts).map(([year, count]) => ({
    year,
    count,
  }));
};
export  const getMonthYearCounts = (schedule: ScheduleOrder[]): { month: string, year: string, count: number }[] => {
  // Đếm số lần xuất hiện của mỗi {month, year}
  const monthYearCounts: Record<string, number> = {};
  schedule.forEach((order) => {
    const key = `${order.month}-${order.year}`;
    monthYearCounts[key] = (monthYearCounts[key] || 0) + 1;
  });

  // Chuyển đổi thành mảng {month, year, count}
  return Object.entries(monthYearCounts).map(([key, count]) => {
    const [month, year] = key.split('-');
    return { month, year, count };
  });
};

export  const getDayMonthYearCounts = (schedule: ScheduleOrder[]): { day: string, month: string, year: string, count: number }[] => {
  // Đếm số lần xuất hiện của mỗi {day, month, year}
  const dayMonthYearCounts: Record<string, number> = {};
  schedule.forEach((order) => {
    const key = `${order.day}-${order.month}-${order.year}`;
    dayMonthYearCounts[key] = (dayMonthYearCounts[key] || 0) + 1;
  });

  // Chuyển đổi thành mảng {day, month, year, count}
  return Object.entries(dayMonthYearCounts).map(([key, count]) => {
    const [day, month, year] = key.split('-');
    return { day, month, year, count };
  });
};
export const getAllServiceCounts = (schedule: ScheduleOrder[]): { name: string; count: number }[] => {
  
  const serviceCounts: Record<string, number> = {};
  schedule.forEach((order) => {
    serviceCounts[order.name] = (serviceCounts[order.name] || 0) + 1;
  });
  
  return Object.entries(serviceCounts).map(([name, count]) => ({
    name: name as string,
    count: count as number,
  }));
};

export const getYearlyServiceCounts = (schedule: ScheduleOrder[]): { year: string; name: string; count: number }[] => {
  const serviceCounts: Record<string, number> = {};

  // Đếm tần suất xuất hiện theo year và name
  schedule.forEach((order) => {
    const key = `${order.year}-${order.name}`;
    serviceCounts[key] = (serviceCounts[key] || 0) + 1;
  });

  // Chuyển đổi thành mảng {year, name, count}
  return Object.entries(serviceCounts).map(([key, count]) => {
    const [year, name] = key.split("-");
    return {
      year,
      name,
      count,
    };
  });
};

export const getYearMonthServiceCounts = (schedule: ScheduleOrder[]): { year: string; month: string; name: string; count: number }[] => {
  const serviceCounts: Record<string, number> = {};

  // Đếm tần suất xuất hiện theo year, month và name
  schedule.forEach((order) => {
    const key = `${order.year}-${order.month}-${order.name}`;
    serviceCounts[key] = (serviceCounts[key] || 0) + 1;
  });

  // Chuyển đổi thành mảng {year, month, name, count}
  return Object.entries(serviceCounts).map(([key, count]) => {
    const [year, month, name] = key.split("-");
    return {
      year,
      month,
      name,
      count,
    };
  });
};
