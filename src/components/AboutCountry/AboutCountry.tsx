import React, {useCallback, useEffect, useState} from "react";
import "./AboutCountry.css";
import {Borders, Country} from "../../type";
import axios from "axios";
import {GET_ONE_COUNTRY} from "../../constants";

interface Props {
  country: Country;
}

const AboutCountry: React.FC<Props> = React.memo(({country}) => {
  const [borders, setBorders] = useState<Borders[]>([]);

  const fetchData = useCallback(async (arrayBorders: string[]) => {
    const borders = arrayBorders.map(async (alpha3Code) => {
      const {data: border} = await axios.get<Country>(GET_ONE_COUNTRY + alpha3Code);
      return {
        name: border.name,
        flag: border.flags.svg
      };
    });

    const newBorders = await Promise.all(borders);
    setBorders(newBorders);
  }, []);

  useEffect(() => {
    if (country.borders) {
      void fetchData(country.borders);
    } else {
      setBorders([]);
    }
  }, [country.borders, fetchData]);

  const numberFormat = useCallback((number: number) => new Intl.NumberFormat("en", {notation: "compact"}).format(number), []);

  return (
    <div className={"d-flex flex-column p-3 h-100"}>
      <div className={"header d-flex h-50 flex-column justify-content-between"}>
        <div className={"aboutCountry d-flex justify-content-between h-25"}>
          <div>
            <div className={"mb-5 h-100"}>
              <h1 className={"text-info borders overflow-y-auto h-100"}>{country.name}</h1>
            </div>
            <div className={"d-flex flex-column"}>
              <span className={"text-secondary"}><strong
                className={"text-info"}>Capital</strong>: {country.capital}</span>
              <span className={"text-secondary"}><strong
                className={"text-info"}>Population</strong>: {numberFormat(country.population)}</span>
            </div>
          </div>
          <img src={country.flags.svg || country.flags.png} alt={"#"} style={{width: 200, height: 100}}/>
        </div>

        <div className={"h-50"}>
          <h6 className={"mb-1 text-info"}>Square: <strong
            className={"text-secondary"}>{numberFormat(country.area)} km²</strong></h6>
          <div className={"h-100"}>
            <h5 className={"text-warning  border-warning border-bottom"}>Languages</h5>
            <ul className={"h-50 text-warning borders overflow-y-auto"}>
              {country.languages.map((language, index) => {
                return <li key={`${index}${language.name}`}>{language.name}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className={"body border border-2 border-info rounded-4 h-50 p-4"}>
        <div className={"mt-3 h-100"}>
          {(country.borders)
            ? <>
              <h4 className={"text-info border-info border-bottom"}>Borders with:</h4>
              <div className={"borders h-75 text-info overflow-y-auto d-flex flex-column gap-3"}>
                {borders.map((border, index) => {
                  return (
                    <div className={"d-flex flex-row align-items-center justify-content-between"}
                         key={`${index}${border}`} style={{width: 300}}>
                      <div>{border.name}</div>
                      <img src={border.flag} alt={"#"} style={{width: 40, height: 30}}/>
                    </div>
                  );
                })}
              </div>
            </>
            : <h4 className={"text-info border-info border-bottom"}>There are no borders!!</h4>
          }
        </div>
      </div>
    </div>
  );
});
export default AboutCountry;