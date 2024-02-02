import { Box, Button, Center, Divider, Heading, Image, Text, VStack, View } from 'native-base'
import { StyleSheet } from 'react-native';

const MovieCard = props => {
  const { id, image, label, popularity, releasedate, navigation, type } = props
  return (
    <View>
      <View style={styles.card}>
        <Image alt={label} source={{ uri: image }} size='md' />
        <View style={styles.details}>
          <Heading size='xs'>{label}</Heading>
          <Text style={{ fontSize: 12 }}>Popularity: {popularity}</Text>
          <Text style={{ fontSize: 12 }}>Release Date: {releasedate}</Text>
          <Button
            onPress={() => {
              navigation.navigate('Details', {
                id: id,
                type: type
              })
            }}
          >
            More Details
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10
  },
  details: {
    paddingLeft: 10,
    width: 240,
  }
})

export default MovieCard

