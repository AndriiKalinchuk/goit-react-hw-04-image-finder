import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
};

export default Button;
