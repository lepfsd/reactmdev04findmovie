import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  
  const [ search, updateSearch ] = useState('')
  const [ error, setError ] = useState(null)
  const isFirstInput = useRef(true)
  
  useEffect(() => {
   
    if(isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }
    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error}
}
function App() {
  const [ sort, setSort ] = useState(false)
  const { search, updateSearch,  error } = useSearch()
  const { movies, getMovies, loading } = useMovies({search, sort})
  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  const debouncedSearch = useCallback(
    debounce(search => {
      getMovies({search})
    }, 1500)
    , [getMovies]) 
  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedSearch(newSearch)
  }
  const handleSort = () => {
    setSort(!sort)
  }
  return (
    <>
      <header>
      <h1>buscador de peliculas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
            name='query' 
            value={search} 
            onChange={handleChange} 
            placeholder='Avengers, Star wars, the matrix...'
          />
          <input type='checkbox' onChange={handleSort} checked={sort}/>
          <button type='submit'>buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        { loading ? <p>cargando...</p> : <Movies movies={movies}/> }
      </main>
    </>
  )
}

export default App
