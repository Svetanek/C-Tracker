import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {
  MenuItem,
  FormControl,
  Select

} from "@material-ui/core";
import InfoBox from "./InfoBox";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const {data} = await axios.get("https://disease.sh/v3/covid-19/countries")
        const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));
          setCountries(countries);
      } catch (error) {
        console.error(error);
      }

      // await fetch("https://disease.sh/v3/covid-19/countries")
        // .then((response) => response.json())
        // .then((data) => {
        //   const countries = data.map((country) => ({
        //     name: country.country,
        //     value: country.countryInfo.iso2,


          // const sortedData = sortData(data);
          // setTableData(sortedData);
          // setMapCountries(data);

        // });
    };
    getCountriesData();
  }, [])

  const onCountryChange =  (e) => {
    //value  is equal to index
const countryCode = e.target.value;
setCountry(countryCode)

  }

  return (
    <div className="app">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app__dropdown">
        <Select value={country} variant="outlined" onChange={onCountryChange}>
         <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country, i) => (
            <MenuItem value={country.value} key={i}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox title="Coronovirus Cases" cases="123" total="2000"/>
        <InfoBox title="Recovered" cases="123"  total="2000"/>
        <InfoBox title="Deaths" cases="0"  total="0"/>

      </div>



      {/*Map*/}
    </div>
  );
}

export default App;
