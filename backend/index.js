import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud"
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hola esto es el backend");
})

app.get("/libros", (req, res) => {
    const q = "SELECT * FROM libros";
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.post("/libros", (req, res) => {
    const q = "INSERT INTO libros(`title`, `descr`, `price`, `cover`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json("Libro creado con éxito")
    })
})


app.delete("/libros/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM libros WHERE id_libro = ?";
    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Libro eliminado con éxito")
    }
    )
})
app.put("/libros/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE libros SET `title` = ?, `descr` = ?, `price` = ?, `cover` = ? WHERE id_libro = ?";
    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover
    ]

    db.query(q, [...values, bookId], (err, data) => {
        if (err) return res.json(err)
        return res.json("Libro eliminado con éxito")
    }
    )
})


app.listen(8800, () => {
    console.log("Conectado al Backend!");
})
