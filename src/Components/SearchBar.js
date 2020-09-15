import React, { useEffect, useState } from "react";
import useDebounce from "Hooks/useDebounce";
import { CurrencyExchange } from "./CurrencyExchange";

export const SearchBar = () => {
  const [error, setError] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  // API search results
  const [results, setResults] = useState([]);
  // Searching status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms
  // As a result the API call should only fire once user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCountries(debouncedSearchTerm)
          .then((results) => {
            setIsSearching(false);
            // Filter out results
            setResults(results);
            if (results.length > 0) {
              setError(false);
            }
          })
          .catch(setError(true));
      } else {
        setResults([]);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  function searchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then((res) =>
      res.json()
    );
  }

  return (
    <div>
      <div>
        <input
          className="searchbar-input"
          placeholder="Start typing"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {isSearching && <p>Searching ...</p>}
      {error && <h2>Country not found. </h2>}

      {results.length > 0 &&
        results.map((country) => (
          <div key={country.cioc}>
            <ul className="country-list">
              <li>Country: {country.name}</li>
              <li>Capital: {country.capital}</li>
              <li>Number of population: {country.population}</li>
              <li>Currency: {country.currencies[0].code}</li>
            </ul>

            <CurrencyExchange currencyOfCountry={country.currencies[0].code} />
          </div>
        ))}
    </div>
  );
};
