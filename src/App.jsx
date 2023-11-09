import { useState, useEffect } from "react";

import { Header, Modal, ExpenseList, Filters } from './components';
import { generateId } from './helpers';

import NewExpenseIcon from './img/new_expense_icon.svg';

const App = () => {

  const [expenses, setExpenses] = useState(
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  const [expenseEdit, setExpenseEdit] = useState({});

  const [filter, setFilter] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    if (Object.keys(expenseEdit).length > 0) {
      setModal(true);


      setTimeout(() => {
        setAnimateModal(true);
      }, 500);
    }
  }, [expenseEdit]);

  useEffect(() => {
    localStorage.setItem('budget', budget ?? 0);
  }, [budget]);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []);
  }, [expenses]);

  useEffect(() => {
    const filterExpenses = () => {
      if (filter) {
        const filteredExpenses = expenses.filter(expense => expense.category === filter);
        setFilteredExpenses(filteredExpenses);
      }
    };
    filterExpenses();
  }, [filter])

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget'));

    if (budgetLS > 0) {
      setIsValidBudget(true);
    }
  }, []);


  const handleNewExpense = () => {
    setModal(true);
    setExpenseEdit({});

    setTimeout(() => {
      setAnimateModal(true);
    }, 500);
  };

  const saveExpense = expense => {

    if (expense.id) {
      const expensesUpdated = expenses.map(item => item.id === expense.id ? expense : item);
      setExpenses(expensesUpdated);
      setExpenseEdit({});
    } else {
      expense.id = generateId();
      expense.date = Date.now();
      setExpenses([...expenses, expense]);
    }

    setAnimateModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const deleteExpense = id => {
    const expensesUpdated = expenses.filter(expense => expense.id !== id);
    setExpenses(expensesUpdated);
  };

  return (
    <div className={modal ? 'fixed' : ''}>
      <Header
        expenses={expenses}
        setExpenses={setExpenses}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
      />


      {
        isValidBudget && (
          <>
            <main>
              <Filters
                filter={filter}
                setFilter={setFilter}
              />
              <ExpenseList
                expenses={expenses}
                setExpenseEdit={setExpenseEdit}
                deleteExpense={deleteExpense}
                filter={filter}
                filteredExpenses={filteredExpenses}
              />
            </main>
            <div className='new-expense'>
              <img
                src={NewExpenseIcon}
                alt='Ícono nuevo gasto'
                onClick={handleNewExpense}
              />
            </div>
          </>
        )
      }

      {
        modal && <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          expenseEdit={expenseEdit}
          setExpenseEdit={setExpenseEdit}
        />
      }
    </div>
  );
};

export default App
