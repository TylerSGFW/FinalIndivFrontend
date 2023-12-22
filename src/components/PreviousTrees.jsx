import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PreviousTrees() {
    const [trees, setTrees] = useState([]); //Stores previous trees

    useEffect(() => {
        const fetchTrees = async () => {
            try {
                const response = await axios.get('http://localhost:8080/treeify/previous-trees');
                const parsedTrees = response.data.map(tree => JSON.parse(tree));
                setTrees(parsedTrees);
            } catch (error) {
                console.error('Error getting trees:', error); //Catches and reports errors
            }
        };

        fetchTrees();
    }, []);

    return (
        <div>
            <h1>Previous Trees</h1>
            {trees.map((tree, index) => (
                <div key={index}>
                    <h3>Tree #{index + 1}</h3>
                    <pre>{JSON.stringify(tree, null, 2)}</pre>
                </div>
            ))}
        </div>
    );
}

export default PreviousTrees; //Exports file so it can be used by other files