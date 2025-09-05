import { useState } from 'react'
import './App.css'
import Title from './components/Title'
import type { Expense } from './expens.type';
import { AddExpense } from './components/AddExpense';

function App() {

  if (!localStorage.getItem('balance')) {
    localStorage.setItem('balance', '5000')
  }

  const [walletBalance, setWalletBalance] = useState(localStorage.getItem('balance'));
  const [expenseData, setExpenseData] = useState<Expense[]>([])

  return (
    <>
      <div className="">
        <Title name='Expense Tracker' />

        <div className="flex p-4 my-2 flex-col lg:flex-row bg-gray-700 items-center rounded-2xl w-full">
          <div className="card w-full">
            <p>Wallet Balance : <span className='text-green-400'> ₹{walletBalance}</span></p>
            <AddExpense setWalletBal={setWalletBalance}/>
          </div>
          <div className="card w-full">
            <p>Expenses : </p>
          </div>

          <div className='card w-full' style={{backgroundColor : '#364153'}}>
            <p>abc</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
          <div className="col-span-2">
            <Title name='Recent Transactions' italic />
            <div className='mt-3'>
              {expenseData.length > 0 ? <div></div> : <div className='p-3 rounded-lg bg-white text-black'>No transactions!</div>}
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
