import React, {useState, useEffect} from 'react';
import numeral from 'numeral';
import './Table.css'

function Table({countriesSortedByCases, countriesSortedByDeath, option, ...props}) {
  const [isLoading, setLoading] = useState(true)
  const [countries, setCountries] = useState(countriesSortedByCases)
  const [data, setData] = useState("cases")


  useEffect(() => {
    if((option === "live-cases")) {
      setCountries(countriesSortedByCases);
      setData("cases")
    }
    if((option === "deaths-per-million")) {
      setCountries(countriesSortedByDeath);
      setData("deathsPerOneMillion")
    }
    setLoading(false)
  }, [option, countriesSortedByCases, countriesSortedByDeath])
  // const countries = (option === "live-cases")? countriesSortedByCases : countriesSortedByDeath;
  // const data = (option === "live-cases")? "cases" : "deathsPerOneMillion";

  return (

    <div className="table">
      {isLoading || props.isLoading ?  <i className="fa fa-spinner fa-pulse fa-fw spinner"></i> : (
         <table >
         <tbody>
         {countries.map( (country, i) => (
           <tr key ={i}>
             <td>{country.country}</td>
             <td>
              {<strong>{numeral(country[data]).format('0,0')}</strong>}
             </td>
           </tr>
         ))}
         </tbody>
       </table>
       ) }

    </div>
  )
}

export default Table
