import React from "react";
import {Country} from "../../type";
import "./AlertCountry.css";

interface Props {
  country: Country;
}

const AlertCountry: React.FC<Props> = React.memo(({country}) => {

  return (
    <span className={"alertCountry alert alert-info w-100 p-2 m-0 link-info"}>
      {country.name}
    </span>
  );
});

export default AlertCountry;