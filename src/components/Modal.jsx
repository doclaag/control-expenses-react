import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import CloseButton from '../img/close.svg';
import { Message } from './Message';


export const Modal = ({ setModal, animateModal, setAnimateModal, saveExpense, expenseEdit, setExpenseEdit }) => {

    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (Object.keys(expenseEdit).length > 0) {
            setName(expenseEdit.name);
            setAmount(expenseEdit.amount);
            setCategory(expenseEdit.category);
            setDate(expenseEdit.date);
            setId(expenseEdit.id);
        }

    }, [expenseEdit]);

    const hideModal = () => {
        setAnimateModal(false);
        setExpenseEdit({})

        setTimeout(() => {
            setModal(false);
        }, 500);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if ([name, amount, category].includes('')) {
            setMessage('Todos los campos son obligatorios');

            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }

        saveExpense({ name, amount, category, date, id });
    };

    return (
        <div className='modal'>
            <div className='close-modal'>
                <img
                    src={CloseButton}
                    alt='Cerrar Modal'
                    onClick={hideModal}
                />
            </div>
            <form
                onSubmit={handleSubmit}
                className={`form ${animateModal ? 'animate' : 'close'}`}>
                <legend>{expenseEdit.name ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {message && <Message type='error'>{message}</Message>}
                <div className='field'>
                    <label htmlFor='name'>Nombre Gasto: </label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Añade el nombre del gasto'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div className='field'>
                    <label htmlFor='amount'>Cantidad: </label>
                    <input
                        id='amount'
                        type='number'
                        placeholder='Añade la cantidad del gasto'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))}
                    />
                </div>

                <div className='field'>
                    <label htmlFor='category'>Categoría: </label>
                    <select
                        id='category'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        <option value=''>-- Seleccione --</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>
                <input
                    type='submit'
                    value={expenseEdit.name ? 'Guardar Cambios' : 'Añadir Gasto'}
                />
            </form>

        </div>
    );
};


Modal.propTypes = {
    setModal: PropTypes.func.isRequired,
    animateModal: PropTypes.bool.isRequired,
    setAnimateModal: PropTypes.func.isRequired,
    saveExpense: PropTypes.func.isRequired,
    expenseEdit: PropTypes.object.isRequired,
    setExpenseEdit: PropTypes.func.isRequired,
};