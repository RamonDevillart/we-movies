// src/pages/Home.tsx
import React from "react";
import styled from "styled-components";
import Movies from "../../components/Movies/Movies";


const HomeContainer = styled.div`
  text-align: center;
  padding: 1rem;
`;


const Home: React.FC = () => {
  

  return (
    <HomeContainer> 
        <Movies />
    </HomeContainer>
  );
};

export default Home;
