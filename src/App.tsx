import { useState } from 'react'
import './App.css'
import Title from './components/Title'
import type { Expense } from './expens.type';

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

        <div className="flex p-4 my-2 bg-gray-700 items-center rounded-2xl w-full">
          <div className="card w-full">
            <p>Wallet Balance : {walletBalance}</p>
          </div>
          <div className="card w-full">
            <p>Expenses : </p>
          </div>

          <div className='card' style={{backgroundColor : '#364153'}}>
            <p>abc</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
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
