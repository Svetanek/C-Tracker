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
import {sortData,sortDataByDeathsPerMil, prettyPrintStat} from './utils';
import './App.css';
import 'leaflet/dist/leaflet.css'

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [countriesData, setCountriesData] = useState([]);
  const [casesType, setCasesType] = useState("cases");
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [tableOption, setTableOption] = useState('live-cases')
  const [tableData1, setTableData1] = useState([]);
  const [tableData2, setTableData2] = useState([]);
  const [isLoading, setLoading] = useState(false);


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
    setLoading(true)
    const getCountriesData = async () => {
      try {
        const {data} = await axios.get("https://disease.sh/v3/covid-19/countries")
        const countries = data.map((country) => ({
              name: country.country,
              value: country.countryInfo.iso2,
            }));


         const sortedData1 = sortData(data)
         const sortedData2 = sortDataByDeathsPerMil(data)

          setTableData1(sortedData1)
          setTableData2(sortedData2)
          setCountriesData(data)
          setCountries(countries);
          setLoading(false)


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
          // setCountriesData(data);

        // });
    };
    getCountriesData();
  }, [])

  const onCountryChange = async (e) => {
    setLoading(true);
const countryCode = e.target.value;
setCountry(countryCode)
const url =
countryCode === "worldwide"
  ? "https://disease.sh/v3/covid-19/all"
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  const {data} = await axios.get(url)
  setCountry(countryCode);
  setCountryInfo(data);
  setLoading(false);
  if (countryCode !== 'worldwide') {
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(5);
}
else {
    setMapCenter([34.80, -40.47]);
    setMapZoom(4);
}
  }

const onTableOptionChange = (e) => {
  const option = e.target.value;
  setTableOption(option)
}

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
        <InfoBox isRed={casesType === "cases"} title="New Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} totalPerMil={countryInfo.casesPerOneMillion}    isloading={isLoading} onClick={() => setCasesType("cases")}/>
        <InfoBox isGreen={casesType === "recovered"} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)}  total={countryInfo.recovered} totalPerMil={countryInfo.recoveredPerOneMillion} isloading={isLoading} onClick={() => setCasesType("recovered")}/>
        <InfoBox isPurple={casesType === "deaths"} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} totalPerMil={countryInfo.deathsPerOneMillion} isloading={isLoading} onClick={() => setCasesType("deaths")}/>
      </div>
      <Map center={mapCenter} zoom={mapZoom} countries={countriesData} casesType={casesType}/>
      </div>
      <Card className="app__right">
      <FormControl className="app__dropdown">
        <Select value={tableOption} variant="outlined" onChange={onTableOptionChange}>
         <MenuItem value="live-cases"><h3>Live Cases By Country</h3></MenuItem>
         <MenuItem value="deaths-per-million"><h3>Deaths per Million By Country</h3></MenuItem>
        </Select>
      </FormControl>
        <CardContent>
          {/* <h3>Live Cases by Country</h3> */}
          <Table isLoading={isLoading} countriesSortedByCases={tableData1} countriesSortedByDeath={tableData2} option={tableOption}/>
          <div className="app__graphContainer">
          <h3>Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType}/>
          </div>
        </CardContent>
         </Card>


    </div>
  );
}

export default App;
