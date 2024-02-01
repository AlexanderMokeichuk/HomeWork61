import React from "react";
import "./AboutCountry.css";
import {Country} from "../../type";

interface Props {
  country: Country;
}

const AboutCountry: React.FC<Props> = React.memo(({country}) => {

  return (
    <div className={"d-flex flex-column p-3 h-100"}>
      <div className={"header d-flex h-50 flex-column justify-content-between"}>
        <div className={"aboutCountry d-flex justify-content-between h-25"}>
          <div>
            <div className={"mb-5"}>
              <h1>{country.name}</h1>
            </div>
            <div className={"d-flex flex-column"}>
              <span><strong>Capital</strong>: {country.capital}</span>
              <span><strong>Population</strong>: {country.population}</span>
            </div>
          </div>
          <img src={country.flags.svg || country.flags.png} alt={"#"} style={{width: 200, height: 100}}/>
        </div>

        <div className={"h-50"}>
          <h6>Square: {country.area}</h6>
          <div className={"h-100"}>
            <h5>Languages</h5>
            <div className={"h-50 borders overflow-y-auto"}>
              {country.languages.map((language, index) => {
                return <h6 key={`${index}${language.name}`}>{language.name}</h6>;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className={"body border border-3 h-50 p-4"}>
        <div className={"mt-3 h-100"}>
          {(country.borders)
            ? <>
              <h4>Borders with:</h4>
              <ul className={"borders h-75 overflow-y-auto"}>
                {country.borders.map((border, index) => {
                  return <li key={`${index}`}>{border}</li>
                })}
              </ul>
            </>
            : <h4>There are no borders</h4>
          }
        </div>
      </div>
    </div>
  );
});
export default AboutCountry;