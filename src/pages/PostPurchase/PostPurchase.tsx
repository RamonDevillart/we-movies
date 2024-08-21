import React from "react";
import styled from "styled-components";
import Successful from "../../assets/images/Frame 2115.png";

const PsotPurchaseContainer = styled.div`
  width: 100%;
  background-color: #fff;
  color: black;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: .25rem;
  max-height: 596px;
`;

const NothingHereTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 27.24px;
  text-align: center;
  margin: 4rem 3rem 1.5rem;
`;

const Button = styled.button`
  width: 173px;
  height: 40px;
  gap: 0.75rem;
  border-radius: 0.25rem 0px 0px 0px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem;
  background-color: #009edd;
  border: none;
  border-radius: 0.25rem;
  height: 40px;
  cursor: pointer;
  color: #fff;
  margin-top: 1.5rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const handleBackToHome = () => {
  window.location.href='/'
}

const PsotPurchase = () => {
  return (
    <PsotPurchaseContainer>
      <NothingHereTitle>Compra realizada com sucesso!</NothingHereTitle>
      <img width={295} height={307} src={Successful} />      
      <Button onClick={handleBackToHome} >Voltar</Button>
    </PsotPurchaseContainer>
  );
};

export default PsotPurchase;
