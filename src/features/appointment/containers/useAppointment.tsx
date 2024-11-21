import { OrderWithService } from "@/src/interface/ordersInterface";
import restClient from "@/src/shared/services/RestClient";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const useAppointment = () => {
    const [role, setRole] = useState<string | null>(null);
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
            setComplelteAppoint(allOrder.filter((it)=> it.order.state === "Completed"));
            setProgressAppoint(allOrder.filter((it)=> it.order.state === "InProgress"))
            setCancelAppoint(allOrder.filter((it)=> it.order.state === "Canceled"))
        }
    }, [allOrder]);

    const getAllOrderById = async () => {
        const userId = await AsyncStorage.getItem("userId");
        const role = await AsyncStorage.getItem("role");
        setRole(role);
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

        }
    }
    return {
        role,
        completeAppoint, upcomingAppoint, progressAppoint, cancelAppoint,
        setComplelteAppoint, setUpcomingAppoint, setProgressAppoint, setCancelAppoint
    }
}

export default useAppointment;