import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/app/services/firebase';  // Asegúrate de que la ruta sea correcta

import WelcomeScreen from './src/app/screens/welcomeScreen'; // Corrige la ruta si es necesario
import RegisterScreen from './src/app/screens/registerScreen'; // Corrige la ruta si es necesario
import LoginScreen from './src/app/screens/loginScreen'; // Corrige la ruta si es necesario
import Home from './src/app/screens/Home'; // Corrige la ruta si es necesario

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true); // Estado de carga
  const [user, setUser] = useState(null); // Estado del usuario

  useEffect(() => {
    // Listener para detectar cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Detiene la animación de carga cuando se obtiene el estado del usuario
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  if (loading) {
    // Pantalla de carga mientras verificamos el estado del usuario
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A6B3E" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // Si el usuario está autenticado, redirige a la pantalla Home
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        ) : (
          <>
            {/* Si no está autenticado, mostrar Welcome, Register y Login */}
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
