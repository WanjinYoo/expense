import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import axios from "axios";
import { SERVER_URL, axiosConfig } from "../environment.js"
import { useNavigate } from "react-router";


export default function Expense() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [categories, setCategories] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState(null);


    useEffect(() => {
        axios.get(`${SERVER_URL}/categories`, axiosConfig).then(
            (res) => {
                setCategories(res.data);
            }
        )
    }, [])

    const addExpense = (event) => {
        event.preventDefault();
        if(!selectedCategories || !Number(selectedCategories)) {
            setError('Please select a category')
            return;
        }
        axios
            .post(`${SERVER_URL}/expenses/create`, {
                name: name,
                cost: cost,
                categoryID: selectedCategories,
            }, axiosConfig)
            .then(
                (res) => {
                    if (res.status == 200) {
                        navigate('/');
                    }
                    else {
                        setError('Database Error')
                    }
                }
            )
    }
    const options = categories ? categories.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.name}</option>
        )
    }) : null;
    const handleChange = (e) => {
        if(e.target.value) {
            console.log(e.target.value);
            setSelectedCategories(e.target.value);
        }
    }
    return (
        <>
            <div style={{ padding: '10%' }}>
                <Helmet>Add Expense Page</Helmet>
                <div style={{fontWeight:800, fontSize:'1.5rem'}}>Add Expense</div>

                {error && <small>{error}</small>}

                <form onSubmit={addExpense}>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" onChange={(event) => setName(event.target.value)} placeholder="name" required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="cost">Cost</label>
                        <input type="number" className="form-control" placeholder="cost" onChange={(event) => setCost(event.target.value)} required />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="categories">Categories</label>
                        <select onChange={handleChange}  className="form-select" aria-label="Default select example">
                            <option defaultValue>Open this select menu</option>
                            {options}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>
        </>
    )
}