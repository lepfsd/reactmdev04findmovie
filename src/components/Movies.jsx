function ListMovies(movies) {
    return (
        <ul className="movies">
          {
            movies.movies.map(movie => (
              <li className="movie" key={movie.id}>
                <h3>{movie.title}</h3>
                <p>{movie.year}</p>
                <img src={movie.poster} alt={movie.title}/>
              </li>
            ))
          }
        </ul>
      )
}

function NoMovies () {
    return (
        <p>no se encontraron resultados</p>
    )
}

export function Movies (movies) {
    const hasMovies = (movies?.movies && movies?.movies.length > 0) ? true : false;
    return (
        hasMovies
            ? <ListMovies movies={movies?.movies} />
            : <NoMovies />
    )
}