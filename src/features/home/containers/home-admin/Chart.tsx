import Dropdown from "@/src/shared/components/dropdown/Dropdown"
import { View, Text } from "react-native"
import { BarChart, PieChart } from "react-native-gifted-charts"
import styles from "./stylesAdmin"
import { DataChart, DropDown } from "./useHomeAdmin";

interface ChartProps{
    type: 'Bar' | 'Pie';
    data: DataChart[];
    optionMonth: DropDown[];
    setOptionMonth: (value: string) => void;
    optionYear: DropDown[];
    setOptionYear: (value: string) => void;
}
const Chart = ({type, data, optionMonth, setOptionMonth, optionYear, setOptionYear}:ChartProps) => {
    return (
        <View style={styles.boxChart}>
          <Text style={styles.textTitle}>Số đơn hàng</Text>
          <View style={styles.boxTitle}>
            <Dropdown data={optionMonth} setValue={setOptionMonth} />
            <Dropdown data={optionYear} setValue={setOptionYear} />
          </View>
          {type === 'Bar'? (
            <BarChart
            data={data}
            width={280}
            height={220}
            barWidth={18}
            minHeight={3}
            barBorderRadius={10}
            spacing={50}
            noOfSections={4}
            yAxisThickness={0}
            xAxisThickness={0}
            xAxisColor="gray"
            yAxisColor="gray"
            isAnimated
            animationDuration={1000}
          />
          ): (
            <View style={styles.boxPie}>
                {data && data.length > 0 ? (
                  <PieChart
                    data={data}
                    radius={150}
                    strokeWidth={0}
                    donut
                    innerRadius={40}
                    textColor="#000"
                  />
                ) : (
                  <Text>Không có dữ liệu</Text>
                )}
                <View style={styles.legendContainer}>
                  {data.map((item, index) => (
                    <View style={styles.legendItem} key={index}>
                      <View
                        style={[
                          styles.colorBox,
                          { backgroundColor: item.color },
                        ]}
                      />
                      <Text style={styles.legendText}>
                        {item.label}: {item.value}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
          )}
        </View>
    )
}

export default Chart;