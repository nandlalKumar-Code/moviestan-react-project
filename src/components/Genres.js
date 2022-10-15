import axios from 'axios';
import React, { useEffect } from 'react';

const Genres = ({
    type,
    selectedGenres,
    setSelectedGenre,
    genres,
    setGenres,
    setPage,
}) => {

    const fetchGenres = async() =>{
       const {data} = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setGenres(data.genres);
        
        
    };

    console.log(genres);
    
    useEffect(() => {
        fetchGenres();
    },[]);

  return (
    <div>
      ho gya kety
    </div>
  )
}

export default Genres
