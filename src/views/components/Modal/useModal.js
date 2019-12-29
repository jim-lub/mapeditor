import { useState } from 'react';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [onOpenProps, setOnOpenProps] = useState({});

  const handleOpenModal = (props = {}) => {
    setOnOpenProps({ ...props });
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    setOnOpenProps({});
  };

  return [isVisible, handleOpenModal, handleCloseModal, onOpenProps];
}
