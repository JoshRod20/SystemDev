// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBIbB3Sm4vsNaKGiACQ75_mXp_xortCklM",
    authDomain: "agrosense-dd62f.firebaseapp.com",
    projectId: "agrosense-dd62f",
    storageBucket: "agrosense-dd62f.appspot.com",
    messagingSenderId: "392700285794",
    appId: "1:392700285794:web:7053ed7e808105cecc923b",
    measurementId: "G-7GTTYBW69L"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(appFirebase);

export default appFirebase;