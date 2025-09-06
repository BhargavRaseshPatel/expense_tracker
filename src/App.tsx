import { useEffect, useState } from 'react'
import './App.css'
import Title from './components/Title'
import type { Expense } from './expens.type';
import { AddBalance } from './components/AddBalance';
import { AddExpense } from './components/AddExpense';
import DisplayExpenses from './components/DisplayExpenses';

function App() {

  if (!localStorage.getItem('amount')) {
    localStorage.setItem('amount', '5000')
  }

  const [walletBalance, setWalletBalance] = useState(localStorage.getItem('amount'));
  const [expenseData, setExpenseData] = useState<Expense[]>([])
  const [totalExpense, setTotalExpense] = useState(0)

  const handleExpense = (addExpense: any) => {
    setExpenseData((data) => ([...data, addExpense]))
    localStorage.setItem('expenses', JSON.stringify([...expenseData, addExpense]))
  }

  useEffect(() => {
    if (localStorage.getItem('expenses')) {
      setExpenseData(JSON.parse(localStorage.getItem('expenses')!) as Expense[])
    }
  }, [])

  useEffect(() => {
    let totalExp = 0
    expenseData.forEach((expense) => {
      totalExp += expense.amount
    })
    setTotalExpense(totalExp)
    setWalletBalance(localStorage.getItem('amount'))
  }, [expenseData])

  return (
    <>
      <div className="">
        <Title name='Expense Tracker' />

        <div className="flex p-4 my-2 flex-col lg:flex-row bg-gray-700 items-center rounded-2xl w-full">
          <div className="card w-full">
            <p>Wallet Balance : <span className='text-green-400'> ₹{walletBalance}</span></p>
            <AddBalance setWalletBal={setWalletBalance} />
          </div>
          <div className="card w-full">
            <p>Expenses : {totalExpense}</p>
            <AddExpense setExpenseData={handleExpense} setWalletBal={setWalletBalance}/>
          </div>

          <div className='card w-full' style={{ backgroundColor: '#364153' }}>
            <p>abc</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-2">
            <Title name='Recent Transactions' italic />
            <div className='mt-3'>
              {expenseData.length > 0 ? (
                expenseData.map((expense, index) => (
                  <DisplayExpenses expense={expense} index={index} key={index} />
                ))
              )
                :
                <div className='p-3 rounded-lg bg-white text-black'>No transactions!</div>
              }
            </div>
          </div>
          <div>
            <Title name='Top Expenses' italic />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
