import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-auth.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app-check.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAb3aCYlSfYMF4rH3x4SNwi1Hp5Jvh6n9U",
    authDomain: "codetyper-uwu.firebaseapp.com",
    databaseURL: "https://codetyper-uwu-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "codetyper-uwu",
    storageBucket: "codetyper-uwu.appspot.com",
    messagingSenderId: "120744853478",
    appId: "1:120744853478:web:9e566db9e744cad23d2027",
    measurementId: "G-0VCXM6J7S8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const analytics = getAnalytics(app);
const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6Ld_D2gdAAAAAMa5T5AwXXhtUPEKCfsAPO5m18ll")
});