import { useEffect, useState } from 'react';


function App() {
    const [people, setPeople] = useState();
    const [sortAgeOrder, setAgeSortOrder] = useState("asc");

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
                    <th onClick={changeAgeSort} style={{ cursor: "pointer" }}>Age</th>
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

    function changeAgeSort() {
        

        if (people != undefined) {
            alert("Age sort not null was clicked");

            
        }
    }

    async function populatePersonData() {
        try {

            const sortOrder = "asc";        // Set to "asc" for ascending or "desc" for descending
            const sortColumn = "name";      // The column to sort by, e.g., "name" or "age"
            const searchQuery = "Alice";    // The search query, e.g., a name or partial string to filter results

            const requestPayload = {
                sortOrder,
                sortColumn,
                searchQuery,
            };



            const response2 = await fetch('/person/GetData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestPayload),
            });
            console.log("Response status:", response2.status); // Check the HTTP status code
            const text2 = await response2.text(); // Log the full response as text

            console.log("Response body:", text2); // This will log the raw HTML or JSON

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
