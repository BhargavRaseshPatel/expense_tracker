import { useState } from "react"
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
import type { Expense } from "@/expens.type"

export function AddExpense({ setExpenseData, setWalletBal }: { setExpenseData: (data: Expense) => void, setWalletBal: (data: string) => void }) {

    const [expense, setExpense] = useState<Expense>({
        title: '',
        category: 'Food',
        date: new Date(),
        amount: 0
    })

    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button className="bg-red-500 w-50">+ Add Expense</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white text-black">
                    <DialogHeader>
                        <DialogTitle><span className="text-2xl font-bold ">Add Expenses</span></DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-row gap-2">
                        <Input
                            name="title"
                            placeholder="Title"
                            value={expense.title}
                            onChange={(e) => setExpense((data) => ({ ...data, title: e.target.value }))}
                        />
                        <Input
                            name="price"
                            placeholder="Price"
                            type="number"
                            value={expense.amount}
                            onChange={(e) => setExpense((data) => ({ ...data, amount: Number(e.target.value) }))}
                        />
                    </div>

                    <div className="flex flex-row gap-2">
                        {/* <Select onValueChange={(v: any) => setExpense((data) => ({ ...data, category: v }))} name="category">
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
                        </Select> */}

                        <select name="category" className="w-full input-field" onChange={(value) => console.log(value.target.value)} defaultValue="">
                            <option value="" disabled>Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                        </select>

                        {/* <Calendar22 selectedDate={(value) => setExpense((data) => ({ ...data, date: value }))} /> */}

                        <input type="date" name="date"  className="w-full input-field"/>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            type="submit"
                            className="bg-yellow-400 w-[50%]"
                            onClick={(e) => {
                                e.preventDefault(); // prevent form reload
                                const { amount, title, date } = expense;
                                if (amount == 0 || title == "" || date == undefined) {
                                    alert("Please enter the all fields")
                                } else {
                                    const available_balance = Number(localStorage.getItem('amount'))
                                    if (available_balance < amount) {
                                        alert("Available balance is less than expense")
                                    } else {
                                        setExpenseData(expense)
                                        setExpense({
                                            title: "", amount: 0, category: "Food", date: new Date()
                                        })
                                        let final_balance = available_balance - amount
                                        localStorage.setItem('amount', "" + final_balance)
                                        setWalletBal("" + final_balance)
                                        setOpen(false)
                                    }
                                }
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
