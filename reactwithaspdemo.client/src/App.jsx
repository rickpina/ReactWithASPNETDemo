import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [forecasts, setForecasts] = useState();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateWeatherData() {
        //const response = await fetch('weatherforecast');
        //const data = await response.json();
        //setForecasts(data);

        try {
            const response = await fetch('/weatherforecast');
            console.log("Response status:", response.status); // Check the HTTP status code
            const text = await response.text(); // Log the full response as text
            console.log("Response body:", text); // This will log the raw HTML or JSON

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Only attempt to parse as JSON if the content-type is JSON
            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = JSON.parse(text); // Parse JSON if it's valid
                setForecasts(data);
            } else {
                console.error('Response is not JSON:', text);
            }
        } catch (error) {
            console.error('Error fetching person data:', error);
        }
    }
}

export default App;