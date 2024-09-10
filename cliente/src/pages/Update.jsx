import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    descr: "",
    price: null,
    cover: ""
  })

  const navigate = useNavigate()
  const bookId = useLocation().pathname.split("/")[2]

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleClick = async e => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8800/libros/${bookId}`, book)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      <div className="form">
        <h1>Update the book</h1>
        <input type="text" placeholder='title' onChange={handleChange} name="title" />
        <input type="text" placeholder='descr' onChange={handleChange} name="descr" />
        <input type="number" placeholder='price' onChange={handleChange} name="price" />
        <input type="text" placeholder='cover' onChange={handleChange} name="cover" />
      </div>
      <button className="formButton" onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update
