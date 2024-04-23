import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_fashion",
});

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/fashions", (req, res) => {
    const q = "SELECT * FROM fashions";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/fashions", (req, res) => {
    const q = "INSERT INTO fashions(`name`, `desc`, `price`, `cover`) VALUES (?)";

    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.delete("/fashions/:id", (req, res) => {
    const fashionId = req.params.id;
    const q = " DELETE FROM fashions WHERE id = ? ";

    db.query(q, [fashionId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.put("/fashions/:id", (req, res) => {
    const fashionId = req.params.id;
    const q = "UPDATE fashions SET `name`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

    const values = [
        req.body.name,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ];

    db.query(q, [...values, fashionId], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
    });
});

app.listen(port, () => {
    console.log(`Connected to port: ${port}`);
});
