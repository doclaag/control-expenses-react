import PropTypes from 'prop-types';
import { useState } from 'react';
import { Message } from './Message';

export const NewBudget = ({ budget, setBudget, setIsValidBudget }) => {

    const [message, setMessage] = useState('');

    const handleBudget = (e) => {
        e.preventDefault();

        if (!budget || budget < 0) {
            setMessage('No es un presupuesto válido');
            return;
        }

        setMessage('');
        setIsValidBudget(true);



    };

    return (
        <div className='budget-container container shadow'>
            <form onSubmit={handleBudget} className='form'>
                <div className='field'>
                    <label>
                        Definir Presupuesto
                    </label>
                    <input
                        className='new-budget'
                        type='number'
                        placeholder='Añade tu Presupuesto'
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                    />

                    <input
                        type='submit'
                        value='Añadir'
                    />
                </div>
                {message && <Message type='error'>{message}</Message>}
            </form>
        </div>
    );
};


NewBudget.propTypes = {
    budget: PropTypes.number.isRequired,
    setBudget: PropTypes.func.isRequired,
    setIsValidBudget: PropTypes.func.isRequired
}