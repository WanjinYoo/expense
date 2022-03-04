import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import axios from "axios";
import { SERVER_URL, axiosConfig } from "../environment.js"
import TableRows from "./assets/TableRows"
import { useNavigate  } from "react-router";


export default function Categories() {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const addCategory = (event) => {
        event.preventDefault();

        axios
            .post(`${SERVER_URL}/categories/create`, {
                name: name,
            }, axiosConfig)
            .then(
                (res) => {
                    console.log(res);
                    if(res.status == 200) {
                        navigate('/');
                    }
                    else {
                        setError('Database Error')
                    }
                }
            )

    }
    return (
        <>
            <div style={{ padding: '10%' }}>
                <Helmet>Add Category Page</Helmet>
                <div style={{fontWeight:800, fontSize:'1.5rem'}}>Add Category</div>

                {error && <small>{error}</small>}
                <form onSubmit={addCategory}>
                    <div className="form-group mt-2">
                        <label htmlFor="exampleInputEmail1">Name</label>
                        <input onChange={(event) => setName(event.target.value)} type="text" className="form-control" placeholder="name" required />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3">Submit</button>
                </form>
            </div>

        </>
    )
}