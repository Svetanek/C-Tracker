import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import numeral from 'numeral';
import "./InfoBox.css";

function InfoBox({title, cases, total, totalPerMil, onClick, ...props}) {

  const {isRed, isGreen, isPurple} = props
  return (
<Card onClick={onClick} className={`infoBox ${isRed && ("infoBox--red")} ${isGreen && ("infoBox--green")} ${isPurple && ("infoBox--purple")}`}>
  <CardContent>
    {/* Title */}
    <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of Cases */}
        <h2 className="infoBox__cases" color="textSecondary">
          {/* {props.isloading ? <i className="fa fa-spinner fa-pulse fa-fw spinner"></i> : cases} */}
          {cases}
        </h2>
        {/* Total Cases */}
        <Typography className="infoBox__total" color="textSecondary">
          {numeral(total).format("0,0")} Total
        </Typography>
        <Typography className="infoBox__total" color="textSecondary">
          {numeral(totalPerMil).format("0,0")} Total Per Million ({numeral(totalPerMil/1000000).format('0.000%')})
        </Typography>
  </CardContent>
</Card>
  )
}

export default InfoBox
