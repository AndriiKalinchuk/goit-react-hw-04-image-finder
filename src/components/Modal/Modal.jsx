import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ modalClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDwn = e => {
      if (e.key === 'Escape') {
        modalClose('');
      }
    };
    document.addEventListener('keydown', handleKeyDwn);
    return () => {
      document.removeEventListener('keydown', handleKeyDwn);
    };
  }, [modalClose]);

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      modalClose('');
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="name" width="100%" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  modalClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
