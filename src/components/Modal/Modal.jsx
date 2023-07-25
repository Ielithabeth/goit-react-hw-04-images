import { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ onClose, image }) => {
  useEffect(() => {
    const keyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  window.addEventListener('keydown', keyDown);
  document.body.style.overflow = 'hidden'

  return () => {
    window.removeEventListener('keydown', keyDown);
    document.body.style.overflow = 'auto'
  }}, [onClose]);

  const handleOverlayClose = e => {
     if (e.currentTarget === e.target) {
        onClose();
     }
  }

  return (
      <div onClick={handleOverlayClose} className="Overlay">
        <div className="Modal">
          <img src={image.largeImageURL} alt="img"/>
        </div>
      </div>
  )
}

Modal.protoTypes = {
    image: PropTypes.object,
    onClose: PropTypes.func,
}