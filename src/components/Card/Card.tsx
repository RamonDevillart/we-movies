// src/components/Movies.tsx
import React from "react";
import styled from "styled-components";
import IconCart from "../../assets/images/mdaddshoppingcart 1.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { RootState } from "../../redux/store";

const CardContainer = styled.div`
  padding: 1rem;
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  flex-direction: column;
  color: black;
  width: 338px;
  max-height: 324px;
  border-radius: 0.25rem;
  min-width: 260px;
`;

const Poster = styled.img`
  width: 147px;
  height: 188px;
  border-radius: 0.5rem;
`;

const Title = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 16.34px;
  text-align: center;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35rem;
  text-align: center;
`;

const AddToCartButton = styled.button<{isInCart: boolean}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.5rem;
  background-color: ${({ isInCart }) => (isInCart ? '#039B00' : '#009EDD')};
  border: none;
  border-radius: 0.25rem;
  height: 40px;
  cursor: pointer;
  color: #fff;

  &:hover {
    background-color: ${({ isInCart }) => (isInCart ? '#039B00' : '#2980b9')};
  }
`;


interface ICard {
  movieObj: any;
}

const Card: React.FC<ICard> = ({ movieObj }: ICard) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const isMovieInCart = cart?.some((item:any) => item.id === movieObj.id);
  const movieCount = cart.map((item:any) => {
    if(item.id === movieObj.id) {
      return item.inCart
    }
});    

  const addMovieToCart = () => {   
        const movieWithPrice = {
        ...movieObj,
        price: (movieObj.popularity / 100).toFixed(2),      
        };
        dispatch(addToCart(movieWithPrice));    
  };

  return (
    <div>
      <CardContainer key={movieObj.id}>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
          alt={movieObj.title}
        />
        <Title>{movieObj.title}</Title>
        <Price>R$ {(movieObj.popularity / 100).toFixed(2)}</Price>
        <AddToCartButton isInCart={isMovieInCart} onClick={addMovieToCart}>
          <img src={IconCart} />
          {movieCount} Adicionar ao carrinho
        </AddToCartButton>
      </CardContainer>
    </div>
  );
};

export default Card;
