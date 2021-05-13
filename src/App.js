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
import LineGraph from './LineGraph'
import {sortData, prettyPrintStat} from './utils';
import './App.css';
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

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
          setMapCountries(data)
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
  console.log("INFO", countryInfo)
  if (countryCode !== 'worldwide') {
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(5);
}
else {
    setMapCenter([34.80, -40.47]);
    setMapZoom(4);
}


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
        <InfoBox title="Coronovirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases}/>
        <InfoBox title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)}  total={countryInfo.recovered}/>
        <InfoBox title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)}   total={countryInfo.deaths}/>
      </div>
      <Map center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType}/>
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide new cases</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
        </CardContent>
         </Card>


    </div>
  );
}

export default App;
