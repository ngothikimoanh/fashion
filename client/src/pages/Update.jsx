import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
    const [fashion, setFashion] = useState({
        name: "",
        desc: "",
        price: null,
        cover: "",
    });
    const [error, setError] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();

    const fashionId = location.pathname.split("/")[2];

    const handleChange = (e) => {
        setFashion((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:5000/fashions/${fashionId}`, fashion);
            navigate("/");
        } catch (err) {
            console.log(err);
            setError(true);
        }
    };

    return (
        <div className="form">
            <h1>Update the clothes</h1>
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
            <button onClick={handleClick}>Update</button>
            {error && "Something went wrong!"}
            <Link to="/">See all Clothings</Link>
        </div>
    );
};

export default Update;
