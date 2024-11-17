import { OrderWithService } from "@/src/interface/ordersInterface";
import restClient from "@/src/shared/services/RestClient";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const enum StateOrder {
    Pending,       // 0
    InProgress,    // 1
    Completed,     // 2
    Canceled       // 3
}

const useAppointment = () => {
    const [allOrder, setAllOrder] = useState<OrderWithService[]>([]);
    const [completeAppoint, setComplelteAppoint] = useState<OrderWithService[]>([]);
    const [upcomingAppoint, setUpcomingAppoint] = useState<OrderWithService[]>([]);
    const [progressAppoint, setProgressAppoint] = useState<OrderWithService[]>([]);
    const [cancelAppoint, setCancelAppoint] = useState<OrderWithService[]>([]);

    useEffect(()=> {    
        getAllOrderById();
    } ,[]);
    
    useEffect(()=> {
        if (allOrder.length > 0){
            setComplelteAppoint(allOrder.filter((it)=> it.order.state === "Completed"))
        }
    }, [allOrder]);

    const getAllOrderById = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const role = await AsyncStorage.getItem("role");
        const orderClient = restClient.apiClient.service("orders");
        let result;
        if (role === "Admin"){
            result = await orderClient.find({})
        } else if (role === "Employee"){
            result = await orderClient.find({employeeId: userId})
        } else {
            result = await orderClient.find({customerId: userId})
        }
        if (result.success){
            setAllOrder(result.resData);
        } else {
            console.log(result.message);
        }
    }
    return {
        
    }
}

export default useAppointment;