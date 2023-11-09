import PropTypes from 'prop-types';

export const Message = ({ children, type }) => {
    return (
        <div className={`alert ${type}`}>
            {children}
        </div>
    );
};

Message.propTypes = {
    children: PropTypes.node.isRequired,
    type: PropTypes.string.isRequired
}
