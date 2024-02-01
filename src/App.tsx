import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";
import {useCallback, useEffect, useState} from "react";
import {Country} from "./type";
import AlertCountry from "./components/AlertCountry/AlertCountry";
import {BASE_URL} from "./constants";
import Loader from "./components/Loader/Loader";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchData = useCallback(async () => {
    const {data: countries} = await axios.get(BASE_URL);

    const promises = countries.map(async (country: Country) => {
      return {
        id: Math.random().toString(),
        name: country.name,
        alpha3Code: country.alpha3Code,
      };
    });

    const newCountries = await Promise.all(promises);
    setCountries(newCountries);
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);
  return (
    <div className={"container d-flex"}>
      <div className={"blockContent bg-white mx-auto mt-4 row shadow-lg p-3 mb-5 rounded"}>
        <div className={"blockCountries col-4 d-flex flex-column h-100 p-1  overflow-y-auto gap-2"}>
          {(countries.length)
            ? countries.map((country) => {
              return <AlertCountry key={country.id} country={country}/>;
            })
            : <Loader/>
          }
        </div>

        <div className={"col-8 d-flex flex-column h-100 border border-info-subtle"}>
          <Loader/>
        </div>
      </div>
    </div>
  );
}

export default App;
