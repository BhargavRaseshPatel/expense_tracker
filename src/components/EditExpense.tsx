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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import { Calendar22 } from "./DatePicker"
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
            title : expense.title,
            category : expense.category,
            date : expense.date,
            amount : expense.amount
        })
    }, [index])

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button ><MdOutlineEdit  className='size-8 h-10 w-10 p-1 bg-yellow-500 text-white rounded-lg' /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                    <DialogHeader>
                        <DialogTitle><Title name="Add Expenses" /></DialogTitle>
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
                        <Select value={expense.category} onValueChange={(v: any) => setExpense((data) => ({ ...data, category: v }))}>
                            <SelectTrigger className="w-[180px] bg-white text-black">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="bg-gray-300 text-black">
                                    <SelectLabel>Fruits</SelectLabel>
                                    <SelectItem value="Food">Food</SelectItem>
                                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                                    <SelectItem value="Travel">Travel</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Calendar22 editDate={expense.date} selectedDate={(value) => setExpense((data) => ({ ...data, date: value }))} />
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            className="bg-yellow-400 w-[50%]"
                            onClick={(e) => {
                                e.preventDefault(); // prevent form reload
                                // const { amount, title, date } = expense;
                                // if (amount == 0 || title == "" || date == undefined) {
                                //     alert("Please enter the all fields")
                                // } else {
                                //     const available_balance = Number(localStorage.getItem('amount'))
                                //     if (available_balance < amount) {
                                //         alert("Available balance is less than expense")
                                //     } else {
                                //         setExpenseData(expense)
                                //         setExpense({
                                //             title: "", amount: 0, category: "Food", date: new Date()
                                //         })
                                //         let final_balance = available_balance - amount
                                //         localStorage.setItem('amount', "" + final_balance)
                                //         setWalletBal("" + final_balance)
                                //         setOpen(false)
                                //     }
                                // }
                            }}
                        >
                            Add Expense
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
