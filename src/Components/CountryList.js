import React, { useEffect, useState } from "Components/node_modules/react";

export const CountryList = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then(res => res.json())
      .then((countries) => {
        setCountries(countries);
      })
  }, []);


  return (
    <div className="countryList">
      {countries.map(country => (
        <div>
          <h1>{country.name}</h1>
          <h2>{country.capital}</h2>
          <p>{country.population}</p>
          <p>{country.currencies[0].code}</p>
        </div>
      ))}
    </div>
  );
};