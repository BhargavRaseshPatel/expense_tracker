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
import Title from "./Title"

export function AddBalance({ setWalletBal }: { setWalletBal: (balance: string) => void }) {
  const [addBalance, setAddBalance] = useState(0)
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-green-500 w-50">+ Add Balance</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white text-black">
          <DialogHeader>
            <DialogTitle><Title name="Add Balance" /></DialogTitle>
          </DialogHeader>

          <div className="flex flex-row gap-2">
            <Input
              placeholder="Income Amount"
              type="number"
              value={addBalance}
              onChange={(e) => setAddBalance(Number(e.target.value))}
            />

            <Button
              type="submit"
              className="bg-yellow-400"
              onClick={(e) => {
                e.preventDefault(); // prevent form reload
                let available_balance = Number(localStorage.getItem("balance")) || 0;
                let total_balance = available_balance + addBalance;
                localStorage.setItem("balance", total_balance.toString());
                setWalletBal(total_balance.toString());
                setAddBalance(0)
                setOpen(false); // close dialog
              }}
            >
              Add Balance
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
