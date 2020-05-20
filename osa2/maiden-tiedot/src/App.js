import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  // get country data
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        // set country data
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
      <Countries countries={countries} newFilter={newFilter} handleFilterChange={handleFilterChange} />
    </div>
  )
}

export default App
