import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MovieList from '../lists/MovieList';
import { Select } from 'native-base'

const TV_FILTER = {
    airingToday: "airing_today",
    onTheAir: "on_the_air",
    popular: "popular",
    topRated: "top_rated"
}

const MovieScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieData, setMovieData] = useState([]);
    const [filter, setFilter] = useState(TV_FILTER.airingToday);

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

        fetch('https://api.themoviedb.org/3/tv/' + filter, options)
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                let data = response.results.map(item => ({ id: item.id, title: item.name, releasedate: "", popularity: item.popularity, image: imagePath + item.poster_path }));
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
                    <Select.Item label="Airing Today" value={TV_FILTER.airingToday} />
                    <Select.Item label="On The Air" value={TV_FILTER.onTheAir} />
                    <Select.Item label="Popular" value={TV_FILTER.popular} />
                    <Select.Item label="Top Rated" value={TV_FILTER.topRated} />
                </Select>
            </View>
            {!isLoading && <MovieList movies={movieData} navigation={navigation} type={"tv"} />}
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
