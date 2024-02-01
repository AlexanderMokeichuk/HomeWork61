import "bootstrap/dist/css/bootstrap.min.css";
import {useState} from "react";
import {Country} from "./type";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  return (
    <div className={"container d-flex"}>
      <div className={"bg-white mx-auto mt-4 row shadow-lg p-3 mb-5 rounded"} style={{width:1000 ,height: 800}}>
        <div className={"col-4 d-flex flex-column h-100 p-1 border overflow-y-auto gap-2"}>
          <span className={"p-2 d-block w-100 bg-info text-light"}>
            Country
          </span>
        </div>
        <div className={"col-8 h-100 border overflow-y-auto"}>
          About country
        </div>
      </div>
    </div>
  );
}

export default App;
