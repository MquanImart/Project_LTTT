import { OrderWithService, ScheduleOrder } from "@/src/interface/ordersInterface";
import { useEffect, useState } from "react";
import { getRandomColor } from "../../utils/ColorRandom";
import restClient from "@/src/shared/services/RestClient";
import Toast from "react-native-toast-message";
import { getAllServiceCounts, getDayMonthYearCounts, getMonthYearCounts, getYearCounts, getYearlyServiceCounts, getYearMonthServiceCounts } from "../../utils/CreateDataChart";

export interface DropDown{
    label: string;
    value: string;
}
export type DataChart = {
    label: string;
    value: number;
    frontColor?: string;
    color?: string;
}
const optionMonth:DropDown[] = [
    {label: 'Tất cả', value: 'all'},
    {label: 'Tháng 1', value: '1'},
    {label: 'Tháng 2', value: '2'},
    {label: 'Tháng 3', value: '3'},
    {label: 'Tháng 4', value: '4'},
    {label: 'Tháng 5', value: '5'},
    {label: 'Tháng 6', value: '6'},
    {label: 'Tháng 7', value: '7'},
    {label: 'Tháng 8', value: '8'},
    {label: 'Tháng 9', value: '9'},
    {label: 'Tháng 10', value: '10'},
    {label: 'Tháng 11', value: '11'},
    {label: 'Tháng 12', value: '12'},
];

const useHomeAdmin = () => {
    const [allOrder, setAllOrder] = useState<OrderWithService[] | null>(null);
    const [allSchedule, setAllSchedule] = useState<ScheduleOrder[] | null>(null);
    const [optionYear, setOptionYear] = useState<DropDown[]>([{label: 'Tất cả', value: 'all'}]);

    const [sortByMonth, setSortByMonth] = useState<string>(optionMonth[0].value);
    const [sortByYear, setSortByYear] = useState<string>(optionYear[0].value);
    const [sortByMonthSer, setSortByMonthSer] = useState<string>(optionMonth[0].value);
    const [sortByYearSer, setSortByYearSer] = useState<string>(optionYear[0].value);

    const [dataOrder, setDataOrder] = useState<DataChart[] | null>(null);
    const [dataService, setDataService] = useState<DataChart[] | null>(null);
    
    useEffect(()=> {
        getDataAllOrder();
    }, []);

    useEffect(()=> {
        if (allOrder !== null){
            setAllSchedule(allOrder.map((item)=> {
                const timestamp = item.order.startDate;
                const date = new Date(timestamp);
                const day = date.getDate(); // Ngày (1-31)
                const month = date.getMonth() + 1; // Tháng (0-11, cần +1 để thành 1-12)
                const year = date.getFullYear(); // Năm
                return{
                    idOrder: item.order._id,
                    day: day,
                    month: month,
                    year: year,
                    idServie: item.service._id,
                    name: item.service.name
                }
            }))
        }
    }, [allOrder]);

    useEffect(()=> {
        if (allSchedule !== null){
            const allYear = getYearCounts(allSchedule);
            setOptionYear([
              ...optionYear,
              ...allYear.map((item) => ({
                label: item.year.toString(),
                value: item.year.toString(),
              }))
            ]);

            getDataOrderChart();
            getDataServiceChart()
        }
    } ,[allSchedule]);

    useEffect(()=> {
        getDataOrderChart();
    }, [sortByMonth, sortByYear]);
        
    useEffect(()=> {
        getDataServiceChart();
    }, [sortByMonthSer, sortByYearSer]);

    const getDataOrderChart = () => {
        if (allSchedule !== null){
            if (sortByYear === 'all'){
                const allYear = getYearCounts(allSchedule);
                setDataOrder(allYear.map((item)=> ({
                    label: item.year.toString(),
                    value: item.count,
                    frontColor: getRandomColor()
                })))
            }
            else {
                if (sortByMonth === 'all'){
                    const allYear = getMonthYearCounts(allSchedule);
                    const allMonth = allYear.filter((item) => item.year === sortByYear)
                    setDataOrder(allMonth.map((item)=> ({
                        label: item.month.toString(),
                        value: item.count,
                        frontColor: getRandomColor()
                    })))
                } else {
                    const allYear = getDayMonthYearCounts(allSchedule);
                    const allDay = allYear.filter((item) => item.year === sortByYear && item.month === sortByMonth)
                    setDataOrder(allDay.map((item)=> ({
                        label: item.day.toString(),
                        value: item.count,
                        frontColor: getRandomColor()
                    })))
                }
            }
        }
    }
    const getDataServiceChart = () => {
        if (allSchedule !== null){
            if (sortByMonthSer === 'all'){
                const allService = getAllServiceCounts(allSchedule);
                setDataService(allService.map((item)=> ({
                    label: item.name,
                    value: item.count,
                    color: getRandomColor()
                })))
            }
            else {
                if (sortByMonthSer === 'all'){
                    const allService = getYearlyServiceCounts(allSchedule);
                    const allServiceYear = allService.filter((item) => item.year === sortByYearSer)
                    setDataService(allServiceYear.map((item)=> ({
                        label: item.name,
                        value: item.count,
                        color: getRandomColor()
                    })))
                } else {
                    const allService = getYearMonthServiceCounts(allSchedule);
                    const allServiceMonth = allService.filter((item) => item.year === sortByYearSer && item.month === sortByMonthSer)

                    setDataService(allServiceMonth.map((item)=> ({
                        label: item.name,
                        value: item.count,
                        color: getRandomColor()
                    })))
                }
            }
        }
    }
    const getDataAllOrder = async () => {
        const orderClient = restClient.apiClient.service("orders");
        const result = await orderClient.find({});
        if (result.success){
            setAllOrder(result.resData);
        } else {
            Toast.show({
                type: "error",
                text1: "Lấy dữ liệu thất bại",
                text2: "Vui lòng thử lại sau.",
              });
        }
    }

    return {
        sortByMonth, setSortByMonth, sortByYear, setSortByYear,
        sortByMonthSer, setSortByMonthSer, sortByYearSer, setSortByYearSer,
        optionMonth, optionYear, dataOrder, dataService, allSchedule

    }
}
  
export default useHomeAdmin;