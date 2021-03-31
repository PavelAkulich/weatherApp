import { React } from 'react';
import c from './WeatherItem.module.css'

const WeatherItem = ({ item, delItem, updateItem }) => {
    const degSryle = {
        WebkitTransform: 'rotate(' + (item.wind.deg - 90) + 'deg)', //Chrome, Safari
        MozTransform: 'rotate(' + (item.wind.deg - 90) + 'deg)', //Firefox
        OTransform: 'rotate(' + (item.wind.deg - 90) + 'deg)',//Opera
        msTransform: 'rotate(' + (item.wind.deg - 90) + 'deg)', //IE
        transform: 'rotate(' + (item.wind.deg - 90) + 'deg)',
        display: 'inline-block'
    }

    return (<div className={c.listItem}> 
        <div>Город: {item.name}</div>
        <div>Температура: {item.main.temp}°C <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt={item.weather[0].description} /></div>
        <div>Влажность: {item.main.humidity}%</div>
        <div>Атмосферное давление: {item.main.pressure}</div>
        <div>Сила и направление ветра: {item.wind.speed}м/c <div style={degSryle}>&#10148;</div>{item.wind.deg}</div>
        <div>Последнее обновление данных (на сервере): {new Date(item.dt * 1000).toLocaleString()}</div>
        <div>Последнее обновление данных (локально): {item.sysDate.toLocaleString()}</div>
        <div>
        <button onClick={() => updateItem(item.id)}>Обновить</button>
        <button onClick={() => delItem(item.id)}>Удалить</button>
        </div>
    </div>
    )
}

export default WeatherItem;