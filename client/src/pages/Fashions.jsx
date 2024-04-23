import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Fashions = () => {
    const [fashions, setFashions] = useState([]);

    useEffect(() => {
        const fetchAllFashions = async () => {
            try {
                const res = await axios.get("http://localhost:5000/fashions");
                setFashions(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchAllFashions();
    }, []);

    console.log(fashions);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/fashions/${id}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Fashion store</h1>
            <div className="fashions">
                {fashions.map((fashion) => (
                    <div key={fashion.id} className="fashion">
                        <img src={fashion.cover} alt="" />
                        <h2>{fashion.name}</h2>
                        <p>{fashion.desc}</p>
                        <span>${fashion.price}</span>
                        <button className="delete" onClick={() => handleDelete(fashion.id)}>Delete</button>
                        <button className="update">
                            <Link
                                to={`/update/${fashion.id}`}
                                style={{ color: "inherit", textDecoration: "none" }}
                            >
                                Update
                            </Link>
                        </button>
                    </div>
                ))}
            </div>

            <button className="addHome">
                <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
                    Add new Clothes
                </Link>
            </button>
        </div>
    );
};

export default Fashions;
