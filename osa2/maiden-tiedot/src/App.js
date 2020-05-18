import React, { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css';
import Filter from './components/Filter';
import Countries from './components/Countries';

const App = () => {
  const [ countries, setCountries] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')

  // get data from server
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // set initial state data
        setCountries(response.data)
      })
  }, [])

  // filter input
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>      
      <Filter text="find countries " value={newFilter} onChange={handleFilterChange} />
      <Countries countries={countries} newFilter={newFilter} />
    </div>
  )
}

export default App;
