import * as axios from "axios"

export const getData = (city) => {
    return axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=c71b4450b555f51b0a5e7edac605ad88`)
}
export const getCityName = (city) => {
    return axios.get(`https://htmlweb.ru/geo/api.php?city_name=${city}&json&api_key=507e2e038ad9aa4146782af5a0d61ce2`)
}