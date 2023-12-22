import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function EnterNumbers() {
    const [numbers, setNumbers] = useState(''); //Stores entered numbers and the resulting json
    const [bstJson, setBstJson] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedNumbers = numbers.replace(/,/g, ' ');
        const params = new URLSearchParams();
        params.append('numbers', formattedNumbers);
        try {
            const response = await axios.post('http://localhost:8080/treeify/process-numbers', params);
            setBstJson(response.data);
        } catch (error) {
            console.error('Error with number processing:', error); //Catches and reports errors
        }
    };

    return (
        <div>
            <h1>Enter Numbers</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={numbers}
                    onChange={(e) => setNumbers(e.target.value)}
                    placeholder="Ex; 1,2,3"
                />
                <button type="submit">Create Tree</button>
            </form>
            {bstJson && <pre>{JSON.stringify(bstJson, null, 2)}</pre>}
            <Link to="/previous-trees">View Previous Trees</Link>
        </div>
    );
}

export default EnterNumbers; //Exports the file so it can be used by other files