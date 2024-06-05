import React, { useState } from 'react';
import Modal from 'react-modal';
import styles from './Expenses.module.css';
import { PiPizzaLight } from "react-icons/pi";
import { MdOutlineCardTravel } from "react-icons/md";
import { GoGift } from "react-icons/go";
import { useSnackbar } from 'notistack';

const Expenses = ({ expenses, setExpenses, expFormData, setExpFormData, formData, setFormData, walletBalance, setWalletBalance }) => {
  const { enqueueSnackbar } = useSnackbar();
  let [isOpen, setIsOpen] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const expensesHandle = (event) => {
    event.preventDefault();
    const newExpense = parseFloat(formData.price);
    const newWalletBal = walletBalance - newExpense;
    if(newWalletBal < 0){
      enqueueSnackbar('insuffient balance', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
        autoHideDuration: 3000,
      });
    }
   else{
    if (!isNaN(newExpense)) {
      setExpenses((prevExpenses) => prevExpenses + newExpense);
    }
    setExpFormData([...expFormData, { ...formData, icon: getIcon(formData.category) }]);
    setWalletBalance(newWalletBal)
    setFormData({
      title: '',
      price: '',
      category: '',
      date: '',
      icon: null
    });
    setIsOpen(false);
  };
   }

  const getIcon = (category) => {
    switch (category) {
      case 'entertainment':
        return <GoGift />;
      case 'food':
        return <PiPizzaLight />;
      case 'travel':
        return <MdOutlineCardTravel />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.mainExpense}>
      <p className={styles.headerText}>
        Expenses: <span className={styles.expSpan}>₹{expenses}</span>
      </p>
      <button type="button" onClick={() => setIsOpen(true)} className={styles.expBtn}>
        + Add Expenses
      </button>
      <Modal isOpen={isOpen} className={styles.model}>
        <p className={styles.expText}>Add Expenses</p>
        <form onSubmit={expensesHandle}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleOnChange}
            required
          />
          <input
            type="number"
            value={formData.price}
            placeholder="Price"
            name="price"
            onChange={handleOnChange}
            required
          />
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleOnChange}
            required
          >
            <option value="">Select</option>
            <option value="entertainment">Entertainment</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
          </select>
          <input
            type="date"
            id="date"
            name="date"
            placeholder="dd/mm/yy"
            value={formData.date}
            onChange={handleOnChange}
            required
          />
          <button type="submit" className={styles.addExpBtn}>
            Add Expense
          </button>
          <button onClick={() => setIsOpen(false)} className={styles.cancelBtn}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Expenses;
