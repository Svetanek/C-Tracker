
import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';




// // export const sortData = (data) => {
// //   //a copy
// //   const sortedData = [...data]
// //   sortedData.sort((a,b) => {
// //     if(a.cases > b.cases) {
// //       return -1
// //     }
// //     else return 1
// //   })
// //   return sortedData
// // }


const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    // rgb: "rgb(204,16,52)",
    // half_op: "rgba(204,16,52,0.5)",
    mulitiplier: 500,
  },

  recovered: {
    hex: "#7DD71D",
    // rgb: "rgb(125,215,29)",
    // half_op: "rgba(125,215,29,0.5)",
    mulitiplier: 300,
  },

  deaths: {
    hex: "#761CD6",
    // rgb: "rgb(118, 28, 214, 1)",
    // half_op: "rgba(251,68,67,0.5)",
    mulitiplier: 800,
  },
};


export const sortData = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => b.cases - a.cases);

  return sortedData;
};

export const sortDataByDeathsPerMil = (data) => {
  const sortedData = [...data];

  sortedData.sort((a, b) => b.deathsPerOneMillion - a.deathsPerOneMillion);

  return sortedData;
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";

//Draw circles on the map
export const showDataOnMap = (data, casesType) =>
  data.map((country, i) => (
    <Circle
      key={i}
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      // pathOptions={{
      //   color: casesTypeColors[casesType].hex,
      //   fillColor: casesTypeColors[casesType].hex,
      // }}
      radius={
        Math.sqrt(country[casesType] / 10) *
        casesTypeColors[casesType].mulitiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
