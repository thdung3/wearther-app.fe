import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Spinner from '../../components/Spinner'

export default function HomePage() {
    const history = useHistory()
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const [city, setCity] = useState(null)
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((post) => {
                callCurrentPositionWeather(post.coords.latitude, post.coords.longitude)
            })
        } else {
            alert("Sorry, browser does not support geolocation!")
        }
    }

    const onSearch = (city) => {
        history.push(`/${city}`)
        // callWeather(city)
    }

    const myChangeHandler = (event) => {
        setCity(event.target.value)
    }

    const handleKey = (event) => {
        if (event.key === 'Enter') {
            onSearch(city)
        }
    }

    useEffect(() => {
        getLocation()
    }, [])

    const callCurrentPositionWeather = async (latitude, longitude) => {
        try {
            let url = `http://localhost:5000/weather/position?lat=${latitude}&long=${longitude}`
            let data = await fetch(url)
            let result = await data.json();
            if (data.status === 200) {
                setWeather(result.data)
                console.log('result.data:', result.data)
                setLoading(false)
            } else {
                throw (result.message)
            }
        } catch (err) {
            console.log('WeatherPage.CallWeather.err:', err)
        }
    }

    if (loading) {
        return <div><Spinner></Spinner></div>
    }
    return (
        <div className="container mx-auto my-4 py-4">
            <div className="row search-area justify-content-center">
                <label>City Name </label>
                <input id='txtSearch' type='text' onChange={(e) => myChangeHandler(e)} onKeyPress={(e) => handleKey(e)} />
                <input id='btnSearch' type='submit' value='Seach' onClick={() => this.onSearch(city)} />
            </div>
            <div className="row justify-content-center text-center">
                <h1 className="col-12 display-4 my-2 py-3 text-success">Weather App</h1>
                <h2 className="col-12">{weather.name}</h2>
                <h3 className="col-12 text-danger">{weather.main.temp}°C</h3>
                <h3 className="col-12">{weather.weather[0].description}</h3>
            </div>
        </div>
    )
}
