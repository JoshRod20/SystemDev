import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importa AsyncStorage
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBIbB3Sm4vsNaKGiACQ75_mXp_xortCklM",
  authDomain: "agrosense-dd62f.firebaseapp.com",
  projectId: "agrosense-dd62f",
  storageBucket: "agrosense-dd62f.appspot.com",
  messagingSenderId: "392700285794",
  appId: "1:392700285794:web:7053ed7e808105cecc923b",
};

// Verificar si la app ya está inicializada
let app;
let auth;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  // Inicializa Firebase Auth con persistencia de AsyncStorage
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApps()[0];
  auth = getAuth(app); // Si ya fue inicializada, usa getAuth
}

const db = getFirestore(app);

export { auth, app, db };
