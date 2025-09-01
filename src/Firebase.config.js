// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPkgEn1tkcm2pln03k-sCJAgobmeyVmJU",
    authDomain: "fir-again-another.firebaseapp.com",
    projectId: "fir-again-another",
    storageBucket: "fir-again-another.firebasestorage.app",
    messagingSenderId: "397867166942",
    appId: "1:397867166942:web:bf0e476c616607e6ede64f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
