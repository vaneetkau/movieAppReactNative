import { StyleSheet, TextInput, View } from 'react-native'
import { Button, Text, Select } from 'native-base'
import React from 'react'
import MovieList from '../lists/MovieList';

const SEARCH_FILTER = {
    movie: "movie",
    multi: "multi"
}

const SearchScreen = ({ navigation }) => {
    const [searchText, setSearchText] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [movieData, setMovieData] = React.useState([]);
    const [filter, setFilter] = React.useState(SEARCH_FILTER.multi);
    const [validationText, setValidationText] = React.useState('Please initiate a search');

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMDlkMjBiN2QyMTkyMjBmNTczNTNhMjMyZWE5MiIsInN1YiI6IjYyZWI0ZGYyODU2NmQyMDA2Mjc2ZmMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.knOvpRGUiC40-YOGMcgWhBYiKxTw1a_aOTlkc6H2LTA'
        }
    };

    const imagePath = "https://image.tmdb.org/t/p/original/";

    React.useEffect(() => {
        if (searchText !== undefined && searchText !== '' && searchText !== null) {
            fetchMovies();
        }
    }, [filter])

    const fetchMovies = () => {

        const queryURL = 'https://api.themoviedb.org/3/search/' + filter + "?query=" + encodeURIComponent(searchText);
        console.log(queryURL)
        fetch(queryURL, options)
            .then(response => response.json())
            .then(response => {

                let data = response.results.map(item => ({ id: item.id, title: item.title, releasedate: item.release_date, popularity: item.popularity, image: imagePath + item.poster_path }));
                setMovieData(data);
                setIsLoading(false);
                //console.log(data);
            })
            .catch(err => console.error(err));

    }

    return (
        <View style={styles.container}>

            <Text>Search Movie/TV Show Name<Text style={{ color: 'red' }}>*</Text></Text>
            <TextInput
                style={styles.input}
                onChangeText={setSearchText}
                value={searchText}
                placeholder='i.e James Bond'
            />
            <Text>Choose Search Type<Text style={{ color: 'red' }}>*</Text></Text>
            <View style={styles.search}>
                <View style={styles.picker}>
                    <Select
                        selectedValue={filter}
                        onValueChange={(itemValue, itemIndex) => {
                            setFilter(itemValue);
                        }
                        }>
                        <Select.Item label="multi" value={SEARCH_FILTER.multi} />
                        <Select.Item label="movie" value={SEARCH_FILTER.movie} />
                    </Select>
                </View>
                <View style={styles.searchButton}>
                    <Button
                        onPress={() => {
                            if (searchText === '' || searchText === undefined) {
                                setValidationText("Movie/TV Show name is required.")
                            } else
                                fetchMovies();
                        }}
                        title='Search'>
                        Search
                    </Button>
                </View>
            </View>
            {isLoading
                ? <Text style={styles.searchText}>{validationText}</Text>
                : <MovieList movies={movieData} navigation={navigation} type={"movie"} />
            }
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        paddingHorizontal: 30,
        marginTop: 30
    },
    picker: {
        width: 150
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        marginBottom: 30
    },
    searchButton: {
        width: 150
    },
    searchText: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 90,
        marginVertical: 200,
    }
});