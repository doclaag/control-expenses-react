import PropTypes from 'prop-types';
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';

import 'react-swipeable-list/dist/styles.css';

import { formatDate } from '../helpers';

import SavingsIcon from '../img/savings_icon.svg';
import FoodIcon from '../img/food_icon.svg';
import ExpensesIcon from '../img/expenses_icon.svg';
import HealthIcon from '../img/health_icon.svg';
import HouseIcon from '../img/house_icon.svg';
import LeisureIcon from '../img/leisure_icon.svg';
import SubscriptionsIcon from '../img/subscriptions_icon.svg';

const iconDictionary = {
    ahorro: SavingsIcon,
    comida: FoodIcon,
    casa: HouseIcon,
    gastos: ExpensesIcon,
    ocio: LeisureIcon,
    salud: HealthIcon,
    suscripciones: SubscriptionsIcon,
};

export const Expense = ({ expense, setExpenseEdit, deleteExpense }) => {

    const { category, name, amount, date, id } = expense;

    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => setExpenseEdit(expense)}
            >Editar</SwipeAction>
        </LeadingActions>
    );


    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => deleteExpense(id)}
            >Eliminar</SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='expense shadow'>
                    <div className='expense-content'>
                        <img
                            src={iconDictionary[category]}
                            alt={category}
                        />
                        <div className='expense-description'>
                            <p className='category'> {category} </p>
                            <p className='expense-name'> {name} </p>
                            <p className='expense-date'>Agregado el: <span>{formatDate(date)}</span></p>
                        </div>
                    </div>
                    <p className='expense-amount'>Q. {amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    );
};

Expense.propTypes = {
    expense: PropTypes.object.isRequired,
    setExpenseEdit: PropTypes.func.isRequired,
    deleteExpense: PropTypes.func.isRequired,
};