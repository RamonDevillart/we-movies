// src/components/CartDropdown.tsx
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearCart, removeFromCart } from "../../redux/cartSlice";

const DropdownContainer = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  color: black;
  width: 300px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  border-radius: 4px;
  padding: 1rem;
`;

const DropdownItem = styled.div`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
`;

const MovieTitle = styled.span`
  font-size: 0.875rem;
`;

const RemoveButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #c0392b;
  }
`;

const ClearButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;

  &:hover {
    background-color: #c0392b;
  }
`;

const CheckoutLink = styled(Link)`
  display: block;
  text-align: center;
  padding: 10px;
  background-color: #009EDD;
  color: white;
  text-decoration: none;
  border-radius: 4px;

  &:hover {
    background-color: #007bb5;
  }
`;

const CartDropdown: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (movieId: number) => {
    dispatch(removeFromCart(movieId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  }; 

  return (
    <DropdownContainer>
      {cart.length === 0 ? (
        <DropdownItem>O carrinho está vazio</DropdownItem>
      ) : (
        <>
          {cart.map((movie) => (
            <DropdownItem key={movie.id}>
              <MovieTitle>{movie.title}</MovieTitle>

              <RemoveButton onClick={() => handleRemoveFromCart(movie.id)}>
                Remover
              </RemoveButton>
            </DropdownItem>
          ))}
          <DropdownItem>
            <ClearButton onClick={handleClearCart}>
              Limpar carrinho
            </ClearButton>
          </DropdownItem>
          <CheckoutLink to="/checkout">Ir para o checkout</CheckoutLink>
        </>
      )}
    </DropdownContainer>
  );
};

export default CartDropdown;
