import React, { useEffect, useState } from "react";
import styled from "styled-components";

import IconMinus from "../../assets/images/IconMinus.png";
import IconPlus from "../../assets/images/IconPlus.png";
import IconTrash from "../../assets/images/IconTrash.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addToCart, clearCart, removeFromCart } from "../../redux/cartSlice";

interface ICard {
  movieObj: any;
}

const ContainerMovieCard = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  gap: 8px;
`;

const Poster = styled.img`
  width: 64px;
  height: 82px;
  border-radius: 0.5rem;
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 700;
  width: 50%;
  line-height: 19.07px;
  text-align: left;
  text-transform: uppercase;
`;

const PriceAndTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CounterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Counter = styled.div`
  border: 1px solid #d9d9d9;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  justify-content: center;
  margin: 0 0.5rem;
`;

const Divider = styled.div`
  border: 1px solid #999999;
  border-bottom: none;
  margin: 1.5rem 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Col = styled.div`
  display: flex;
  width: calc(100% - 64px);
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TotalTitle = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 19.07px;
  text-align: right;
  text-transform: uppercase;
  color: #999999;
`;

const PriceDiv = styled.div`
  font-family: Open Sans;
  font-size: 1rem;
  font-weight: 700;
  line-height: 21.79px;
  text-align: center;
`;

const SinglePriceDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CheckoutMoviesList: React.FC<ICard> = ({ movieObj }: ICard) => {
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [screeSize, setScreenSize] = useState<string>("desktop");

  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (movieId: number) => {
    dispatch(removeFromCart(movieId));
  };

  const handleClearCart = (movieId: number) => {
    dispatch(clearCart());
  };

  const handleAddToCart = (movieId: number) => {
    const movieWithPrice = {
      ...movieObj,
      price: (movieObj.popularity / 100).toFixed(2),
    };
    dispatch(addToCart(movieWithPrice));
  };

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

  const handleValueInCart = (movie: any) => {
    let value = Number((movie.popularity / 100) * movie.inCart).toFixed(2);
    return <PriceDiv>R$ {value}</PriceDiv>;
  };

  const renderSingleValue = (movie: any) => {
    let value = Number(movie.popularity / 100).toFixed(2);
    return <PriceDiv>R$ {value}</PriceDiv>;
  };

  return (
    <div>
      <ContainerMovieCard>
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
          alt={movieObj.title}
        />
        <Col>
          <Row>
            <Title>{movieObj.title}</Title>
            <SinglePriceDiv>
              {renderSingleValue(movieObj)}
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveFromCart(movieObj.id)}
              >
                <img src={IconTrash} />
              </button>
            </SinglePriceDiv>
          </Row>
          <Row>
            <CounterContainer>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleRemoveFromCart(movieObj.id)}
              >
                <img src={IconMinus} />
              </button>
              <Counter>{movieObj.inCart}</Counter>
              <button
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleAddToCart(movieObj.id)}
              >
                <img src={IconPlus} />
              </button>
            </CounterContainer>

            <Col>
              <div>
                <TotalTitle>Subotal</TotalTitle>
              </div>
              <div>{handleValueInCart(movieObj)}</div>
            </Col>
          </Row>
        </Col>
      </ContainerMovieCard>
      <Divider />
    </div>
  );
};

export default CheckoutMoviesList;
