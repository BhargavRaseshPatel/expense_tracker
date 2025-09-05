export type Expense = {
    title: string,
    amount: number,
    category: 'Food' | 'Entertainment' | 'Travel',
    date: Date
}