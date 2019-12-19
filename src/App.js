import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./app.css"

function App() {

  const [inputData, setInputData] = useState("")
  const [news, setNews] = useState([])
  const [search, setSearch] = useState("react")

  const fetchNews = async () => {
    let response
    try { 
      response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${search}`)
      setNews(response.data.hits)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSearch(inputData)
  }
  
  const handleInput = (e) => {
    setInputData(e.target.value)
  }

  useEffect(() => {
    fetchNews()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const divStyle = {
    height: "100vh",
  }

  const mainStyle = {
    borderLeft: "1px solid #cfcfe5",
    borderRight: "1px solid #cfcfe5"
  }


  return (
    <div style={divStyle}>
      <div style={mainStyle} className="container h-25 text-center search">
        <form onSubmit={handleSubmit}>
          <div className="md-form">
            <input className="form-control" placeholder="Search for some news" value={inputData} onChange={handleInput}></input>
            <button type="submit" className="btn btn-outline-primary">Search</button>
          </div>
        </form>
      </div>
      <div style={mainStyle} className="news container">
        {news.map((n, i) => (
          <div key={i} className="row">
            <div className="col">
              <span className="align-middle">{n.title}</span>
            </div>
            <div className="col text-truncate">
              <a className="text-truncate" href={n.url}>{n.url}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
