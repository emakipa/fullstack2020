import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import personService from './services/data'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)
  const [ message, setMessage ] = useState('')
  const [ messageType, setMessageType ] = useState('')

  // get data from server
  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          // set initial state data
           setPersons(initialPersons)
        })
  }, [])

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  // add a new person (name and number) to phonebook
  const addName = (event) => {
    event.preventDefault()

    let newPerson = true
    let personId = 0
    
    // check if person is already added to phonebook
    persons.forEach((person) => {
      if (person.name === newName) {
        newPerson = false
        personId = person.id
      }
    })
  
    const nameObject = {
      name: newName,
      number: newNumber,
    }
    
    if (newPerson) {
      // add data (new name and number)
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(error.response.data.error)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 3000) 
        })
        setMessage(`Added ${newName}`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 3000)      
    } else {
      // person already exists, number to be updated
      
      let choice = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`) 

      if(choice) {
        // number change confirmed, number is updated
        const person = persons.find(person => person.name === newName)
        const updatedPerson = { ...person, number: newNumber }
        personService
          .update(personId, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
          })
          .then(() => { 
            setMessage(`Updated ${nameObject.name}'s number`)
            setMessageType('success')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error.response.data)
            setMessage(error.response.data.error)
            setMessageType('error')
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          }) 
      }
    }
  }

  // delete selected name and number
  const removeName = (id) => {
    const deletedPerson = persons.find(p => p.id === id)
 
    if (window.confirm(`Delete ${deletedPerson.name} ?`)) { 
      // deletion corfirmed
      
      personService
        .deleteSelected(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Removed information of ${deletedPerson.name}`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {
          console.log(error.response.data)
          setMessage(`Information of ${deletedPerson.name} has already been removed`)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        }) 
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

  const handleDeletion = (id) => {
    removeName(id)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType}/>

      <Filter text='filter shown with ' value={newFilter} onChange={handleFilterChange}  />

      <h3>Add a new</h3>
      
      <PersonForm 
        onSubmit={addName}
        nameText='name: '
        nameValue={newName}
        nameOnChange={handleNameChange}
        numberText='number: '
        numberValue={newNumber}
        numberOnChange={handleNumberChange}
      />
      
      <h3>Numbers</h3>

      <>
        {personsToShow.map((person) => 
          <div key={person.id}>
            <Person name={person.name} number={person.number} onClick={() => handleDeletion(person.id)} text='delete' />
          </div>
        )}
      </>      
    </div>
  )
}

export default App
