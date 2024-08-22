import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CartDropdown from "../CartDropdown/CartDropdown";
import { Movie } from "../../types/Movie";

import IconShoppingBag from "../../assets/images/Vector.png";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 24px 16px;
`;

const MyCartContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
`;

const Title = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  text-align: left;
`;

const LogoName = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  color: #fff;
`;

const ItensCounter = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  color: #999999;
  display: flex;
  justify-content: end;
`;

const Header: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const myCartRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (myCartRef.current && !myCartRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    let items: number = 0;
    cart.items.forEach((movie: Movie) => {
      items += Number(movie.inCart);
    });
    setTotalItems(items);
  }, [cart]);

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <HeaderContainer>
      <LogoName to="/">WeMovies</LogoName>
      <MyCartContainer ref={myCartRef} onClick={toggleDropdown} style={{ cursor: "pointer" }}>
        <div>
          <Title>Meu carrinho</Title>
          <ItensCounter>{totalItems} itens</ItensCounter>
        </div>
        <img src={IconShoppingBag} alt="Cart" />
        {isDropdownOpen && <CartDropdown />}
      </MyCartContainer>
    </HeaderContainer>
  );
};

export default Header;
