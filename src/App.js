import './App.css';
import React from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
            <Route exact path="/" element={<News category="" />} />
            <Route exact path="/home" element={<News category="" />} />
            <Route exact path="/business" element={<News category="business" />} />
            <Route exact path="/entertainment" element={<News category="entertainment" />} />
            <Route exact path="/health" element={<News category="health" />} />
            <Route exact path="/science" element={<News category="science" />} />
            <Route exact path="/sports" element={<News category="sports" />} />
            <Route exact path="/technology" element={<News category="technology" />} />
        </Routes>
      </Router>
    </>
  )
}

