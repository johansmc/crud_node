import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Books = () => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        const fecthAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8800/Libros")
                setBooks(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fecthAllBooks()
    }, [])

    const handleDelete = async (id) => {
        try {
            await axios.delete("localhost:8800/Libros" + id)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }

        return (
            <div>
                <h1>Books </h1>
                <div className="books">
                    {books.map((book) => (
                        <div className="book" key={book.id}>
                            {book.cover && <img src={books.cover} alt="" />}
                            <h2>{book.title}</h2>
                            <p>{book.descr}</p>
                            <span>{book.price}</span>
                            <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button>
                            <br />
                            <button className="update">Update</button>
                        </div>

                    ))}

                </div>
                <button>
                    <Link to="/add">Add new book</Link>
                </button>
            </div>
        )
    }
}
export default Books
