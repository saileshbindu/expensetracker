import React, { useState } from 'react'
import styles from './WalletBalance.module.css';
import Modal from 'react-modal';

const Expenses = ({walletBalance, setWalletBalance, walletInputValue, setWalletInputValue}) => {
  let [isOpen, setIsOpen] = useState(false)

 const walletHandle = (event) =>{
  event.preventDefault();
  setWalletBalance(parseFloat(walletInputValue) + parseFloat(walletBalance))
  setWalletInputValue('')
  setIsOpen(false)
 }

  return (
    <div className={styles.mainWallet}>
      <p className={styles.headerText}>
      Wallet Balance: <span>₹{walletBalance}</span>
      </p>
      <button type='button' onClick={() =>{setIsOpen(true)}} className={styles.addBtn}>+ Add Income</button>
      <Modal
       isOpen={isOpen}
       className={styles.model}
      >
        <p className={styles.addText}>Add Balance</p>
      <form onSubmit={walletHandle}>
        <input 
          type='number' 
          value={walletInputValue} 
          placeholder='Income Amount'
          onChange={(event) =>{ setWalletInputValue(event.target.value)}}
          />
          <button type='submit' className={styles.balanceBtn}>Add Balance</button>

          <button onClick={() =>{setIsOpen(false)}} className={styles.cancelBtn}>Cancel</button>
      </form>
      </Modal>
    </div>
   
  )
}

export default Expenses