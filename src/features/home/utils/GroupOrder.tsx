import { ScheduleOrder } from "@/src/interface/ordersInterface";

export type OrderCount = {
    day: string;
    month: string;
    year: string;
    count: number;
}
export function getOrderCountsByDate(orders: ScheduleOrder[]) {
  const counts: OrderCount[] = [];

  orders.forEach((order) => {
    const date = new Date(order.startDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    const existing = counts.find((item) => item.day === day && item.month === month && item.year === year);
    
    if (existing) {
      existing.count += 1;
    } else {
      counts.push({ day, month, year, count: 1 });
    }
    
    counts.sort((a, b) => {
      if (a.year !== b.year) return a.year.localeCompare(b.year);
      if (a.month !== b.month) return a.month.localeCompare(b.month);
      return a.day.localeCompare(b.day);
    });
  });

  return counts;
}