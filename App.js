import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Components
import HomeScreen from './app/Screens/HomeScreen';
import FormScreen from './app/Screens/FormScreen';
import AlertScreen from './app/Screens/AlertScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      {/* Import HomeScreen by default */}
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Accueil' }}/>
        <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Signaler une alerte' }}/>
        <Stack.Screen name="Alert" component={AlertScreen} options={{ title: 'Alertes en cours' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
