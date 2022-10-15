import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomePagination  from '../../Pagination/CustomePagination';
import SingleContent from '../../SingleContent/SingleContent';
import Genres from '../../Genres';

const Movies = () => {

  const [page,setPage]= useState(1);
  const [content,setContent] = useState([]);
  const [numofPages,setNumofPages]= useState();
  const [selectedGenres,setSelectedGenres]=useState([]);
  const [genres,setGenres]=useState([]);

  const fetchMovies = async () => {
    const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`);
  
    setContent(data.results);
    setNumofPages(data.total_pages);
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  },[page]);

  return (
    <div>
      <span className='pageTitle'>Movies</span>
      <Genres 
          type="movies"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
       />
      <div className='trending'>
        {
          content && content.map((c) => (
            < SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                overview={c.overview}
                date={c.release_date || c.first_air_date}
                media_type={c.media_type}
                vote_average={c.vote_average}
            />

          ))
        }
      </div>
      {numofPages > 1 && (
          <CustomePagination setPage= {setPage} numofPages={ numofPages }/>
      )}
    </div>
  )
}

export default Movies;
