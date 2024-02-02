import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from '../lists/MovieList';
import { Select } from 'native-base'

const MOVIE_FILTER = {
    nowPlaying: "now_playing",
    popular: "popular",
    topRated: "top_rated",
    upcoming: "upcoming"
}

const MovieScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieData, setMovieData] = useState([]);
    const [filter, setFilter] = useState(MOVIE_FILTER.nowPlaying);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMDlkMjBiN2QyMTkyMjBmNTczNTNhMjMyZWE5MiIsInN1YiI6IjYyZWI0ZGYyODU2NmQyMDA2Mjc2ZmMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.knOvpRGUiC40-YOGMcgWhBYiKxTw1a_aOTlkc6H2LTA'
        }
    };

    const imagePath = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        fetchMovies();
    }, [filter])

    const fetchMovies = () => {

        fetch('https://api.themoviedb.org/3/movie/' + filter, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                let data = response.results.map(item => ({ id: item.id, title: item.title, releasedate: item.release_date, popularity: item.popularity, image: imagePath + item.poster_path }));
                setMovieData(data);
                setIsLoading(false);

            })
            .catch(err => console.error(err));


    }

    return (
        <View>
            <View style={styles.picker}>
                <Select
                    selectedValue={filter}
                    minWidth="200"
                    onValueChange={(itemValue, itemIndex) =>
                        setFilter(itemValue)
                    }>
                    <Select.Item label="Now Playing" value={MOVIE_FILTER.nowPlaying} />
                    <Select.Item label="Popular" value={MOVIE_FILTER.popular} />
                    <Select.Item label="Top Rated" value={MOVIE_FILTER.topRated} />
                    <Select.Item label="Upcoming" value={MOVIE_FILTER.upcoming} />
                </Select>
            </View>
            {!isLoading && <MovieList movies={movieData} navigation={navigation} type={"movie"}/>}
            <StatusBar style="auto" />
        </View>
    );
}

export default MovieScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 80
    }
});
