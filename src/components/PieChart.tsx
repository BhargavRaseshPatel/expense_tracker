import type { Expense } from '@/expens.type'
import { useEffect, useState } from 'react'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'  // ✅ import actual chart

const ExpensePieChart = ({ expenseData }: { expenseData: Expense[] }) => {
    const [data, setData] = useState<{ id: number; value: number; label: string }[]>([]);

    useEffect(() => {
        let pieData = expenseData.map((item, index) => ({
            id: index,
            value: item.amount,
            label: item.category ?? "Unknown"
        }));
        console.log(expenseData)
        setData(pieData);
    }, [expenseData]);

    return (
        <div>
            <MuiPieChart   
                series={[
                    {
                        data: data,
                    },
                ]}
                width={180}
                height={180}
            />
        </div>
    )
}

export default ExpensePieChart
