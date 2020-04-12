import Firebase from "firebase";


const firebaseConfig = {
        
    apiKey: "asd",
    authDomain: "covidtracasdapp.com",
    databaseURL: 'https://asdsdbaseio.com',
    projectId: "covidtasd742b",
    storageBucket: "covidtrasdspot.com",
    messagingSenderId: "8984asd6",
    appId: "1:898486asd1be149",
    measurementId: "G-F8asdZ"

};
const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();

