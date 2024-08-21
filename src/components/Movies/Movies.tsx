// src/components/Movies.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

import NothingHere from "../../assets/images/Group.png";
import NoMovieFound from '../NoMovieFound/NoMovieFound';
import Button from '../Button/Button';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  width: 100%;
`;

const NoMovieFoundContainer = styled.div`
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

const Divider = styled.div`
  border: 1px solid black;
  border-bottom: none;
  width: 60%;
  margin-bottom: 1.5rem;
`;

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


const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); 

  
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.REACT_APP_API_MOVIES_KEY;
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
          params: {
            api_key: apiKey,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        setError('Erro ao executar requisição!');
      } finally {
        setLoading(false);
      }
    };
 

  return (
    <MoviesContainer>
      {movies.length === 0 ?
      (
        <NoMovieFound handleFunction={()=> fetchMovies()} label='Recarregar página' />
      ) 
      : loading === true ? 
      (
        <Spinner />
      )
    :
      (
        movies.map((movie) => (     
          <Card key={movie.id}  movieObj={movie} />
        ))
      )}     
    </MoviesContainer>
  );
};

export default Movies;
