import React from "react";
import {Countries} from "../../type";
import "./AlertCountry.css";

interface Props {
  country: Countries;
  showCountry: (alpha3Code: string) => void;
}

const AlertCountry: React.FC<Props> = React.memo(({country, showCountry}) => {


  return (
    <span className={"alertCountry alert alert-info w-100 p-2 m-0 link-info"} onClick={() => showCountry(country.alpha3Code)}>
      {country.name}
    </span>
  );
});

export default AlertCountry;