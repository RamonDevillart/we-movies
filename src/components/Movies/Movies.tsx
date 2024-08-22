// src/components/Movies.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';

import NoMovieFound from '../NoMovieFound/NoMovieFound';
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


const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);  

  
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
        //in order to make the user see the loading state, i put this timeout function
        setTimeout(() => {          
          setLoading(false);
        }, 1500);
      } catch (error) {       
      } finally {       
      }
    };

    useEffect(()=> {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    },[])


  return (
    <MoviesContainer>
      {movies.length === 0 && loading === false ?
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
