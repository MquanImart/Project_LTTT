import { Service } from "@/src/interface/interface";
import { OrderWithService } from "@/src/interface/ordersInterface";
import restClient from "@/src/shared/services/RestClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export type JobDay = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    service: Service;
    address: string;
}

interface useCalendarDayProps{
    year: number;
    month: number;
    day: number;
}
const useCalendarDay = ({year, month, day} : useCalendarDayProps) => {
    const [allOrder, setAllOrder] = useState<OrderWithService[]>([]);
    const [allJob, setAllJob] = useState<JobDay[]>([]);
    const [filterAllJob, setFillterAllJob] = useState<JobDay[]>([]);
    useEffect(()=> {    
        getAllOrderById();
    } ,[]);

    useEffect(()=> {
        if (allOrder.length > 0){
            getDataAllJob();
        }
    }, [allOrder, day]);
    
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
        console.log('all order', allOrder)
        const newAllJob : JobDay[] = allOrder.map((item)=> {
            console.log('date', item.order.startDate.$date)
            const timestamp = item.order.startDate.$date;
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
        setFillterAllJob(newAllJob.filter((it)=> it.day === day));
    }
    return {
        allOrder, allJob, filterAllJob
    }
}

export default useCalendarDay;