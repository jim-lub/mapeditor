import { useState } from 'react';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenModal = () => setIsVisible(true);
  const handleCloseModal = () => setIsVisible(false);

  return [isVisible, handleOpenModal, handleCloseModal];
}
