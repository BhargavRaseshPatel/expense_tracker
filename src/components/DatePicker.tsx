"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "../components/ui/button"
import { Calendar } from "../components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"

export function Calendar22({ selectedDate,editDate }: { selectedDate: (date: Date | undefined) => void, editDate ?:Date }) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)

    React.useEffect(() => {
        // debugger
        setDate(editDate)
    }, [editDate])

    return (
        <div className="flex flex-col gap-3">
            {/* <Label htmlFor="date" className="px-1">
        Date of birth
      </Label> */}
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                    >
                        {date instanceof Date ? date.toLocaleDateString() : "Select date"}
                        <ChevronDownIcon />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0 bg-black" align="start">
                    <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                            selectedDate(date)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
