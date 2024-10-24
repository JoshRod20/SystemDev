import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './src/app/services/firebase';  // Ruta correcta a firebase.js
import AppNavigator from './src/app/navigation/appNavigator';  // Importar la navegación desde AppNavigator.js
import FlashMessage from "react-native-flash-message";

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
    <AppNavigator user={user} />  // Pasar el estado del usuario a la navegación
  );
}
