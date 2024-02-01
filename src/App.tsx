import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import React, {useCallback, useEffect, useState} from "react";
import {Countries, Country, ReceivedCountries} from "./type";
import AlertCountry from "./components/AlertCountry/AlertCountry";
import {GET_ALL_COUNTRY, GET_ONE_COUNTRY} from "./constants";
import Loader from "./components/Loader/Loader";
import AboutCountry from "./components/AboutCountry/AboutCountry";

function App() {
  const [countries, setCountries] = useState<Countries[]>([]);
  const [aboutCountry, setAboutCountry] = useState<Country | null>(null)

  const fetchData = useCallback(async () => {
    const {data: countries} = await axios.get<ReceivedCountries[]>(GET_ALL_COUNTRY);

    const promises = countries.map(async (country: ReceivedCountries) => {
      return {
        id: Math.random().toString(),
        name: country.name,
        alpha3Code: country.alpha3Code,
        independent: country.independent,
      };
    });

    const newCountries = await Promise.all(promises);
    setCountries(newCountries);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const showCountry = useCallback(async (alpha3Code: string) => {
    const {data: country} = await axios.get<Country>(GET_ONE_COUNTRY + alpha3Code);
    setAboutCountry({
      area: country.area,
      borders: country.borders,
      capital: country.capital,
      flags: country.flags,
      languages: country.languages,
      name: country.name,
      population: country.population
    })
  }, []);

  return (
    <div className={"container d-flex"}>
      <div className={"blockContent bg-white mx-auto mt-4 row shadow-lg p-3 mb-5 rounded"}>
        <div className={"blockCountries col-4 d-flex flex-column h-100 p-1  overflow-y-auto gap-2"}>
          {(countries.length)
            ? countries.map((country) => {
              return <AlertCountry key={country.id} country={country} showCountry={showCountry}/>;
            })
            : <Loader/>
          }
        </div>

        <div className={"col-8 d-flex flex-column p-3 h-100 border border-info-subtle"}>
          {(aboutCountry)
            ? <AboutCountry country={aboutCountry}/>
            : <Loader/>
          }
        </div>
      </div>
    </div>
  );
};

export default  App;
