import type { Expense } from '@/expens.type'
import React from 'react'

const DisplayExpenses = ({expense , index} : {expense : Expense , index : number}) => {
    const {date, title, amount} = expense
    const final_date = new Date(date!)
    return (
        <div key={index} className="p-3 flex justify-between mb-3 items-center bg-white rounded-lg text-black">
            <div className="flex flex-col">
                <p>{title}</p>
                <p>{final_date ? `${final_date.getFullYear()}-${String(final_date.getMonth() + 1).padStart(2, '0')}-${String(final_date.getDate()).padStart(2, '0')}` : 'Invalid Date'}</p>
            </div>
            <div className="flex-row">
                <p>{amount}</p>
            </div>
        </div>
    )
}

export default DisplayExpenses