import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDwn);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDwn);
  }
  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.modalClose('');
    }
  };

  handleKeyDwn = e => {
    if (e.key === 'Escape') {
      this.props.modalClose('');
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImageURL} alt="name" width="100%" />
        </div>
      </div>,
      modalRoot
    );
  }
}
