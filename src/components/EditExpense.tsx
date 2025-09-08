import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import Title from "./Title"
import type { Expense } from "@/expens.type"
import { MdOutlineEdit } from "react-icons/md"

export function EditExpense({ index }: { index: number }) {

    const [expense, setExpense] = useState<Expense>({
        title: '',
        category: 'Food',
        date: new Date(),
        amount: 0
    })

    useEffect(() => {
        const expensesData = JSON.parse(localStorage.getItem('expenses')!) as Expense[]
        let expense = expensesData[index]
        setExpense({
            title: expense.title,
            category: expense.category,
            date: expense.date,
            amount: expense.amount
        })
    }, [index])

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button ><MdOutlineEdit className='size-8 h-10 w-10 p-1 bg-yellow-500 text-white rounded-lg' /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                    <DialogHeader>
                        <DialogTitle><Title name="Update Expenses" /></DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-row gap-2">
                        <Input
                            placeholder="Title"
                            value={expense.title}
                            onChange={(e) => setExpense((data) => ({ ...data, title: e.target.value }))}
                        />
                        <Input
                            placeholder="Price"
                            type="number"
                            value={expense.amount}
                            onChange={(e) => setExpense((data) => ({ ...data, amount: Number(e.target.value) }))}
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                        <select name="category" className="w-full input-field" defaultValue={expense.category}
                            onChange={(e) => setExpense((data) => ({ ...data, category: e.target.value as 'Food' | 'Entertainment' | 'Travel' }))}>
                            <option value="" disabled>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                        </select>
                        <input type="date" name="date" onChange={(e) => setExpense((data) => ({ ...data, date: new Date(e.target.value) }))}
                            value={new Date(expense.date!).toISOString().split('T')[0]} className="w-full input-field" />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            className="bg-yellow-400 w-[50%]"
                            onClick={(e) => {
                                e.preventDefault(); // prevent form reload
                                const expensesData = JSON.parse(localStorage.getItem('expenses')!) as Expense[]
                                expensesData[index] = {
                                    title: expense.title,
                                    amount: expense.amount,
                                    category: expense.category,
                                    date: expense.date
                                }
                                // console.log(JSON.stringify(expensesData))
                                localStorage.setItem('expenses', JSON.stringify(expensesData))
                                setOpen(false);
                                window.location.reload();
                            }}
                        >
                            Update Expense
                        </Button>

                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}
