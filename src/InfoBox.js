import React from 'react';
import { Card, CardContent, Typography } from "@material-ui/core";
import "./InfoBox.css";

function InfoBox({title, cases, total, isRed, isGrey, ...props}) {
  return (
<Card className="infoBox">
  <CardContent>
    {/* Title */}
    <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of Cases */}
        <h2 className="infoBox__cases" color="textSecondary"
          // className={`infoBox__cases ${!isRed && "infoBox__cases--green"} ${
          //   isGrey && "infoBox__cases--grey"
          // }`}
        >
          {/* {props.isloading ? <i className="fa fa-cog fa-spin fa-fw" /> : cases} */}
         {cases}
        </h2>

        {/* Total Cases */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
  </CardContent>
</Card>
  )
}

export default InfoBox
