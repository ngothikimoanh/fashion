import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Add = () => {
    const [fashion, setFashion] = useState({
        name: "",
        desc: "",
        price: null,
        cover: "",
    });
    const [error, setError] = useState(false)

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFashion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    // console.log(fashion)

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/fashions", fashion);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true)
        }
    };

    return (
        <div className="form">
            <h1>Add New Clothes</h1>
            <input
                type="text"
                placeholder="Clothing name"
                name="name"
                onChange={handleChange}
            />
            <textarea
                rows={5}
                type="text"
                placeholder="Clothing desc"
                name="desc"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Clothing price"
                name="price"
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Clothing cover"
                name="cover"
                onChange={handleChange}
            />
            <button onClick={handleClick}>Add</button>
            {error && "Something went wrong!"}
            <Link to="/">See all clothes</Link>
        </div>
    );
};

export default Add;
