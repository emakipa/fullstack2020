import React from 'react'
import Button from './Button'
import Weather from './Weather'

const Countries = (props) => {

  // filter countries
  const filteredCountries = props.countries.filter(country => 
    country.name.toLowerCase().includes(props.newFilter.toLowerCase())
  )
  
  if (filteredCountries.length > 10) { // more than 10 countries
    return (
      <p>
        Too many countries, specify another filter 
      </p>
    ) 
  } else if (filteredCountries.length > 1) { // 2 - 10 countries
      return (
        <div>
          {filteredCountries.map(country => 
            <p key={country.name}> 
              {country.name} <Button name={country.name} handleClick={props.handleFilterChange} text="show" />
            </p>
          )}
        </div>  
      )
  } else if (filteredCountries.length === 1) { // 1 country
      return (
        <div>
          <h2>{filteredCountries[0].name} </h2> 
        
          <p>capital: {filteredCountries[0].capital}</p>
          <p>population: {filteredCountries[0].population}</p>
        
          <h3>Spoken languages </h3>

          <ul>
            {filteredCountries[0].languages.map(language =>
              <li key={language.name}> 
                {language.name}
              </li>
            )}    
          </ul>

          <img src={filteredCountries[0].flag} alt="Flag" width="100px" height="100px" />
        
          <h3>Weather in {filteredCountries[0].capital} </h3>
        
          <Weather location={filteredCountries[0].capital} />
        
        </div>           
      )
  } else {
    return null
  }
}

export default Countries