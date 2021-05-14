import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from 'numeral';
import "./InfoBox.css";

function InfoBox({title, cases, total, onClick, ...props}) {

  const {isRed, isGreen, isPurple} = props
  return (
<Card onClick={onClick} className={`infoBox ${isRed && ("infoBox--red")} ${isGreen && ("infoBox--green")} ${isPurple && ("infoBox--purple")}`}>
  <CardContent>
    {/* Title */}
    <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of Cases */}
        <h2 className="infoBox__cases" color="textSecondary"
          // className={`infoBox__cases ${!isActive && "infoBox__cases--green"} ${
          //   isGrey && "infoBox__cases--grey"
          // }`}
        >
          {/* {props.isloading ? <i className="fa fa-cog fa-spin fa-fw" /> : cases} */}
         {cases}
        </h2>

        {/* Total Cases */}
        <Typography className="infoBox__total" color="textSecondary">
          {numeral(total).format("0,0")} Total
        </Typography>
  </CardContent>
</Card>
  )
}

export default InfoBox
