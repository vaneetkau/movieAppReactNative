import { FlatList } from 'native-base'
import MovieCard from '../listItems/MovieCard'

const MovieList = props => {
  const { movies, navigation, type } = props
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => (
        <MovieCard
          label={item.title}
          image={item.image}
          popularity={item.popularity}
          releasedate={item.releasedate}
          id={item.id}
          navigation = {navigation}
          type={type}
        />
      )}
    />
  )
}

export default MovieList

///https://image.tmdb.org/t/p/original/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg