import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet';
import axios from "axios";
import { SERVER_URL, axiosConfig } from "../environment.js"
import TableRows from "./assets/TableRows"
import { useNavigate } from "react-router";


export default function Landing() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [ExpenseData, setExpenseData] = useState([]);
    const [CategoryData, setCategoryData] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        setLoading(true);
        axios.all([
            axios.get(`${SERVER_URL}/expenses`, axiosConfig),
            axios.get(`${SERVER_URL}/categories`, axiosConfig)
        ])
            .then(axios.spread((expense, categories) => {
                setLoading(false);
                if (expense.status == 200 && categories.status == 200) {
                    console.log(expense.data);
                    setExpenseData(expense.data);
                    setCategoryData(categories.data);
                }
                else {
                    setError('Error Occured')
                }
            }));
    }, [])



    const deleteTableRows = (type, id) => {
        axios
            .post(`${SERVER_URL}/${type}/delete`, {
                id: id
            }, axiosConfig)
            .then((res) => {
                if (res.status == 200) {
                    window.location.reload();
                }
            }
            )
    }
    return (
        <>
            <Helmet>Landing Page</Helmet>
            <div className="container mt-5">
                <div className="row">
                    <div style={{fontWeight:800, fontSize:'1.5rem'}}>Exnpense</div>
                    <div className="col-sm-12">
                        {!error ? <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Cost</th>
                                    <th>CategoryName</th>
                                    <th><button className="btn btn-outline-success" onClick={() => navigate(`/addexpenses`)}>+</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows type={'expenses'} rowsData={ExpenseData} deleteTableRows={deleteTableRows} />
                            </tbody>
                        </table> : error}
                    </div>
                    <div style={{fontWeight:800, fontSize:'1.5rem'}}>Categories</div>
                    <div className="col-sm-12">
                        {!error ? <table className="table">
                            <thead>
                                <tr>
                                    <th>Name</th>

                                    <th><button className="btn btn-outline-success" onClick={() => navigate(`/addcategories`)}>+</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows type={'categories'} rowsData={CategoryData} deleteTableRows={deleteTableRows} />
                            </tbody>
                        </table> : error}
                    </div>

                </div>
            </div>
        </>
    )
}