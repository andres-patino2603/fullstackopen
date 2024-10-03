import { useState, useEffect } from "react";
import axios from "axios";
import CountryForm from "./components/CountryForm";
import CountryList from "./components/CountryList";

function App() {
  const [searchCountry, setsearchCountry] = useState("");
  const [countries, setCountries] = useState([]);

  const handleCountryChange = (e) => {
    setsearchCountry(e.target.value);
  };
  
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      }).catch(error => {
        console.log("Error", error)
      });
  }, []);
  
  const showCountrys = searchCountry === ""
      ? countries
      : countries.filter((country) =>
          country.name.common
            .toLowerCase()
            .includes(searchCountry.toLowerCase())
        );
        const buttonShow = (countryName) => {
          return setsearchCountry(countryName)
        }

  return (
    <>
      <CountryForm
        searchCountry={searchCountry}
        handleCountryChange={handleCountryChange}
      />
      <CountryList countries={showCountrys} buttonShow={buttonShow}/>
    </>
  );
}

export default App;
