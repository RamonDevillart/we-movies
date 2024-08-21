export interface Movie {
    movie: any;
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];    
    original_language: string;
    original_title: string;
    popularity: number;      
    release_date: string;    
    video: false;
    vote_average: number;
    vote_count: number;
    inCart: number;
  }