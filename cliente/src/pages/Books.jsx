import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'


const Books = () => {
    const [books, setBooks] = useState([])

    const Navigate = useNavigate()

    useEffect(() => {
        const fecthAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/libros")
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/libros/${id}`)
            Navigate(0)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1>Books </h1>
            <div className="books">
                {books.map((book) => (
                    <div className="book" key={book.id}>
                        {book.cover && <img src={book.cover} alt="" />}
                        <h2>{book.title}</h2>
                        <p>{book.descr}</p>
                        <span>{book.price}</span>
                        <button className="delete" onClick={() => handleDelete(book.id_libro)}>Delete</button>
                        <br />
                        <button className="update"><Link to={`/update/${book.id_libro}`}>Update</Link></button> <button className="update"></button>
                    </div>

                ))}

            </div>
            <button>
                <Link to="/add">Add new book</Link>
            </button>
        </div>
    )
}

export default Books
