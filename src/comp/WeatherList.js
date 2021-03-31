import { React, useEffect, useState } from 'react';
import { getData, getCityName } from './../api/weatherAPI';
import WeatherItem from './WeatherItem';
import c from './WeatherList.module.css'

const WeatherList = () => {
    const [city, setCity] = useState('');
    const [message, setMessage] = useState('');
    const [cityList, setCityList] = useState([]);
    const [weatherItems, setWeatherItems] = useState(localStorage.getItem('weatherItems') ? JSON.parse(localStorage.getItem('weatherItems')) : []);

    useEffect(() => {
        localStorage.setItem('weatherItems', JSON.stringify(weatherItems));
    }, [weatherItems]);

    useEffect(() => {
        setWeatherItems(JSON.parse(localStorage.getItem('weatherItems')))
    }, []);

    const getCity = (cityName) => {
        if (!cityName) {
            setMessage('Введите название города');
            return
        }
        getData(cityName)
            .then(resp => {
                if (!weatherItems.find(item => item.id === resp.data.id))
                    setWeatherItems([...weatherItems, { ...resp.data, sysDate: new Date() }])
                else setMessage('Город уже есть в списке');
            })
            .catch(err => setMessage('Ошибка в получении данных'))
        setCity('');
    }

    const getList = () => {
        return weatherItems?.map(item => <WeatherItem key={item.id} item={item} delItem={delItem} updateItem={updateItem} />)
    }

    const delItem = (id) => {
        setWeatherItems(weatherItems.filter(item => item.id !== id))
    }

    const updateItem = (id) => {
        const cityName = weatherItems.find(item => item.id === id).name;
        let tmp;
        getData(cityName)
            .then(resp => tmp = { ...resp.data, sysDate: new Date() })
            .then(() => {
                setWeatherItems(weatherItems.map(item => {
                    if (item.id === id) return tmp;
                    else return item;
                }))
            })
        setMessage('Данные обновлены');
    }

    const getCityList = (e, city) => {
        setCity(e.target.value);
        let tmp = [];
        if (city.length == 3)
            getCityName(city)
                .then(resp => {
                    for (let key in resp.data) {
                        if (key != 'limit' && key != 'balance')
                            tmp.push(resp.data[key]);
                    }
                    setCityList([...tmp]);
                })
    }

    return (
        <div>
            {message && <div className={c.message}><span>{message}</span><span className={c.close} onClick={() => setMessage('')}>&times;</span> </div>}
            <div className={c.inputForm}>
                <div className={c.inputField}>
                    <input type='text' placeholder='Введите город' value={city} onChange={(e) => getCityList(e, city)} /> <br />
                    {cityList && <select onChange={(e) => getCity(e.target.value)}>{cityList.map(item => <option>{item.name}</option>)}</select>}
                </div>
                <button onClick={() => getCity(city)}>Найти город</button>
            </div>
            <div className={c.list}>
                {getList()}
            </div>
        </div>
    )
}

export default WeatherList;
