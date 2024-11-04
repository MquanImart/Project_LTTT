import { ScheduleOrder, ServiceOrder } from "@/src/interface/ordersInterface";
import { useEffect, useState } from "react";
import { getRandomColor } from "../../utils/ColorRandom";

interface DropDown{
    label: string;
    value: string;
}
type DataChart = {
    label: string;
    value: number;
    frontColor: string;
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
const optionYear:DropDown[] = [
    {label: 'Tất cả', value: 'all'},
    {label: '2024', value: '2024'},
    {label: '2023', value: '2023'},
    {label: '2022', value: '2022'},
    {label: '2021', value: '2021'},
    {label: '2020', value: '2020'},
    {label: '2019', value: '2019'},
    {label: '2018', value: '2018'},
    {label: '2017', value: '2017'},
];
const useHomeAdmin = () => {

    const [sortByMonth, setSortByMonth] = useState<string | null>(null);
    const [sortByYear, setSortByYear] = useState<string | null>(null);
    const [sortByMonthSer, setSortByMonthSer] = useState<string | null>(null);
    const [sortByYearSer, setSortByYearSer] = useState<string | null>(null);

    const[dataOrder, setDataOrder] = useState<DataChart[]>([]);
    const[dataService, setDataService] = useState<DataChart[]>([]);
    useEffect(()=> {
        if (sortByMonth === null || sortByMonth === 'all'){
            if (sortByYear === null || sortByYear === 'all'){
                setDataOrder(dataYear.map((data)=> ({
                    label: data.year,
                    value: data.count,
                    frontColor: getRandomColor()
                })));
            } else{
                setDataOrder(dataMonth.map((data)=> ({
                    label: `T${data.month}`,
                    value: data.count,
                    frontColor: getRandomColor()
                })));
            }
        }
        else if (sortByYear !== null || sortByYear === 'all'){
            setDataOrder(dataDay.map((data)=> ({
                label: data.day,
                value: data.count,
                frontColor: getRandomColor()
            })));
        }

    }, [sortByMonth, sortByYear]);

    useEffect(()=> {
        if (sortByMonthSer === null || sortByMonthSer === 'all'){
            if (sortByYearSer === null || sortByYearSer === 'all'){
                setDataService(dataServiceAll.map((data)=> ({
                    label: data.name,
                    value: data.count,
                    frontColor: getRandomColor()
                })));
            } else{
                setDataService(dataServiceYear.map((data)=> ({
                    label: data.name,
                    value: data.count,
                    frontColor: getRandomColor()
                })));
            }
        }
        else if (sortByYearSer !== null || sortByYearSer === 'all'){
            setDataService(dataServiceMonth.map((data)=> ({
                label: data.name,
                value: data.count,
                frontColor: getRandomColor()
            })));
        }

    }, [sortByMonthSer, sortByYearSer]);

    return {
        sortByMonth, setSortByMonth, sortByYear, setSortByYear,
        sortByMonthSer, setSortByMonthSer, sortByYearSer, setSortByYearSer,
        optionMonth, optionYear, dataOrder, dataService,

    }
}
  
export default useHomeAdmin;

const dataDay : ScheduleOrder[] = [
    {day: '1', month: '11', year: '2024', count: 3},
    {day: '2', month: '11', year: '2024', count: 6},
    {day: '3', month: '11', year: '2024', count: 2},
    {day: '4', month: '11', year: '2024', count: 3},
    {day: '5', month: '11', year: '2024', count: 6},
    {day: '6', month: '11', year: '2024', count: 2},
    {day: '7', month: '11', year: '2024', count: 12},
    {day: '8', month: '11', year: '2024', count: 0},
    {day: '9', month: '11', year: '2024', count: 0},
    {day: '10', month: '11', year: '2024', count: 0},
    {day: '11', month: '11', year: '2024', count: 3},
    {day: '12', month: '11', year: '2024', count: 6},
    {day: '13', month: '11', year: '2024', count: 2},
    {day: '14', month: '11', year: '2024', count: 3},
    {day: '15', month: '11', year: '2024', count: 6},
    {day: '16', month: '11', year: '2024', count: 2},
    {day: '17', month: '11', year: '2024', count: 12},
    {day: '18', month: '11', year: '2024', count: 0},
    {day: '19', month: '11', year: '2024', count: 0},
    {day: '20', month: '11', year: '2024', count: 0},
    {day: '21', month: '11', year: '2024', count: 0},
    {day: '22', month: '11', year: '2024', count: 3},
    {day: '23', month: '11', year: '2024', count: 2},
    {day: '24', month: '11', year: '2024', count: 3},
    {day: '25', month: '11', year: '2024', count: 6},
    {day: '26', month: '11', year: '2024', count: 2},
    {day: '27', month: '11', year: '2024', count: 12},
    {day: '28', month: '11', year: '2024', count: 0},
    {day: '29', month: '11', year: '2024', count: 0},
    {day: '30', month: '11', year: '2024', count: 0},
]

const dataMonth : ScheduleOrder[] = [
    {day: '', month: '1', year: '2024', count: 37},
    {day: '', month: '2', year: '2024', count: 63},
    {day: '', month: '3', year: '2024', count: 62},
    {day: '', month: '4', year: '2024', count: 84},
    {day: '', month: '5', year: '2024', count: 37},
    {day: '', month: '6', year: '2024', count: 16},
    {day: '', month: '7', year: '2024', count: 65},
    {day: '', month: '8', year: '2024', count: 24},
    {day: '', month: '9', year: '2024', count: 72},
    {day: '', month: '10', year: '2024', count: 42},
    {day: '', month: '11', year: '2024', count: 74},
    {day: '', month: '12', year: '2024', count: 46},
]

const dataYear : ScheduleOrder[] = [
    {day: '', month: '', year: '2017', count: 37},
    {day: '', month: '', year: '2018', count: 63},
    {day: '', month: '', year: '2019', count: 62},
    {day: '', month: '', year: '2020', count: 84},
    {day: '', month: '', year: '2021', count: 37},
    {day: '', month: '', year: '2022', count: 16},
    {day: '', month: '', year: '2023', count: 65},
    {day: '', month: '', year: '2024', count: 65},
]

const dataServiceMonth : ServiceOrder[] = [
    {  id: '1', name: 'Hệ thống điện', count: 12},
    {  id: '2', name: 'Hệ thống nước', count: 32},
    {  id: '3', name: 'Thiết bị điện tử', count: 51},
    {  id: '4', name: 'Lắp đặt camera', count: 32},
    {  id: '5', name: 'Vận chuyển', count: 42},
]

const dataServiceYear: ServiceOrder[] = [
    {  id: '1', name: 'Hệ thống điện', count: 127},
    {  id: '2', name: 'Hệ thống nước', count: 322},
    {  id: '3', name: 'Thiết bị điện tử', count: 571},
    {  id: '4', name: 'Lắp đặt camera', count: 732},
    {  id: '5', name: 'Vận chuyển', count: 422},
]

const dataServiceAll : ServiceOrder[] = [
    {  id: '1', name: 'Hệ thống điện', count: 1622},
    {  id: '2', name: 'Hệ thống nước', count: 6232},
    {  id: '3', name: 'Thiết bị điện tử', count: 5751},
    {  id: '4', name: 'Lắp đặt camera', count: 3732},
    {  id: '5', name: 'Vận chuyển', count: 4262},
]