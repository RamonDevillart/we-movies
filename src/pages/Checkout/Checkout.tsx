// src/pages/Carrinho.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CheckoutMoviesListMobile from "../../components/CheckoutMoviesList/CheckoutMoviesListMobile";
import Spinner from "../../components/Spinner/Spinner";
import Modal from "../../components/Modal/Modal";
import CheckoutMoviesListDesktop from "../../components/CheckoutMoviesList/CheckoutMoviesListDesktop";


const PageContainer = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Button = styled.button<{screeSize: string }>`
  width: ${({ screeSize }) => (screeSize === 'desktop' ? '9.8125rem' : '100%')}  ;
  height: 2.5rem;
  gap: 0.75rem;
  border-radius: 0.25rem 0px 0px 0px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem;
  background-color: #009edd;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #fff;
  margin-top: 1.5rem;
  text-transform: uppercase;

  &:hover {
    background-color: #2980b9;
  }
`;

const ContainerCheckoutCard = styled.div<{ screeSize: string }>`
width: 100%;
background-color: #fff;
color: black;
padding:  ${({ screeSize }) => (screeSize === 'desktop' ? '1.5rem' : '.75rem')} ;
border-radius: .5rem;
display: flex; 
flex-direction: column;
gap: .375rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2.1875rem;
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
  const [modalOpen, setModalOpen] = useState(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screeSize, setScreenSize] = useState<string>(window.innerWidth > 768 ? "desktop": "mobile");
  
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) setScreenSize("mobile");
      if (window.innerWidth > 768) setScreenSize("desktop");
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
      <PageContainer key='as'>
        <ContainerCheckoutCard screeSize={screeSize}>
        {cart?.map((movie) => {
      
          return(
           <>
             {screeSize === 'desktop' ?
              <CheckoutMoviesListDesktop  key={movie.id} movieObj={movie} />
              :
              <CheckoutMoviesListMobile  key={movie.id} movieObj={movie} />
              }
           </>
          )
        } )}
        <div style={screeSize === 'mobile' ? {display: 'flex', flexDirection: 'column-reverse'} : {display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Button onClick={()=> setModalOpen(true)} screeSize={screeSize}>Finalizar Pedido</Button>
          {renderTotalPrice()}
        </div>
        </ContainerCheckoutCard>
      </PageContainer>
      :
      <PageContainer>
        <Spinner />
      </PageContainer>
      }
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <h2 style={{textAlign: 'center'}}>Finalizando compra</h2>
      <div style={{textAlign: 'center'}}>
        <Spinner />      
      </div>
      <h3  style={{textAlign: 'center'}}>Aguarde alguns segundos!</h3>
    </Modal>
      
    </>
  );
};

export default Checkout;
