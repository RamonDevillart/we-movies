// src/pages/Carrinho.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { clearCart, removeFromCart } from "../../redux/cartSlice";
import CheckoutMoviesList from "../../components/CheckoutMoviesList/CheckoutMoviesList";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";


const PageContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const ContainerCheckoutCard = styled.div`
width: 100%;
background-color: #fff;
color: black;
padding: .75rem;
border-radius: .5rem;
display: flex; 
flex-direction: column;
gap: .5rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  `;
const TotalTitle = styled.div`  
font-size: .875rem;
font-weight: 700;
line-height: 19.07px;
text-align: left;
text-transform: uppercase;
color: #999999;
  `;

  const PriceDiv = styled.div`
    font-family: Open Sans;
font-size: 1.5rem;
font-weight: 700;
line-height: 32.68px;
text-align: center;
  `;

const Checkout: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  
  const handleRemoveFromCart = (movieId: number) => {
    dispatch(removeFromCart(movieId));
  };
  
  const handleClearCart = () => {
    dispatch(clearCart());
  }; 

  useEffect(() => {
    if(cart.length === 0) window.location.href='/'
  }, [cart])
  const renderTotalPrice = () => {
    // Calculate the value of each movie
    const calculateMovieValue = (movie: any) => (movie.popularity / 100) * movie.inCart;
  
    // Use reduce to sum the value of all the movies in cart
    const totalValue = cart.reduce((total: number, movie: any) => {
      return total + calculateMovieValue(movie);
    }, 0);
  
    return <Row>
      <TotalTitle onClick={openModal} >Total</TotalTitle> <PriceDiv>R$ {totalValue.toFixed(2)}</PriceDiv>
    </Row>
  };
  

  return (
    <>
      {cart.length !== 0 ?
      <PageContainer>
        <ContainerCheckoutCard>
        {cart?.map((movie) => {
      
          return(
           <CheckoutMoviesList  key={movie.id} movieObj={movie} />
          )
        } )}
        {renderTotalPrice()}
        </ContainerCheckoutCard>
      </PageContainer>
      :
      <PageContainer>
        <Spinner />
      </PageContainer>
      }
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <h2>Modal Title</h2>
      <p>This is a modal. You can put any content you like here.</p>
      <button onClick={closeModal}>Close Modal</button>
    </Modal>
      
    </>
  );
};

export default Checkout;
