import { NavigationContainer } from '@react-navigation/native';
import AppTabs from './AppTabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailScreen from '../screens/DetailScreen';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={AppTabs} options={{
          title: "Movies App", 
          headerStyle: {
            backgroundColor: '#212938',
          },
          headerTitleStyle: {
            color : 'white'
          }
        }} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default AppStack