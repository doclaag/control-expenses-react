import PropTypes from 'prop-types';

export const Filters = ({ filter, setFilter }) => {



    return (
        <div className='filters shadow container'>
            <form>
                <div className='field'>
                    <label>Filtrar Gastos</label>
                    <select
                        value={filter}
                        onChange={e => setFilter(e.target.value)}
                    >
                        <option value=''>-- Todas las categorías --</option>
                        <option value='ahorro'>Ahorro</option>
                        <option value='comida'>Comida</option>
                        <option value='casa'>Casa</option>
                        <option value='gastos'>Gastos Varios</option>
                        <option value='ocio'>Ocio</option>
                        <option value='salud'>Salud</option>
                        <option value='suscripciones'>Suscripciones</option>
                    </select>
                </div>
            </form>
        </div>
    );
};


Filters.propTypes = {
    filter: PropTypes.string.isRequired,
    setFilter: PropTypes.func.isRequired,
};