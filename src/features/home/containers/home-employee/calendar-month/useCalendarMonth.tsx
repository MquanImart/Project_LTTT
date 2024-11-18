import { OrderWithService } from "@/src/interface/ordersInterface";
import restClient from "@/src/shared/services/RestClient";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { JobDay } from "../calendar-day/useCalendarDay";

type DayData  = {
    day: number;
    month: number;
    numJob: number;
  }

  interface useCalendarMonthProps {
    month: number;
    year: number;
  }
const useCalendarMonth = ({month, year} : useCalendarMonthProps) => {
    const [allOrder, setAllOrder] = useState<OrderWithService[]>([]);
    const [allJob, setAllJob] = useState<JobDay[]>([]);
    const [dataMonth, setDataMonth] = useState<DayData[]>([]);

    useEffect(()=> {    
        getAllOrderById();
    } ,[]);
    
    useEffect(()=> {
        if (allOrder.length > 0){
            getDataAllJob();
        }
    }, [allOrder]);

    useEffect(()=> {
        if (allJob.length > 0){
            const newData = createMonthData(month, year);
            setDataMonth(newData);
        }
      },[allJob, month]);

    const getAllOrderById = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const orderClient = restClient.apiClient.service("orders");
        const result = await orderClient.find({employeeId: userId})
        if (result.success){
            setAllOrder(result.resData);
        } else {
            console.log(result.message);
        }
    }

    const getDataAllJob = () => {
        const newAllJob : JobDay[] = allOrder.map((item)=> {
            const timestamp = item.order.startDate;
            const date = new Date(timestamp);
            const day = date.getDate(); // Ngày (1-31)
            const month = date.getMonth() + 1; // Tháng (0-11, cần +1 để thành 1-12)
            const year = date.getFullYear(); // Năm
            const hour = date.getHours(); // Giờ (0-23)
            const minute = date.getMinutes(); // Phút (0-59)
            const second = date.getSeconds(); // Giây (0-59)
            return {
                year,
                month,
                day,
                hour,
                minute,
                second,
                service: item.service,
                address: item.order.address
            }   
        })
        setAllJob(newAllJob);
    }

    const createMonthData = (month: number, year: number) => {
        const data: DayData[] = [];
    
        const firstDay = new Date(year, month, 1);
        const firstDayOfMonth = firstDay.getDay();
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDayOfMonth);
    
        const lastDayOfMonth = new Date(year, month + 1, 0);
        const lastDayOfWeek = lastDayOfMonth.getDay();
        const endDate = new Date(lastDayOfMonth);
        endDate.setDate(endDate.getDate() + (6 - lastDayOfWeek));
    
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          const num = allJob.reduce((count, it) => {
              return count + ((it.day === currentDate.getDate() 
                                && it.month === currentDate.getMonth() 
                                && it.year === currentDate.getFullYear()) ? 1 : 0);
          }, 0);
          
          data.push({
            day: currentDate.getDate(),
            month: currentDate.getMonth() + 1,
            numJob: num
          });
          currentDate.setDate(currentDate.getDate() + 1);
        }
    
        return data;
      };
    return {
        dataMonth
    }
}
export default useCalendarMonth;