import React, {useEffect, useState} from 'react';
import NotesService from "../service/NotesService";

function Currency() {

    const [currency, setCurrency] = useState([]);

    useEffect(() => {
        NotesService.getCurrency()
            .then(response => {
                console.log('Printing response!', response.data);
                setCurrency(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    return (
        <div className="main-content">
            <h4>Currency of NBP</h4>
            <h8>EUR/PLN:</h8>
            <div className="mb-3">{currency}</div>
        </div>
    );
}
export default Currency;