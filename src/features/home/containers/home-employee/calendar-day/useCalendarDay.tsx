import { Service } from "@/src/interface/interface";
import { OrderWithService } from "@/src/interface/ordersInterface";
import restClient from "@/src/shared/services/RestClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type JobDay = {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
    service: Service;
    address: string;
}

const useCalendarDay = async () => {
    const [allOrder, setAllOrder] = useState<OrderWithService[]>([]);
    const userId = await AsyncStorage.getItem("userId");
    const [allJob, setAllJob] = useState<JobDay[]>();

    useEffect(()=> {    
        getAllOrderById();
    } ,[]);

    useEffect(()=> {
        if (allOrder.length > 0){
            getDataAllJob();
        }
    }, [allOrder]);
    
    const getAllOrderById = async () => {
        const orderClient = restClient.apiClient.service("orders");
        const result = await orderClient.find({employeeId: userId})
        if (result.success){
            setAllOrder(result.data);
        } else {
            console.log(result.message);
        }
    }

    const getDataAllJob = () => {
        const newAllJob : JobDay[] = allOrder.map((item)=> {
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
    }
    return {
        allOrder, allJob
    }
}

export default useCalendarDay;