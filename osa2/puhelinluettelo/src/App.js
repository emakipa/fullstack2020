import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  // get data from server
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        // set initial state data
        setPersons(response.data)
      })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  // add a new person (name and number) to phonebook
  const addName = (event) => {
    event.preventDefault()

    // check if person is already added to phonebook and add if not
    if (persons.map(person => person.name).includes(newName)) {    
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({'name':newName, 'number':newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  // filter input
  const handleFilterChange = (event) => {
    if (!(event.target.value === '')) {
      setShowAll(false)
    }
    setNewFilter(event.target.value)
  }
  
  // name input
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // number input
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter text="filter shown with " value={newFilter} onChange={handleFilterChange}  />

      <h3>Add a new</h3>
      
      <PersonForm 
        onSubmit={addName}
        nameText="name: "
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberText="number: "
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>
      
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App
