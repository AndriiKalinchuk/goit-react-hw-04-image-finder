import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!search.trim()) {
      return alert('Enter text');
    }
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <HiMagnifyingGlass size="24" />
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="What do you want to find?"
          value={search}
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
