import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick, children }) => {
  return (
    <button type="button" className={css.Button} onClick={onClick}>
      <span>Load more</span>
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};
export default Button;
