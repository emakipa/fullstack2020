import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

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
