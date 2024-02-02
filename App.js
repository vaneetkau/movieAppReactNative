import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import AppStack from './src/components/stacks/AppStack'

const App = () => {
  return (
    <NativeBaseProvider>
      <AppStack />
      <StatusBar style='auto' />
    </NativeBaseProvider>
  )
}

export default App
