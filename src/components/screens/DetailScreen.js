import { Heading, Center, Text, View, Image } from "native-base"
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

const DetailScreen = ({ route }) => {

  const [isLoading, setIsLoading] = useState(true);
  //const [isLoaded, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZGEzMDlkMjBiN2QyMTkyMjBmNTczNTNhMjMyZWE5MiIsInN1YiI6IjYyZWI0ZGYyODU2NmQyMDA2Mjc2ZmMxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.knOvpRGUiC40-YOGMcgWhBYiKxTw1a_aOTlkc6H2LTA'
    }
  }

  const imagePath = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    fetchMovie();
  }, [])

  const fetchMovie = () => {

    fetch('https://api.themoviedb.org/3/' + route.params.type + '/' + route.params.id, options)
      .then(response => response.json())
      .then(response => {

        setData(response);
        setIsLoading(false);

      })
      .catch(err => console.error(err));


  }

  return (
    <View>
      {!isLoading && <View >
        <Center>
          <Heading style={styles.detailcard}>{route.params.type === 'movie' ? data.title : data.name}</Heading>
          <Image style={styles.detailcard} alt={route.params.type === 'movie' ? data.title : data.name} source={{ uri: imagePath + data.poster_path }} size='2xl' />
          <Text style={styles.detailcard}>{data.overview}</Text>
          <Text style={styles.detailcard}>
            Popularity: {data.popularity} | Release Date: {data.release_date}
            </Text>
        </Center>
      </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  detailcard: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20
  }
  
})

export default DetailScreen

