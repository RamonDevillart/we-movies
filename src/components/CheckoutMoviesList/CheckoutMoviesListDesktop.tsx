import React from "react";
import styled from "styled-components";
import IconMinus from "../../assets/images/IconMinus.png";
import IconPlus from "../../assets/images/IconPlus.png";
import IconTrash from "../../assets/images/IconTrash.png";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/cartSlice";

interface ICard {
  movieObj: any;
}

const Poster = styled.img`
  width: 5.6875rem;
  height: 7.125rem;
  border-radius: 0.5rem;
`;

const Title = styled.p`
  font-size: .875rem;
  font-weight: 700;
  width: 50%;
  line-height: 19.07px;
  text-align: left;
  text-transform: uppercase;
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
  margin: 1rem 0;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width:100%;
`;


const PriceDiv = styled.div`
font-family: Open Sans;
font-size: 1rem;
font-weight: 700;
line-height: 21.79px;
text-align: left;
`;

const Wrapper = styled.div`
display: grid;
grid-template-columns: 28% 34.8% 37.2%;
`;


const Label = styled.div`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 19.07px;
  text-align: left;
  text-transform: uppercase;
  color: #999999;
`;

const CheckoutMoviesListDesktop: React.FC<ICard> = ({ movieObj }: ICard) => {
 
  const dispatch = useDispatch();

  const handleRemoveFromCart = (movieId: number) => {
    dispatch(removeFromCart(movieId));
  };

  

  const handleAddToCart = (movieId: number) => {
    const movieWithPrice = {
      ...movieObj,
      price: (movieObj.popularity / 100).toFixed(2),
    };
    dispatch(addToCart(movieWithPrice));
  };  

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

    <Wrapper>
      <div style={{display: "flex", flexDirection: "column"}}>
        <Label>Produto</Label>
        <div style={{display: 'flex', alignItems: 'center', gap: "1rem", height: '100%'}}> 
        <Poster
          src={`https://image.tmdb.org/t/p/w500${movieObj.poster_path}`}
          alt={movieObj.title}
          />
          <div style={{display: 'flex', justifyContent: 'start', flexDirection: 'column'}}>
            <Title>{movieObj.title}</Title>
            {renderSingleValue(movieObj)}
          </div>
        </div>

      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
        <Label>QTD</Label>
        <div style={{display: 'flex', alignItems: 'center', gap: "1rem", height: '100%'}}> 
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
          </Row>
        </div>

      </div>
      <div style={{display: "flex", flexDirection: "column"}}>
      <Label>Subtotal</Label>
      <div style={{display: 'flex', alignItems: 'center', gap: "1rem", height: '100%'}}> 
        <Row>
        {handleValueInCart(movieObj)}
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
          </Row>
        </div>
      </div>
    </Wrapper>     
      <Divider />
    </div>
  );
};

export default CheckoutMoviesListDesktop;
