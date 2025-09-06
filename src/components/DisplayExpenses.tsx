import type { Expense } from '@/expens.type'
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";

const DisplayExpenses = ({ expense, index, onDelete }: { expense: Expense, index: number, onDelete: (index: number) => void }) => {
    const { date, title, amount } = expense
    const final_date = new Date(date!)


    return (
        <div key={index} className="p-3 flex justify-between mb-3 items-center bg-white rounded-lg text-black">
            <div className="flex flex-col">
                <p>{title}</p>
                <p>{final_date ? `${final_date.getFullYear()}-${String(final_date.getMonth() + 1).padStart(2, '0')}-${String(final_date.getDate()).padStart(2, '0')}` : 'Invalid Date'}</p>
            </div>
            <div className="flex gap-2 flex-row items-center">
                <p className='text-yellow-500 font-bold'>₹{amount}</p>
                {/* <RemoveFormatting className='size-6' /> */}
                <TiDeleteOutline onClick={() => onDelete(index)} className='size-8 h-10 w-10 p-1 bg-red-500 text-white rounded-lg' />
                <MdOutlineEdit className='size-8 h-10 w-10 p-1 bg-yellow-500 text-white rounded-lg' />
            </div>
        </div>
    )
}

export default DisplayExpenses