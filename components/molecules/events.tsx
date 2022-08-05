import React, { useEffect, useState } from 'react';
import { Thumbnail } from './thumbnail';
import axios from 'axios';

export const Events: React.FC = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    let unmounted = false;
    (async () => {
      const movies = await axios.get('https://reactnative.dev/movies.json', {
        params: { hoge: 'yamada' },
      });
      if (!unmounted) setMovies(movies.data.movies);
    })();

    return () => {
      unmounted = true;
    };
  }, [setMovies]);

  return (
    <div css={{ display: 'flex', justifyContent: 'center' }}>
      {movies?.map((item) => {
        return (
          <Thumbnail
            key={item.id}
            title={item.title}
            outline={item.releaseYear}
          />
        );
      })}
    </div>
  );
};
