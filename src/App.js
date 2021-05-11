import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {
  MenuItem,
  FormControl,
  Select, Card, CardContent

} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from './Map'
import Table from './Table'
import {sortData} from './utils'
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect( () => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get("https://disease.sh/v3/covid-19/all");
        setCountryInfo(data);
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()


  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const {data} = await axios.get("https://disease.sh/v3/covid-19/countries")
        const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));

         const sortedData = sortData(data)

          setTableData(sortedData)
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

  const onCountryChange = async (e) => {
    //value  is equal to index
const countryCode = e.target.value;
setCountry(countryCode)
const url =
countryCode === "worldwide"
  ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  const {data} = await axios.get(url)
  setCountry(countryCode);
  setCountryInfo(data);

  // await fetch(url)
  // .then((response) => response.json())
  // .then((data) => {
  //   setCountry(countryCode);
    // setCountryInfo(data);
  // });
  }
  console.log(countryInfo);

  return (
    <div className="app">
      <div className="app__left">
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
        <InfoBox title="Coronovirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered}/>
        <InfoBox title="Deaths" cases={countryInfo.todayDeaths}   total={countryInfo.deaths}/>
      </div>
      <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
        </CardContent>
         </Card>


    </div>
  );
}

export default App;
