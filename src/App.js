import { useState } from 'react';
import './App.css';
import WalletBalance from './components/WalletBalance/WalletBalance';
import Expenses from './components/Expenses/Expenses';
import Modal from 'react-modal';
import Transaction from './components/Transaction/Transaction';
import RechartExpenses from './components/RechartExpenses/RechartExpenses';
import ExpensesBar from './components/ExpensesBar/ExpensesBar'
Modal.setAppElement('#root');


function App() {
    const [walletBalance, setWalletBalance] = useState(5000);
    const [walletInputValue, setWalletInputValue] =  useState('');
    const [expenses, setExpenses] = useState(0);
    const [expFormData, setExpFormData] = useState([]);
    const [formData, setFormData] =  useState([
      {
        title:'',
        price:'',
        category:'',
        date:'',
        icon:null
      }
    ])

    
 return(
  <div className='mainExpenses'>
  <h1>Expense Tracker</h1>
  <div className='innerExpWallet'> 
  <div className='card'>
  <WalletBalance 
      walletBalance={walletBalance} 
      setWalletBalance={setWalletBalance} 
      walletInputValue={walletInputValue} 
      setWalletInputValue={setWalletInputValue}
   
      />
  </div>
  <div className='card'>
    <Expenses 
      expenses={expenses} 
      setExpenses={setExpenses}
      expFormData={expFormData}
      setExpFormData={setExpFormData}
      formData={formData}
        setFormData={setFormData}
        walletBalance={walletBalance} 
        setWalletBalance={setWalletBalance}
      />
  </div>
  <div className='card2'>
<RechartExpenses 
  expFormData={expFormData}
/>
</div>
  </div>
 
  
    <div className='innerTransaction'>
    {expFormData.length > 0 ? (
            <div className='tranMainMobile'>
              <h1><em>Recent Transactions</em></h1>
              <div className='tranMain'>
              <div className='cardTran'>
                <Transaction
                  expFormData={expFormData}
                  setExpFormData={setExpFormData}
                  formData={formData}
                  setFormData={setFormData}
                  expenses={expenses}
                  setExpenses={setExpenses}
                />
              </div>
              <div className='cardTran2'>
                <ExpensesBar expFormData={expFormData} />
              </div>
              </div>
            </div>
          ) : (
            <p></p>
          )}
    </div>
  
  
 </div>
 )
}

export default App;
