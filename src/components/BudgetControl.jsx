import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export const BudgetControl = ({ budget, setBudget, expenses, setExpenses, setIsValidBudget }) => {

    const [percentage, setPercentage] = useState(0);

    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);

    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0);
        const totalAvailable = budget - totalSpent;

        const newPercentage = (((budget - totalAvailable) / budget) * 100).toFixed(2);

        setAvailable(totalAvailable);
        setSpent(totalSpent);

        setTimeout(() => {
            setPercentage(newPercentage);
        }, 1000);
    }, [expenses, budget]);

    const formatQuantity = (quantity) => {
        return quantity.toLocaleString('es-GT', {
            style: 'currency',
            currency: 'GTQ',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const handleResetApp = () => {

        const result = confirm('¿Deseas reiniciar presupuesto y gastos?');

        if (result) {
            setBudget(0);
            setExpenses([]);
            setIsValidBudget(false);
        }
    };

    return (
        <div className='budget-container container shadow two-columns'>
            <div>
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}% Gastado`}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#DC2626' : (percentage >= 75 ? '#FFA500' : '#3B82F6'),
                        trailColor: '#F5F5F5',
                        textColor: percentage > 100 ? '#DC2626' : (percentage >= 75 ? '#FFA500' : '#3B82F6'),
                        textSize: '1.5rem',
                    })}
                />
            </div>
            <div className='budget-content'>
                <button
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span>{formatQuantity(budget)}
                </p>
                <p className={`${available < 0 ? 'negative' : ''}`}>
                    <span>Disponible: </span>{formatQuantity(available)}
                </p>
                <p>
                    <span>Gastado: </span>{formatQuantity(spent)}
                </p>
            </div>
        </div>
    );
};

BudgetControl.propTypes = {
    budget: PropTypes.number.isRequired,
    setBudget: PropTypes.func.isRequired,
    expenses: PropTypes.array.isRequired,
    setExpenses: PropTypes.func.isRequired,
    setIsValidBudget: PropTypes.func.isRequired,
};
