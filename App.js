import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'; //new add in v4
import SplashScreen from './screens/SplashScreen'; //new add in v4
import LoginScreen from './screens/LoginScreen';
import SigninScreen from './screens/SigninScreen';

import { 
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddScreen from './screens/AddScreen';
import DetalleProducto from './screens/DetalleProducto'; //New Screen
import PerfilScreen from './screens/PerfilScreen';
import SelfScreen from './screens/SelfScreen';
import MyProducts from './screens/MyProducts';
import { View } from 'react-native'; //new add in v4

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash"> 
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registrarse"
          component={SigninScreen}
          options={{
            headerStyle: { backgroundColor: '#a811fa' },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
        <Stack.Screen
          name="Inicio de sesión"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Inicio"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="DetalleProducto" component={DetalleProducto} />
        <Stack.Screen name="AddScreen" component={AddScreen} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} />
        <Stack.Screen name="SelfScreen" component={SelfScreen} />
        <Stack.Screen name="MyProducts" component={MyProducts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
