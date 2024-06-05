import React, { useState } from 'react';
import { FaRegTimesCircle, FaPencilAlt } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import styles from './Transaction.module.css';
import Modal from 'react-modal';
import { PiPizzaLight } from "react-icons/pi";
import { MdOutlineCardTravel } from "react-icons/md";
import { GoGift } from "react-icons/go";

const Transaction = ({ expFormData, setExpFormData, formData, setFormData, expenses, setExpenses }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(3);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = expFormData.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(expFormData.length / transactionsPerPage);

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const deleteRecord = (index) => {
    const deletedExpense = parseFloat(expFormData[index].price);
    setExpenses((prevExpenses) => prevExpenses - deletedExpense);
    setExpFormData(expFormData.filter((item, i) => i !== index));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (index) => {
    setFormData(expFormData[index]);
    setCurrentEditIndex(index);
    setIsEditing(true);
    setIsOpen(true);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newExpense = parseFloat(formData.price);

    if (isEditing) {
      const oldExpense = parseFloat(expFormData[currentEditIndex].price);
      const expenseDifference = newExpense - oldExpense;

      setExpenses((prevExpenses) => prevExpenses + expenseDifference);

      const updatedData = [...expFormData];
      updatedData[currentEditIndex] = { ...formData, icon: getIcon(formData.category) };
      setExpFormData(updatedData);
      setIsEditing(false);
    } else {
      if (!isNaN(newExpense)) {
        setExpenses((prevExpenses) => prevExpenses + newExpense);
      }
      setExpFormData([...expFormData, { ...formData, icon: getIcon(formData.category) }]);
    }

    setFormData({
      title: '',
      price: '',
      category: '',
      date: '',
      icon: null
    });
    setIsOpen(false);
  };

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
    <div>
      {currentTransactions.map((item, index) => (
        <div key={index} className={styles.mainTrans}>
          <div className={styles.left}>
            <div>{item.icon}</div>
            <div>
              <h3>{item.title}</h3>
              <p className={styles.date}>{item.date}</p>
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <p className={styles.price}>₹{item.price}</p>
            </div>
            <div className={styles.mainBtn}>
              <button className={styles.deleteBtn} onClick={() => deleteRecord(index)}>
                <FaRegTimesCircle />
              </button>
              <button className={styles.editBtn} onClick={() => handleEdit(index)}>
                <FaPencilAlt />
              </button>
            </div>
          </div>
        </div>
      ))}

      {expFormData.length > transactionsPerPage && (
        <div className={styles.pagination}>
          <button onClick={prevPage} disabled={currentPage === 1}>
            <FaArrowLeftLong />
          </button>
          <h3>{currentPage}</h3>
          <button onClick={nextPage} disabled={currentPage === totalPages}>
            <FaArrowRightLong />
          </button>
        </div>
      )}

      <Modal isOpen={isOpen} className={styles.model}>
        <p className={styles.expText}>{isEditing ? 'Edit Expense' : 'Add Expense'}</p>
        <form onSubmit={handleFormSubmit}>
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
            {isEditing ? 'Update Expense' : 'Add Expense'}
          </button>
          <button onClick={() => setIsOpen(false)} className={styles.cancelBtn}>
            Cancel
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default Transaction;
