import React from 'react';
import styled from 'styled-components';


const StyledButton = styled.button`
  
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 1rem 2rem;  
  border: none;
  border-radius: 0.25rem;
  height: 40px;
  cursor: pointer;
  color: #fff;
  background-color: #009EDD; 

  &:hover {
    background-color: #2980b9;
  }  
`;

interface IButton {
    title:string;
    onclick?:any
}

const  Button: React.FC<IButton> = ({ title }: IButton) => {
    return <StyledButton onClick={()=> onclick}>{title}</StyledButton>
}

export default Button;
