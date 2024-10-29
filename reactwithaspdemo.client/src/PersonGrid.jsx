import { useEffect, useState } from 'react';


function App() {
    const [people, setPeople] = useState();

    useEffect(() => {
        populatePersonData();
    }, []);

    const contents = people === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>Email</th>
                    <th>City</th>
                </tr>
            </thead>
            <tbody>
                {people.map(person =>
                    <tr key={person.email}>
                        <td>{person.firstName}</td>
                        <td>{person.lastName}</td>
                        <td>{person.age}</td>
                        <td>{person.email}</td>
                        <td>{person.city}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Person Data</h1>
            <p>This component demonstrates fetching custom data from the server.</p>
            {contents}
        </div>
    );


    async function populatePersonData() {
        try {
            const response = await fetch('/person');
            console.log("Response status:", response.status); // Check the HTTP status code
            const text = await response.text(); // Log the full response as text
            console.log("Response body:", text); // This will log the raw HTML or JSON

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Only attempt to parse as JSON if the content-type is JSON
            if (response.headers.get('content-type')?.includes('application/json')) {
                const data = JSON.parse(text); // Parse JSON if it's valid
                setPeople(data);
            } else {
                console.error('Response is not JSON:', text);
            }
        } catch (error) {
            console.error('Error fetching person data:', error);
        }
    }

}

export default App;
