import React, { useEffect, useState } from "react";
import useDebounce from 'useDebounce';
import { CurrencyExchange } from './CurrencyExchange';

export const SearchBar = () => {

  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      searchCountries(debouncedSearchTerm).then(results => {
        setIsSearching(false);
        // Filter out results
        setResults(results);
        if (results.length > 0) {
          setError(false);
        }
      }).catch(
        setError(true)
      )
    } else {
      setResults([]);
    }
  },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  function searchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`)
      .then(res => res.json())
  }

  return (
    <div>
      <div>
        <input
          placeholder="Search Countries"
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {isSearching && <div>Searching ...</div>}
      {error && <div>Country not found. </div>}

      {results.length > 0 &&
        results.map(country => (
          <div
            key={country.cioc}
            style={{
              display: 'inline-block',
              width: '200px',
              margin: '10px'
            }}
          >

            <div>
              <h1>{country.name}</h1>
              <h2>{country.capital}</h2>
              <p>{country.population}</p>
              <p>{country.currencies[0].code}</p>
            </div>

            <CurrencyExchange
              currencyOfCountry={country.currencies[0].code}
            />

          </div>

        ))
      }
    </div>
  );

}




