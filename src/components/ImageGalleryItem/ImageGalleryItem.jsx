import { useState } from "react";
import { Modal } from "components/Modal/Modal";
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ item }) => {
  const [shownModal, setShownModal] = useState(false);

  const handleModal = () => {
    setShownModal(shownModal => !shownModal)
  };

  return (
    <li>
      <img
        onClick={handleModal}
        className="ImageGalleryItem-image"
        src={item.webformatURL}
        alt="img"
      />

      {shownModal && <Modal onClose={handleModal} image={item} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
    item: PropTypes.object,
};