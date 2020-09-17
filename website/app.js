/* Global Variables */
const BASE_API_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = '709760c4e72c6e6ffa505a96d183b837&units=metric';
const LOCALHOST = 'http://localhost:3000';
const DATA_ENDPOINT = '/data';

const generateBtn = document.getElementById('generate');
generateBtn.addEventListener('click', () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    fetchWeather(zipCode, feelings);
});

const fetchWeather = (zipCode, feelings) => {

    const res =
        fetch(`${BASE_API_URL}?zip=${zipCode},us&appid=${API_KEY}`)
        .then(json)
        .then(response => {
            data = {
                date: getCurrentDate(),
                temperature: response.main.temp + " degrees celcius",
                feelings: feelings,
            }

            postData(`${LOCALHOST}${DATA_ENDPOINT}`, data)
                .then(() => fetch(`${LOCALHOST}${DATA_ENDPOINT}`))
                .then(json)
                .then(serverData => updateUI(serverData));

        }).catch(err => {
            updateUI({
                date: getCurrentDate(),
                temperature: "an error has occured in getting weather data",
                feelings: feelings
            });
        })
}

const json = response => {
    return response.json()
}

// Create a new date instance dynamically with JS
const getCurrentDate = () => {
    const d = new Date();
    const newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}

const postData = (url, data) => {
    return fetch(url, {
        method: 'post',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
};

const updateUI = (data) => {
    document.getElementById('date').innerHTML = data.date;
    document.getElementById('temp').innerHTML = data.temperature;
    document.getElementById('content').innerHTML = data.feelings || "please enter how you are feeling today";
}