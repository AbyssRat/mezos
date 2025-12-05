import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  //Készíts egy olyan alkalmazást, amelyben a letárolt adatokat a kereső mező tartalma alapján szűrni lehet

  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data)
        setFilteredData(response.data)
      })
      .catch(error => console.error('Error fetching data:', error))
  }, [])
  useEffect(() => {
    const results = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredData(results)
  }, [searchTerm, data])


  return (
    <>
      <div className="App">
        <h1>keresős</h1>
        <input
          type="text"
          placeholder="név alapján keress..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredData.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>

     
    </>
  )
}

export default App
