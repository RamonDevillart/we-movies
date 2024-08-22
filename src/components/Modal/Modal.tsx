import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ModalOverlay = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  color: black;
`;

const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  z-index: 1001;
  height: 20rem;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.5rem;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    
    useEffect(()=>{
        if(isOpen === true) {
            setTimeout(() => {
                window.location.href='/post-purchase';                
            }, 1500);
        }
    },[isOpen])
  return (
    <ModalOverlay isOpen={isOpen}>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

