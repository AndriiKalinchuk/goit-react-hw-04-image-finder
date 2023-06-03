import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { HiMagnifyingGlass } from 'react-icons/hi2';
class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() !== '') {
      this.props.onSubmit(this.state.query);
    }
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <HiMagnifyingGlass size="24" />
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="What do you want to find?"
            value={query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
