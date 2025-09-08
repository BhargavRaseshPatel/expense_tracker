import type { Expense } from '@/expens.type'
import { useEffect, useState } from 'react'
import { PieChart as MuiPieChart } from '@mui/x-charts/PieChart'  // ✅ import actual chart

const ExpensePieChart = ({ expenseData }: { expenseData: Expense[] }) => {
    const [data, setData] = useState<{ id: number; value: number; label: string }[]>([]);

    useEffect(() => {
        let pieData = [
            { id: 0, label: 'Entertainment', value: 0 },
            { id: 1, label: 'Food', value: 0 },
            { id: 2, label: 'Travel', value: 0 }
        ];

        expenseData.forEach((expdata) => {
            const categoryData = pieData.find((data) => data.label === expdata.category);
            if (categoryData) {
            categoryData.value += expdata.amount;
            }
        });
        
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
